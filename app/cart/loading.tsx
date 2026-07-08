import { PageWrapper } from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <div className="h-10 w-48 rounded-md bg-neutral-300 mb-10" />

        <div className="w-full overflow-hidden">
          <table className="table-auto w-full border-collapse [&_td]:p-2 [&_td]:text-start [&_td]:align-top">
            <thead className="bg-neutral-600">
              <tr>
                <td className="w-[25%]">
                  <div className="h-5 w-16 rounded-md bg-neutral-400" />
                </td>
                <td className="w-[25%]">
                  <div className="h-5 w-16 rounded-md bg-neutral-400" />
                </td>
                <td className="w-[25%]">
                  <div className="h-5 w-24 rounded-md bg-neutral-400" />
                </td>
                <td className="w-[25%]">
                  <div className="h-5 w-16 rounded-md bg-neutral-400" />
                </td>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="border-b border-neutral-200">
                  <td>
                    <div className="flex gap-4">
                      <div className="h-24 w-24 rounded-md bg-neutral-300 shrink-0" />

                      <div className="space-y-3 pt-1">
                        <div className="h-5 w-40 rounded-md bg-neutral-300" />
                        <div className="h-4 w-28 rounded-md bg-neutral-300" />
                        <div className="h-4 w-24 rounded-md bg-neutral-300" />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="h-5 w-20 rounded-md bg-neutral-300 mt-2" />
                  </td>

                  <td>
                    <div className="h-10 w-28 rounded-full bg-neutral-300 mt-1" />
                  </td>

                  <td>
                    <div className="h-5 w-24 rounded-md bg-neutral-300 mt-2" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full border-t border-neutral-400 mt-5 py-5 flex justify-end">
          <div className="w-sm">
            <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
              <div className="h-6 w-24 rounded-md bg-neutral-300" />
              <div className="h-5 w-24 rounded-md bg-neutral-300 justify-self-end" />
            </div>

            <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
              <div className="h-6 w-32 rounded-md bg-neutral-300" />
              <div className="h-5 w-20 rounded-md bg-neutral-300 justify-self-end" />
            </div>

            <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
              <div className="h-6 w-24 rounded-md bg-neutral-300" />
              <div className="h-5 w-28 rounded-md bg-neutral-300 justify-self-end" />
            </div>

            <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
              <div className="h-6 w-28 rounded-md bg-neutral-300" />
              <div className="h-8 w-28 rounded-md bg-neutral-300 justify-self-end" />
            </div>

            <div className="py-5">
              <div className="h-14 w-full rounded-full bg-neutral-300" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
