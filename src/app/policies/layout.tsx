export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 pt-10 w-full">
        {children}
      </div>
    </section>
  );
}
