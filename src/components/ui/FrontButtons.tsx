import { Link, Button } from "@nextui-org/react";

export default function FrontButtons() {
  return (
    <div className="relative w-full h-full max-w-lg md:max-w-4xl">
      <Button
        showAnchorIcon
        as={Link}
        className="absolute top-5 left-5 bg-blue-500 text-white p-2 rounded-xl"
        href="/resume"
        variant="solid"
      >
        Resume
      </Button>

      <Button
        showAnchorIcon
        as={Link}
        className="absolute top-5 right-5 bg-green-500 text-white p-2 rounded-xl"
        href="/contact"
        variant="solid"
      >
        Contact
      </Button>

      <Button
        showAnchorIcon
        as={Link}
        className="absolute bottom-5 left-5 bg-red-500 text-white p-2 rounded-xl"
        href="/pricing"
        variant="solid"
      >
        Pricing
      </Button>

      <Button
        showAnchorIcon
        as={Link}
        className="absolute bottom-5 right-5 bg-yellow-500 text-white p-2 rounded-xl"
        href="#"
        variant="solid"
      >
        Demo
      </Button>
    </div>
  );
}
