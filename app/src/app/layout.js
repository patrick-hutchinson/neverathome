import ScrollRestorationController from "@/controllers/ScrollRestorationController";
import ColorSchemeController from "@/controllers/ColorSchemeController";
import { StateProvider } from "@/context/StateContext";
import "./globals.css";
import "./fonts.css";

import { getSiteData } from "@/lib/fetch";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const [site] = await Promise.all([getSiteData()]);

export const metadata = {
  title: `${site.title}`,
  description: `${site.description}`,
  icons: {
    icon: [
      { url: "/assets/favicon/favicon.ico" },
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children, invert = false }) {
  return (
    <html lang="en">
      <StateProvider>
        <body>
          <Header />
          {children}
          <Footer site={site} />
        </body>
      </StateProvider>
      <ScrollRestorationController />
      <ColorSchemeController />
    </html>
  );
}
