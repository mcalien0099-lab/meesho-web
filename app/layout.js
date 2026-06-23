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

export const dynamic = "force-dynamic";

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
        const settingsData = resJson.data || resJson.settings || resJson;
        
        // Extract pixel ids from offers if present
        let metaPixelIds = [];
        let googleAnalyticsIds = [];
        
        if (settingsData.offers) {
          metaPixelIds = settingsData.offers.filter(o => o && o.startsWith('PIXEL_META:')).map(o => o.split(':')[1]);
          googleAnalyticsIds = settingsData.offers.filter(o => o && o.startsWith('PIXEL_GA:')).map(o => o.split(':')[1]);
        }
        
        settingsData.metaPixelIds = metaPixelIds;
        settingsData.googleAnalyticsIds = googleAnalyticsIds;
        initialData.settings = settingsData;
      }
    } catch (error) {
    console.error("Error fetching initial data in layout:", error);
  }

  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <head>
        {initialData.settings?.metaPixelIds?.length > 0 && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                ${initialData.settings.metaPixelIds.map(id => `fbq('init', '${id}');`).join('\n                ')}
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        
        {initialData.settings?.metaPixelIds?.map((id, index) => (
          <noscript key={`meta-ns-${id}-${index}`}>
            <img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`} />
          </noscript>
        ))}

        {initialData.settings?.googleAnalyticsIds?.length > 0 && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${initialData.settings.googleAnalyticsIds[0]}`}></script>
        )}
        {initialData.settings?.googleAnalyticsIds?.length > 0 && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${initialData.settings.googleAnalyticsIds.map(id => `gtag('config', '${id}');`).join('\n                ')}
              `,
            }}
          />
        )}
      </head>
      <body suppressHydrationWarning>
        <AppProvider initialData={initialData}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
