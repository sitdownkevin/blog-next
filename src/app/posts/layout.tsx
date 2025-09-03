export default function PostLayout({ children }) {
  return (
    <div className="w-5/6 md:w-2/3 lg:w-1/2 mx-auto">
        <div>{children}</div>
    </div>
  );
}
