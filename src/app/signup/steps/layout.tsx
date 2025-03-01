export default function Steps({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="block w-full">
        <div className="block">
          <button className="px-3 py-2 bg-blue-700 text-white rounded border mr-2">Step 1</button>
          <button className="px-3 py-2 rounded border mr-2">Step 2</button>
          <button className="px-3 py-2 rounded border mr-2">Step 3</button>
        </div>
        <div className="block">{children}</div>
      </div>
    </>
  );
}
