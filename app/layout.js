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

export default async function RootLayout({ children }) {
  let initialData = { products: [], categories: [], banners: [], settings: null };
  try {
    const baseUrl = process.env.NODE_ENV === "development" 
      ? "http://localhost:5000" 
      : "https://meesho-backend-vert.vercel.app";

    const [productsRes, categoriesRes, bannersRes, settingsRes] = await Promise.all([
      fetch(`${baseUrl}/api/products`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/categories`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/banners`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/settings`, { cache: "no-store" }),
    ]);

    if (productsRes.ok) {
      const resJson = await productsRes.json();
      let pData = resJson.data || resJson;
      if (Array.isArray(pData)) {
        pData = pData.flatMap(item => item.products && Array.isArray(item.products) ? item.products : item);
      } else if (pData && pData.products) {
        pData = pData.products;
      }
      initialData.products = Array.isArray(pData) ? pData : [];
    }
    if (categoriesRes.ok) {
      const resJson = await categoriesRes.json();
      initialData.categories = Array.isArray(resJson.data || resJson.categories || resJson) ? (resJson.data || resJson.categories || resJson) : [];
    }
    if (bannersRes.ok) {
      const resJson = await bannersRes.json();
      initialData.banners = Array.isArray(resJson.data || resJson.banners || resJson) ? (resJson.data || resJson.banners || resJson) : [];
    }
    if (settingsRes.ok) {
      const resJson = await settingsRes.json();
      initialData.settings = resJson.data || resJson.settings || resJson;
    }
  } catch (error) {
    console.error("Error fetching initial data in layout:", error);
  }

  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <body suppressHydrationWarning>
        <AppProvider initialData={initialData}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
