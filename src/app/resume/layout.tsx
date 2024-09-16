export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="inline-block text-center justify-center w-full pt-20">
        {children}
      </div>
    </div>
  );
}
