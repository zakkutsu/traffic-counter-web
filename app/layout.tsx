import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Traffic Counter MKJI 1997",
  description: "Aplikasi mobile Traffic Counter untuk survei lalu lintas sesuai standar MKJI 1997. Dilengkapi fitur smart timestamps, ekspor CSV, dan antarmuka yang efisien di lapangan.",
  keywords: ["Traffic Counter", "Survei Lalu Lintas", "MKJI 1997", "Aplikasi Survei Jalan", "Teknik Sipil", "Volume Kendaraan"],
  openGraph: {
    title: "Traffic Counter MKJI 1997",
    description: "Digitalisasi survei lalu lintas yang presisi sesuai pedoman Manual Kapasitas Jalan Indonesia.",
    url: "https://traffic-counter-web.vercel.app", 
    siteName: "Traffic Counter MKJI 1997",
    images: [
      {
        url: "/images/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Preview Traffic Counter MKJI 1997",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traffic Counter MKJI 1997",
    description: "Digitalisasi survei lalu lintas yang presisi sesuai pedoman Manual Kapasitas Jalan Indonesia.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
