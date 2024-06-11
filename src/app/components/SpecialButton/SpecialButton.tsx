import Link from "next/link";
import { Fragment } from "react";

type SpecialButtonProps = {
  href: string;
  text: string;
};

export default function SpecialButton({ href, text }: SpecialButtonProps) {
  return (
    <Link href={href} className="rounded-full border bg-gray-300 border-gray-500 flex flex-col justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition mx-2">
      <Fragment>{text}</Fragment>
    </Link>
  );
}
