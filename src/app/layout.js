import Navbar from "@/Components/Navbar";
import "./globals.css";
import Context from "@/Context API/Context";
import StorageProvider from "@/Context API/StorageContext";

export const metadata = {
  title: {
    default: "CryptoTracker",
    template: "%s | CryptoTracker"
  },
  description: "A crypto tracker web app by nextJS",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/fav.png" type="image/png" />
      </head>
      <body className="font-nunito max-w-screen-xl mx-auto md:p-8 p-4">
        <Context>
          <StorageProvider>
            <Navbar></Navbar>
            <div className="lg:mt-16 mt-10 lg:mx-16 md:mx-10 mx-0">
              {children}
            </div>
          </StorageProvider>
        </Context>
      </body>
    </html>
  );
}
