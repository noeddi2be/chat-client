import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "../components/Sidebar";

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

export const metadata: Metadata = {
  title: "Chat-App",
  description: "Client for the Chat-Server SEL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
          <main className="flex-1 p-5"> {/* Main content area */}
            <h1 className="flex justify-center text-6xl p-5 font font-extrabold antialiased text-white font-leckerli">
              <span className="text-dark">Chat</span>
              <span className="text-light">App</span>
            </h1>
            <div className="flex space-x-5">
              <div className="flex rounded-lg items-center justify-center min-h-[80vh] bg-background r w-1/12"> {/* Left div */}
                <Sidebar />
              </div>
              <div className="flex rounded-lg items-center justify-center min-h-[80vh] bg-gray-100 flex-1"> {/* Right div */}
                {children} {/* Render child components here */}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}