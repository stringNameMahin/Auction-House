"use client"

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
import { User, Settings, LogOut, ChevronDown, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold ml-5">
          Auction House
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/about" className="py-2 md:py-0 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/auction-off" className="py-2 md:py-0 hover:text-primary transition-colors">
            Auction off
          </Link>
          <Link href="/bid" className="py-2 md:py-0 hover:text-primary transition-colors">
            Bid
          </Link>
        </div>

        {/* Mobile menu - Extra items included */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden flex flex-col p-4">
            <Link href="/about" className="py-2 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/auction-off" className="py-2 hover:text-primary transition-colors">
              Auction off
            </Link>
            <Link href="/bid" className="py-2 hover:text-primary transition-colors">
              Bid
            </Link>
            {/* Extra Links for Mobile Only */}
            <Link href="/exclusive-deals" className="py-2 hover:text-primary transition-colors">
              Exclusive Deals
            </Link>
            <Link href="/contact-us" className="py-2 hover:text-primary transition-colors">
              Contact Us
            </Link>
            {/* <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center py-2 hover:text-primary transition-colors"
            >
              {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button> */}
          </div>
        )}

        {/* Profile dropdown or login button */}
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative items-center space-x-2 h-10 rounded-full hidden md:flex">
                {/* Profile picture circle */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                {/* Arrow icon beside it */}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="cursor-pointer"
              >
                {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden md:block">
            <Button variant="outline" className="mr-2" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

