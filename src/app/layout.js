import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import NormalLayout from "@/components/layout/layout";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoSpace",
  description: "Your friend for exploring co working spaces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NormalLayout>{children}</NormalLayout>
      </body>
    </html>
  );
}
