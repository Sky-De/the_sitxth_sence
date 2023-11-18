import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { store } from "@/redux/store/store";
import { Header } from "@/components/Header";
import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2D Game",
  description: "Free 2D guess game,developed by SkyDe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`${inter.className} h-screen relative`}>
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
