"use client";

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function AuctionOffPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Auction Off Your Item</h1>
          <p className="text-muted-foreground mb-8">
            Complete the form below to list your item for auction. Provide detailed information to attract potential
            bidders.
          </p>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Item Title</Label>
              <Input id="title" placeholder="Enter a descriptive title for your item" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="art">Art & Collectibles</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="jewelry">Jewelry & Watches</SelectItem>
                  <SelectItem value="sports">Sports Memorabilia</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of your item, including condition, history, and any unique features"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startingBid">Starting Bid ($)</Label>
                <Input id="startingBid" type="number" placeholder="0.00" min="0" step="0.01" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservePrice">Reserve Price ($) (Optional)</Label>
                <Input id="reservePrice" type="number" placeholder="0.00" min="0" step="0.01" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="auctionStart">Auction Start Date</Label>
                <Input id="auctionStart" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionEnd">Auction End Date</Label>
                <Input id="auctionEnd" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Upload Images</Label>
              <div className="border border-dashed border-input rounded-md p-8 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Drag and drop your images here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">(Maximum 5 images, JPG or PNG, max 5MB each)</p>
                  <Input id="images" type="file" multiple accept="image/*" className="hidden" />
                  <Button type="button" variant="outline" size="sm">
                    Select Files
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping">Shipping Information</Label>
              <Textarea
                id="shipping"
                placeholder="Provide details about shipping options, costs, and any restrictions"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded border-gray-300" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Submit Auction Listing
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

