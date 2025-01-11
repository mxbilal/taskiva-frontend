import { Providers } from "@/app/providers";
import { Inter } from "next/font/google";
import HeaderWrapper from "./components/HeaderWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Taskiva - Team Collaboration Platform",
  description: "Connect, collaborate, and create with teams worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <HeaderWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}