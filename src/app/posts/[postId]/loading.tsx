export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-4 py-8 px-4 animate-pulse">
      <div className="h-8 w-3/4 rounded bg-muted" />
      <div className="flex justify-between">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
      </div>
      <div className="mt-4 flex flex-col space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}
