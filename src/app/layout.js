import localFont from "next/font/local";
import "./globals.css";
import LayOut from "../components/LayOut";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Men Fashion Store",
  description: "Ecommarce Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayOut>
          <div className="bg-white sticky top-0 z-50   shadow-md  bg-opacity-100">
            <Header />
          </div>

          {children}

          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </LayOut>
      </body>
    </html>
  );
}
