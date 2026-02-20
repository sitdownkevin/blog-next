export function PostDate({ date }: { date: Date }) {
  const pivotDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  if (date.getTime() <= pivotDate.getTime()) {
    return null;
  }

  return (
    <p className="select-none text-gray-600 dark:text-gray-300 text-xs font-bold">
      {date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  );
}
