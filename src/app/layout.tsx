import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import FloatingCTABubble from "@/components/FloatingCTABubble";
import CallConversionTracker from "@/components/CallConversionTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Locksmith24hour | 24/7 Emergency Locksmith | DBS Checked",
  description: "Local emergency locksmiths across England, Scotland & Wales — arrive ≤30 mins, no call-out fee, all locks insurance-approved, DBS-checked technicians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showBubble = process.env.NEXT_PUBLIC_SHOW_CTA_BUBBLE !== "false";
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const googleTagPath = process.env.NEXT_PUBLIC_GOOGLE_TAG_PATH || "/oojo";
  const isProduction = process.env.NODE_ENV === "production";
  const shouldLoadTag = Boolean(googleAdsId && (isProduction || process.env.NEXT_PUBLIC_FORCE_TAG === "true"));

  return (
    <html lang="en-GB" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {shouldLoadTag && (
          <>
            {/* Google Tag Gateway (served first-party via Cloudflare /oojo) */}
            <Script
              src={googleTagPath}
              strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAdsId}');
              `}
            </Script>
          </>
        )}
        <SiteHeader />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileBar />
        {showBubble && <FloatingCTABubble />}
        <CallConversionTracker />
      </body>
    </html>
  );
}
