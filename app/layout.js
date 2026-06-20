import { Outfit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Meesho Clone - Online Shopping",
  description: "A premium clone of the Meesho e-commerce website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
