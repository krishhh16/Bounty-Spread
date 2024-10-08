import { Inter } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "./components/AppWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bounty Spread",
  description: "Create customizable blinks for your Applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <AppWalletProvider>
        <body className={inter.className}>
          {children}
          <script src="https://widget.mercuryo.io/embed.2.0.js"></script>
        </body>
      </AppWalletProvider>
    </html>
  );
}
