import { PageWrapper } from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-2">
          <div className="h-9 w-48 rounded-md bg-neutral-300 mb-5" />

          <div className="h-10 min-w-22 rounded-full bg-neutral-300" />
        </div>

        <div className="p-5 rounded-md bg-neutral-300 min-h-22 flex flex-col md:flex-row md:justify-start md:items-center">
          <div>
            <div className="h-5 w-32 rounded-md bg-neutral-400 mb-3" />
            <div className="h-9 w-56 rounded-md bg-neutral-400" />
          </div>

          <div className="mt-5 md:mt-0 md:ml-auto flex space-x-3">
            <div className="rounded-md bg-neutral-200 p-5 min-w-32">
              <div className="h-8 w-12 mx-auto rounded-md bg-neutral-300 mb-2" />
              <div className="h-4 w-20 mx-auto rounded-md bg-neutral-300" />
            </div>

            <div className="rounded-md bg-neutral-200 p-5 min-w-32">
              <div className="h-8 w-12 mx-auto rounded-md bg-neutral-300 mb-2" />
              <div className="h-4 w-16 mx-auto rounded-md bg-neutral-300" />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="h-9 w-40 rounded-md bg-neutral-300 mb-4" />

          <div className="flex space-x-3 flex-wrap">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border border-neutral-200 p-4 rounded-md mt-4 flex-[46%] lg:flex-[20%] grow-0 min-h-52"
              >
                <div className="h-5 w-24 rounded-md bg-neutral-300 mb-6" />

                <div className="space-y-3">
                  <div className="h-4 w-full rounded-md bg-neutral-300" />
                  <div className="h-4 w-5/6 rounded-md bg-neutral-300" />
                  <div className="h-4 w-3/4 rounded-md bg-neutral-300" />
                  <div className="h-4 w-2/3 rounded-md bg-neutral-300" />
                </div>

                <div className="mt-8 flex gap-2">
                  <div className="h-9 w-20 rounded-full bg-neutral-300" />
                  <div className="h-9 w-20 rounded-full bg-neutral-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="h-9 w-28 rounded-md bg-neutral-300 mb-4" />

          <div className="flex space-x-3 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-md border border-neutral-200 p-4 min-w-64"
              >
                <div className="h-5 w-32 rounded-md bg-neutral-300 mb-4" />
                <div className="h-4 w-24 rounded-md bg-neutral-300 mb-3" />
                <div className="h-4 w-40 rounded-md bg-neutral-300 mb-3" />
                <div className="h-8 w-20 rounded-md bg-neutral-300 mt-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
