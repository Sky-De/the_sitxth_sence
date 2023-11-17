import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const page: FC = () => {
  return (
    <section className="contact text-white w-full h-2/3  grid place-content-center">
      <div className="social_media  p-4 flex gap-10 flex-col md:flex-row">
        <Link
          className="hover:rotate-[360deg] apply__contact--link"
          href="https://github.com/Sky-De"
          target="_blank"
        >
          <i className="bx bxl-github apply__contact--i"></i>
        </Link>
        <Link
          className="hover:rotate-[-360deg] apply__contact--link"
          href="mailto:sky_de1991@outlook.com"
          target="_blank"
        >
          <i className="bx bxl-google apply__contact--i"></i>
        </Link>
        <Link
          className="hover:rotate-[360deg] apply__contact--link"
          href="https://www.linkedin.com/in/sky-de-763248228"
          target="_blank"
        >
          <i className="bx bxl-linkedin-square apply__contact--i"></i>
        </Link>
      </div>
      <h2 className="capitalize text-xs text-center opacity-40">
        <span className="md:hidden">Tap</span>
        <span className="hidden md:inline">Click</span>
      </h2>
    </section>
  );
};

export default page;
