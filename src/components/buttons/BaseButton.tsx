export default function BaseButton({
  content,
  className = "w-32",
}: {
  content: string;
  className?: string;
}) {
  return (
    <button
      className={`${className} bg-foreground text-background py-2 px-4 rounded-xl hover:bg-purple-800 hover:dark:text-purple-300 focus:outline-none`}
      type="button"
    >
      {content}{" "}
    </button>
  );
}
