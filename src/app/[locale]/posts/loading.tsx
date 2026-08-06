export default function Loading() {
  return (
    <div className="w-full flex flex-col py-8 px-4 animate-pulse">
      <div className="flex flex-col gap-2 mb-8">
        <div className="h-9 w-28 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
      </div>
      <div className="mb-8 h-11 w-full rounded-md bg-muted" />
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 py-4 border-t border-border first:border-t-0"
          >
            <div className="flex justify-between gap-4">
              <div className="h-5 w-2/3 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
            </div>
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
