import { NextAuthProvider } from "@/providers/auth";
import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "@/providers/toast";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "FSW Trips",
  description: "Sistema de reservas de viagens",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
