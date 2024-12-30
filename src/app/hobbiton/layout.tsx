export default function HobbitonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="inline-block text-center justify-center w-full px-8 py-10 md:py-20">
        {children}
      </div>
    </div>
  );
}
