import ScrollRestorationController from "@/controllers/ScrollRestorationController";
import ColorSchemeController from "@/controllers/ColorSchemeController";
import RandomSelectionColor from "@/controllers/RandomSelectionColor";
import { StateProvider } from "@/context/StateContext";
import { GlobalVariablesProvider } from "@/context/GlobalVariablesContext";
import "./globals.css";
import "./fonts.css";

import { getSiteData } from "@/lib/fetch";
import { getColorPairs } from "@/lib/fetch";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const [site] = await Promise.all([getSiteData()]);
const [colorPairs] = await Promise.all([getColorPairs()]);

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
    shortcut: "/assets/favicon/favicon.ico",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children, invert = false }) {
  return (
    <html lang="en">
      <StateProvider colorPairs={colorPairs}>
        <GlobalVariablesProvider>
          <body>
            <Header />
            {children}
            <div id="hover-preview"></div>
            <Footer site={site} />
          </body>
        </GlobalVariablesProvider>
      </StateProvider>
      <ScrollRestorationController />
      <RandomSelectionColor colorPairs={colorPairs} />
      <ColorSchemeController />
    </html>
  );
}
