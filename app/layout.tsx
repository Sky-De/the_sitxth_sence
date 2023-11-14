"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "2D Game",
//   description: "Free 2D guess game,developed by SkyDe",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
