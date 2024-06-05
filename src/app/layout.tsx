import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header/Header";
import "./globals.css";
import '@fontsource-variable/onest'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeoIrr",
  description: "NeoIrr - Creado con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="bg-white border-2 border-gray-900 rounded-lg mx-3 mt-3 mb-3">
          <Header></Header>
          {children}
        </div>
      </body>
    </html>
  );
}
