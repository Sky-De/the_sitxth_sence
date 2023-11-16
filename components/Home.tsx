import Image from "next/image";
import Cover from "@/public/test.png";
import { HomePageItems } from "@/types/globals";
import { HomeItem } from "./HomeItem";
import Link from "next/link";

const HomePage = () => {
  return (
    <section className="flex flex-col items-center gap-4 py-8">
      <h1 className="text-2xl text-center w-2/3">Test Your Luck and Sense</h1>
      <div className="flex items-center w-fit justify-evenly md:justify-center md:gap-4 border border-gray-600 shadow-white mx-auto p-4">
        <Image width={200} height={200} src={Cover} alt="trial" />
        <Link href="/game" className="border p-2">
          Play Now
        </Link>
      </div>
      <h2># How to play</h2>
      <ol className="p-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-center md:gap-10">
        {HomePageItems.map((item) => (
          <HomeItem key={item.title} {...item} />
        ))}
      </ol>
    </section>
  );
};

export default HomePage;
