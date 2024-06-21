import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource-variable/onest'
import { BluetoothProvider } from "./utils/BluetoothContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeoIrr",
  description: "NeoIrr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BluetoothProvider>
          {children}
        </BluetoothProvider>   
      </body>
    </html>
  );
}
