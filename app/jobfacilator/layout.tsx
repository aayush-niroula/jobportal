import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import JobFacilatorNavbar from "./_components/JobFacilatorNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function JobFacilatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
      <JobFacilatorNavbar />
      {children}
    </main>
  );
}
