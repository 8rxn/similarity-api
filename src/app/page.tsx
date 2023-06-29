import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Similarity API",
  description: "Free API From Josh",
};

export default function Home() {
  return (
    <main className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
        <div className="h-full gap-6 flex flex-col justify-start items-center lg:items-start lg:justify-center">
          <LargeHeading
            size={"lg"}
            className="three-d text-black dark:text-light-gold"
          >
            Easily Determine <br /> Similarity Between texts
          </LargeHeading>

          <Paragraph>
            With the text-similarity API you can easily determine similarity
            between texts.{" "}
            <Link
              href="/login"
              className="text-black dark:text-light-gold underline underline-offset-4"
            >
              API key
            </Link>
          </Paragraph>

          <div className="aspect-square relative w-full max-w-lg lg:max-w-xl lg:right-20 lg:absolute">
            <Image
              alt="typewriter image"
              src={"/typewriter.png"}
              priority
              className="img-shadow"
              quality={100}
              style={{ objectFit: "contain" }}
              fill={true}
            ></Image>
          </div>
        </div>
      </div>
    </main>
  );
}
