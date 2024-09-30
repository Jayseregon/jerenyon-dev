export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="inline-block text-center justify-center px-16 sm:px-20 md:px-32 pt-10 md:pt-20">
        {children}
      </div>
    </div>
  );
}
