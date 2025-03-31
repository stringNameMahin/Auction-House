"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthRequired } from "@/hooks/use-auth-required"
import { getAllAuctionItems, placeBid } from "../actions/auction"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatDistanceToNow } from "date-fns"

export default function BidPage() {
  const { requireAuth, LoginModal, isAuthenticated } = useAuthRequired()
  const [auctionItems, setAuctionItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [bidDialogOpen, setBidDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [isBidding, setIsBidding] = useState(false)

  useEffect(() => {
    fetchAuctionItems()
  }, [])

  const fetchAuctionItems = async () => {
    setIsLoading(true)
    try {
      const result = await getAllAuctionItems()
      if (result.error) {
        setError(result.error)
      } else if (result.items) {
        setAuctionItems(result.items)
      }
    } catch (error) {
      setError("Failed to load auction items")
    }
    setIsLoading(false)
  }

  // Function to format the remaining time
  const formatTimeRemaining = (endTimeStr: string) => {
    const endTime = new Date(endTimeStr)
    const now = new Date()

    if (endTime <= now) return "Ended"

    return formatDistanceToNow(endTime, { addSuffix: true })
  }

  const handleBidNow = (item: any) => {
    if (requireAuth()) {
      setSelectedItem(item)
      setBidAmount((item.currentBid || item.startingBid) + 1)
      setBidDialogOpen(true)
    }
  }

  const handlePlaceBid = async () => {
    if (!selectedItem || !bidAmount) return

    const bidAmountNum = Number.parseFloat(bidAmount)
    if (isNaN(bidAmountNum)) {
      setError("Please enter a valid bid amount")
      return
    }

    const minBid = (selectedItem.currentBid || selectedItem.startingBid) + 1
    if (bidAmountNum < minBid) {
      setError(`Bid must be at least $${minBid}`)
      return
    }

    setIsBidding(true)
    setError("")

    try {
      const result = await placeBid(selectedItem.id, bidAmountNum)

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Bid placed successfully!")
        setBidDialogOpen(false)
        fetchAuctionItems()
      }
    } catch (error) {
      setError("Failed to place bid. Please try again.")
    }

    setIsBidding(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Browse Auctions</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-3">Search</h3>
              <div className="space-y-2">
                <Input placeholder="Search auctions..." />
                <Button className="w-full">Search</Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  All Categories
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Art & Collectibles
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Electronics
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Fashion
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Home & Garden
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Jewelry & Watches
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Sports Memorabilia
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Vehicles
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Other
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Min" type="number" />
                <Input placeholder="Max" type="number" />
              </div>
              <Button className="w-full mt-2">Apply</Button>
            </div>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Auctions</TabsTrigger>
                  <TabsTrigger value="ending">Ending Soon</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                </TabsList>

                <select className="bg-background border rounded px-2 py-1 text-sm">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Ending Soon</option>
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Most Bids</option>
                </select>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : auctionItems.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium">No auctions found</h3>
                  <p className="text-muted-foreground mt-2">There are no active auctions at the moment.</p>
                </div>
              ) : (
                <>
                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {auctionItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="relative">
                            <img
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-48 object-cover"
                            />
                            {item.featured && <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>}
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription>{item.category}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Current Bid:</span>
                              <span className="font-bold">${(item.currentBid || item.startingBid).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Bids:</span>
                              <span>{item.bids}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Time Left:</span>
                              <span className="text-primary">{formatTimeRemaining(item.auctionEnd)}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              Listed by {item.user.name || "Anonymous"}
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex gap-2">
                            <Button className="flex-1" onClick={() => handleBidNow(item)}>
                              Bid Now
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => (window.location.href = `/auction/${item.id}`)}
                            >
                              Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="ending" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {auctionItems
                        .filter((item) => {
                          const endTime = new Date(item.auctionEnd).getTime()
                          const now = new Date().getTime()
                          return endTime - now < 3 * 24 * 60 * 60 * 1000 // Less than 3 days
                        })
                        .map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="relative">
                              <img
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                              />
                              <Badge className="absolute top-2 right-2 bg-destructive">Ending Soon</Badge>
                            </div>
                            <CardHeader className="p-4 pb-0">
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              <CardDescription>{item.category}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Current Bid:</span>
                                <span className="font-bold">${(item.currentBid || item.startingBid).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Bids:</span>
                                <span>{item.bids}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Time Left:</span>
                                <span className="text-destructive font-medium">
                                  {formatTimeRemaining(item.auctionEnd)}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-2">
                                Listed by {item.user.name || "Anonymous"}
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex gap-2">
                              <Button className="flex-1" onClick={() => handleBidNow(item)}>
                                Bid Now
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => (window.location.href = `/auction/${item.id}`)}
                              >
                                Details
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="featured" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {auctionItems
                        .filter((item) => item.featured)
                        .map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="relative">
                              <img
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                              />
                              <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
                            </div>
                            <CardHeader className="p-4 pb-0">
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              <CardDescription>{item.category}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Current Bid:</span>
                                <span className="font-bold">${(item.currentBid || item.startingBid).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Bids:</span>
                                <span>{item.bids}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Time Left:</span>
                                <span className="text-primary">{formatTimeRemaining(item.auctionEnd)}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-2">
                                Listed by {item.user.name || "Anonymous"}
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex gap-2">
                              <Button className="flex-1" onClick={() => handleBidNow(item)}>
                                Bid Now
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => (window.location.href = `/auction/${item.id}`)}
                              >
                                Details
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </>
              )}

              <div className="mt-8 flex justify-center">
                <div className="flex">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="mx-1 bg-primary text-primary-foreground">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="mx-1">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="mx-1">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Bid Dialog */}
        <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Place a Bid</DialogTitle>
              <DialogDescription>Enter your bid amount for {selectedItem?.title}</DialogDescription>
            </DialogHeader>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Current Bid</p>
                <p className="text-2xl font-bold">
                  ${selectedItem ? (selectedItem.currentBid || selectedItem.startingBid).toFixed(2) : "0.00"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidAmount">Your Bid ($)</Label>
                <Input
                  id="bidAmount"
                  type="number"
                  step="0.01"
                  min={selectedItem ? (selectedItem.currentBid || selectedItem.startingBid) + 1 : 0}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum bid: $
                  {selectedItem ? ((selectedItem.currentBid || selectedItem.startingBid) + 1).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setBidDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePlaceBid} disabled={isBidding}>
                {isBidding ? "Placing Bid..." : "Place Bid"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {LoginModal}
      </main>
      <Footer />
    </div>
  )
}

