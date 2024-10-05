import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "@/trpc/react";

import "@cs-magic/css/main.out.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Open AGI",
  description: "Open AGI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            {children}
          </main>
          <Toaster richColors />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
