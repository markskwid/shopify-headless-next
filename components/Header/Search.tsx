import { searchResults } from "@/lib/shopify/api/search";
import { PRODUCT_SEARCH_TYPE } from "@/types/product";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<PRODUCT_SEARCH_TYPE[] | null>(
    null,
  );
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery) {
      setSearchData(null);
      return;
    }

    const getSearchData = async () => {
      const res = await searchResults(searchQuery);
      if (!res.success && !res.data) return;

      setSearchData(res.data);
    };

    const timeout = setTimeout(() => {
      getSearchData();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  //useEffect to handle click outisde of search result
  useEffect(() => {
    if (!searchData) return;

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
  }, [searchData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };
  return (
    <div className="relative" ref={searchContainerRef}>
      <form method="POST" className="">
        <input
          onChange={handleInputChange}
          type="text"
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

      {searchData && (
        <div className="search-result absolute bg-white w-full border border-gray-400 mt-2 rounded-md px-2 left-0 right-0">
          {searchData.length > 0 ? (
            searchData.map((item: PRODUCT_SEARCH_TYPE) => (
              <Link
                key={item.id}
                href={item.handle}
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
            ))
          ) : (
            <div className="flex justify-start items-center my-2 min-h-10">
              No item found. Try other keywords
            </div>
          )}
        </div>
      )}
    </div>
  );
};
