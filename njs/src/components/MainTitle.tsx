import Link from "next/link";

export default function MainTitle() {
  return (
    <div className="flex flex-col max-w-full">
      <h1 className="sm:py-3 py-6 text-4xl font-serif text-center">
        Halloween Story Challenge
      </h1>
      <div className="border border-red-600 border-solid max-w-full"></div>
      <Link className="text-center" target="_blank" href={"https://inorog.org"}>
        <span className="text-red-600 text-center p-2 text-xs">
          by Inorog Team!
        </span>
      </Link>
    </div>
  );
}
