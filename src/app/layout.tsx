import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "next-themes"

export const metadata = {
  title: "Auction House",
  description: "Discover unique items and bid on treasures from around the world.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

