import Navbar from "@/Components/Navbar";
import "./globals.css";
import Context from "@/Context API/Context";

export const metadata = {
  title: "CryptoTracker",
  description: "A crypto screener web app by nextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-nunito max-w-screen-xl mx-auto p-8">
        <Context>
          <Navbar></Navbar>
          <div className="mt-16 mx-20">
            {children}
          </div>
        </Context>
      </body>
    </html>
  );
}
