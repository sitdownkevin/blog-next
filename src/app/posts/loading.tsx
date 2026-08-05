export default function Loading() {
  return (
    <div className="w-full flex flex-col py-8 px-4 animate-pulse">
      <div className="mt-4 mb-10 w-full max-w-lg mx-auto h-11 rounded-md bg-muted" />
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col space-y-3 p-4 border-b border-border"
          >
            <div className="h-5 w-2/3 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-16 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
