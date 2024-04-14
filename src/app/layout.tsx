import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from 'next/font/google'
import { AppSessionProvider } from "@/auth/session/app-session-provider";
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ZOV Marketplace",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppSessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Header />
        {children}
        </ThemeProvider>
        </AppSessionProvider>
      </body>
    </html>
  );
}
