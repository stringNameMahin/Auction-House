"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { useAuthRequired } from "@/hooks/use-auth-required"
import { format, formatDistanceToNow } from "date-fns"

export default function AuctionDetailPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const { requireAuth, LoginModal } = useAuthRequired()
  const [auction, setAuction] = useState<any>(null)
  const [bids, setBids] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [bidAmount, setBidAmount] = useState("")
  const [isBidding, setIsBidding] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (id) {
      fetchAuctionDetails()
    }
  }, [id])

  const fetchAuctionDetails = async () => {
    setIsLoading(true)
    try {
      const mockAuction = {
        id: id as string,
        title: "Vintage Mechanical Watch",
        description:
          "A beautiful vintage mechanical watch in excellent condition. This rare timepiece features a hand-wound movement, original dial, and genuine leather strap. The watch has been serviced recently and keeps accurate time.",
        category: "Jewelry & Watches",
        startingBid: 450,
        currentBid: 550,
        reservePrice: 600,
        bids: 5,
        auctionStart: new Date("2025-03-15"),
        auctionEnd: new Date("2025-04-15"),
        images: ["/placeholder.svg?text=Watch1", "/placeholder.svg?text=Watch2", "/placeholder.svg?text=Watch3"],
        shippingInfo: "Free shipping within the US. International shipping available at additional cost.",
        status: "active",
        user: {
          name: "John Doe",
          image: "/placeholder.svg?text=User",
        },
      }

      const mockBids = [
        { id: "1", amount: 550, createdAt: new Date("2025-03-20"), user: { name: "Alice" } },
        { id: "2", amount: 500, createdAt: new Date("2025-03-18"), user: { name: "Bob" } },
        { id: "3", amount: 475, createdAt: new Date("2025-03-17"), user: { name: "Charlie" } },
        { id: "4", amount: 450, createdAt: new Date("2025-03-16"), user: { name: "David" } },
      ]

      setAuction(mockAuction)
      setBids(mockBids)
      setBidAmount((mockAuction.currentBid + 1).toString())
    } catch (error) {
      setError("Failed to load auction details")
    }
    setIsLoading(false)
  }

  const handlePlaceBid = async () => {
    if (!requireAuth()) return

    const bidAmountNum = Number.parseFloat(bidAmount)
    if (isNaN(bidAmountNum)) {
      setError("Please enter a valid bid amount")
      return
    }

    const minBid = auction.currentBid + 1
    if (bidAmountNum < minBid) {
      setError(`Bid must be at least $${minBid}`)
      return
    }

    setIsBidding(true)
    setError("")

    try {
      setTimeout(() => {
        setAuction({
          ...auction,
          currentBid: bidAmountNum,
          bids: auction.bids + 1,
        })

        setBids([
          {
            id: Date.now().toString(),
            amount: bidAmountNum,
            createdAt: new Date(),
            user: { name: session?.user?.name || "You" },
          },
          ...bids,
        ])

        setIsBidding(false)
      }, 1000)
    } catch (error) {
      setError("Failed to place bid. Please try again.")
      setIsBidding(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!auction) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <Alert variant="destructive">
            <AlertDescription>Auction not found</AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    )
  }

  const isEnded = new Date() > new Date(auction.auctionEnd)
  const timeRemaining = isEnded
    ? "Auction ended"
    : formatDistanceToNow(new Date(auction.auctionEnd), { addSuffix: true })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <img
                src={auction.images[activeImage] || "/placeholder.svg"}
                alt={auction.title}
                className="w-full h-full object-contain"
              />
            </div>

            {auction.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {auction.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 rounded-md border overflow-hidden ${index === activeImage ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${auction.title} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right column - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{auction.title}</h1>
                <Badge variant={isEnded ? "destructive" : "outline"}>{isEnded ? "Ended" : "Active"}</Badge>
              </div>
              <p className="text-muted-foreground">{auction.category}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <p className="text-lg font-medium">Current Bid</p>
                <p className="text-3xl font-bold">${auction.currentBid.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>Starting bid: ${auction.startingBid.toFixed(2)}</p>
                <p>
                  {auction.bids} {auction.bids === 1 ? "bid" : "bids"}
                </p>
              </div>
              <p className="text-sm font-medium">{timeRemaining}</p>
            </div>

            {!isEnded && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-medium">Place Your Bid</h3>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input
                        type="number"
                        className="pl-7"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={auction.currentBid + 1}
                        step="0.01"
                      />
                    </div>
                    <Button onClick={handlePlaceBid} disabled={isBidding}>
                      {isBidding ? "Placing Bid..." : "Place Bid"}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">Minimum bid: ${(auction.currentBid + 1).toFixed(2)}</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <h3 className="font-medium">Seller Information</h3>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <img
                    src={auction.user.image || "/placeholder.svg"}
                    alt={auction.user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p>{auction.user.name}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Shipping</h3>
              <p className="text-sm">{auction.shippingInfo}</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="bidHistory">Bid History</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none">
                <p>{auction.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="bidHistory" className="mt-4">
              {bids.length === 0 ? (
                <p>No bids yet. Be the first to bid!</p>
              ) : (
                <div className="border rounded-md divide-y">
                  {bids.map((bid) => (
                    <div key={bid.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{bid.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(bid.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      <p className="text-lg font-bold">${bid.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shipping" className="mt-4">
              <div className="prose max-w-none">
                <p>{auction.shippingInfo}</p>
                <h4 className="text-lg font-medium mt-4">Shipping Policies</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Items are typically shipped within 3 business days after payment is received.</li>
                  <li>Tracking information will be provided once the item is shipped.</li>
                  <li>International buyers are responsible for any customs fees or taxes.</li>
                  <li>Please contact the seller for combined shipping on multiple items.</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {LoginModal}
      </main>
      <Footer />
    </div>
  )
}

