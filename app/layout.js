import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Meesho Clone - Online Shopping",
  description: "A premium clone of the Meesho e-commerce website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <body suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
