import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/Providers";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Life Easy - Personal Finance & Expense Tracker",
    template: "%s | Life Easy"
  },
  description: "Track your expenses, manage savings, and take control of your financial life with Life Easy.",
  keywords: ["Finance Tracker", "Expense Manager", "Next.js Dashboard", "Savings App", "Life Easy"],
  authors: [{ name: "devroni" }],
  creator: "devroni",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            {children}
            <Toaster position={"top-right"} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
