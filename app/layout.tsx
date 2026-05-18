import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css"; // Global styles

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: ["400"],
  style: ["normal", "italic"],
});

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Claude UI Clone",
  description: "A modular clone of the Claude UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <head>
        <script
          id="fetch-patch"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                try {
                  const originalFetch = window.fetch;
                  Object.defineProperty(window, 'fetch', {
                    configurable: true,
                    enumerable: true,
                    get: () => originalFetch,
                    set: (val) => {
                      // Silently ignore or re-assign if possible
                    }
                  });
                } catch(e) {}
              }
            `,
          }}
        />
      </head>
      <body
        className="antialiased font-sans bg-[#141414] text-[#e8e6e3]"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
