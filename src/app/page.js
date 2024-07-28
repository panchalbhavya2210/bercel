import Link from "next/link";

export default function Home() {
  return (
    <h1 className="p-5">
      Hello,{" "}
      <Link href="/shop" className="underline">
        Visit Shop Page To View Product Details
      </Link>
    </h1>
  );
}
