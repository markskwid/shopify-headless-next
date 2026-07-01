import { searchResults } from "@/lib/shopify/api/search";
import { PRODUCT_SEARCH_TYPE } from "@/types/product";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { clientConfig } from "@/config/client.config";

export const SearchBar = ({
  predictiveSearch,
}: {
  predictiveSearch: boolean;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<PRODUCT_SEARCH_TYPE[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!predictiveSearch) {
      setSearchData(null);
      setError(null);
      return;
    }

    setError(null);

    if (!searchQuery.trim()) {
      setSearchData(null);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await searchResults(searchQuery);

      if (!res.success || !res.data) {
        setError("Something went wrong. Try again!");
        return;
      }

      setSearchData(res.data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, predictiveSearch]);

  //useEffect to handle click outisde of search result
  useEffect(() => {
    if (!predictiveSearch || !searchData) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchData(null);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchData, predictiveSearch]);

  //useEffect to clear state query value when changing pages
  useEffect(() => {
    setSearchQuery("");
    setSearchData(null);
    setError(null);
  }, [pathName, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };

  //form submit then redirect to search page
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };
  return (
    <div className="relative" ref={searchContainerRef}>
      <form id="search-form" method="POST" className="" onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          value={searchQuery}
          tabIndex={1}
          className="border bg-gray-300/50 rounded-md py-1 px-2 shadow-2xl w-full md:w-72"
          placeholder="Search item"
        />

        <button type="submit" className="absolute right-2 top-1 align-middle">
          <i>
            <AiOutlineSearch />
          </i>
        </button>
      </form>

      {predictiveSearch &&
        (!error ? (
          searchData && (
            <div className="search-result absolute bg-white w-full border border-gray-400 mt-2 rounded-md px-2 left-0 right-0">
              {searchData.length > 0 ? (
                <>
                  {searchData.map((item: PRODUCT_SEARCH_TYPE) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.handle}`}
                      className="flex justify-start items-center my-2 min-h-10"
                    >
                      <div className="relative mr-2">
                        <Image
                          src={item.featuredImage?.url ?? ""}
                          width="50"
                          alt={item.title}
                          height="50"
                          loading={"lazy"}
                        />
                      </div>
                      <p>{item.title}</p>
                    </Link>
                  ))}

                  <div className="border-t border-gray-200 mt-2">
                    <button
                      type="submit"
                      form="search-form"
                      className="flex justify-center items-center text-center w-full gap-2 p-2 cursor-pointer hover:bg-gray-50"
                    >
                      See All Results <AiOutlineArrowRight size={15} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-start items-center my-2 min-h-10">
                  No item found. Try other keywords
                </div>
              )}
            </div>
          )
        ) : (
          <div className="search-result absolute bg-white w-full border border-gray-400 mt-2 rounded-md px-2 left-0 right-0">
            <div className="flex justify-start items-center my-2 min-h-10">
              {error}
            </div>
          </div>
        ))}
    </div>
  );
};
