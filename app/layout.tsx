import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SidebarProvider >
          <AppSidebar /> */}
        <main>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            > */}
          {/* <SidebarTrigger /> */}
          <Providers>{children}</Providers>

          {/* </ThemeProvider> */}
        </main>
        {/* </SidebarProvider> */}
      </body>
    </html>
  );
}
