import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Auction House</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted platform for online auctions and unique finds.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/auction-off", label: "Auction Off" },
                { href: "/bid", label: "Bid Now" },
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start justify-center md:justify-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5" />
                <span>123 Auction Street, City, Country</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="mr-2 h-4 w-4" />
                <span>+91 1233456789</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="mr-2 h-4 w-4" />
                <span>contact@auctionhouse.com</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest auctions and updates.
            </p>
            <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-center md:justify-start">
              <input
                type="email"
                placeholder="Your email"
                className="h-9 w-full sm:w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© Auction House 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
