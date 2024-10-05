export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="inline-block text-center justify-center px-10 pt-10 md:pt-20 pb-5">
        {children}
      </div>
    </section>
  );
}
