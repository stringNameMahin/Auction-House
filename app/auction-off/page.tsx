"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createAuctionItem, getUserAuctionItems, deleteAuctionItem } from "../actions/auction"
import ProtectedRoute from "@/components/protected-route"
import { format } from "date-fns"

export default function AuctionOffPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("create")
  const [userAuctions, setUserAuctions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [startingBid, setStartingBid] = useState("")
  const [reservePrice, setReservePrice] = useState("")
  const [auctionStart, setAuctionStart] = useState("")
  const [auctionEnd, setAuctionEnd] = useState("")
  const [shippingInfo, setShippingInfo] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    if (session) {
      fetchUserAuctions()
    }
  }, [session, activeTab])

  const fetchUserAuctions = async () => {
    if (activeTab === "my-auctions") {
      setIsLoading(true)
      const result = await getUserAuctionItems()
      setIsLoading(false)

      if (result.error) {
        setError(result.error)
      } else if (result.items) {
        setUserAuctions(result.items)
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      if (imageFiles.length + newFiles.length > 5) {
        setError("Maximum 5 images allowed")
        return
      }

      setImageFiles((prev) => [...prev, ...newFiles])

      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImageUrls])
    }
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (!termsAccepted) {
      setError("You must accept the terms and conditions")
      setIsLoading(false)
      return
    }

    // For demo purposes, we'll use placeholder image URLs
    // In a real app, you would upload these to a storage service
    const imageUrls =
      imageFiles.length > 0
        ? imageFiles.map((_, i) => `/placeholder.svg?text=Image${i + 1}`)
        : ["/placeholder.svg?text=NoImage"]

    try {
      const result = await createAuctionItem({
        title,
        description,
        category,
        startingBid: Number.parseFloat(startingBid),
        reservePrice: reservePrice ? Number.parseFloat(reservePrice) : undefined,
        auctionStart: new Date(auctionStart),
        auctionEnd: new Date(auctionEnd),
        images: imageUrls,
        shippingInfo,
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Auction item created successfully!")
        // Reset form
        setTitle("")
        setDescription("")
        setCategory("")
        setStartingBid("")
        setReservePrice("")
        setAuctionStart("")
        setAuctionEnd("")
        setShippingInfo("")
        setImages([])
        setImageFiles([])
        setTermsAccepted(false)

        setTimeout(() => {
          setActiveTab("my-auctions")
        }, 1500)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }

    setIsLoading(false)
  }

  const handleDeleteAuction = async (id: string) => {
    if (confirm("Are you sure you want to delete this auction?")) {
      setIsLoading(true)
      const result = await deleteAuctionItem(id)
      setIsLoading(false)

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Auction deleted successfully")
        fetchUserAuctions()
      }
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Auction Management</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="create">Create Auction</TabsTrigger>
              <TabsTrigger value="my-auctions">My Auctions</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Auction Off Your Item</h2>
                <p className="text-muted-foreground mb-8">
                  Complete the form below to list your item for auction. Provide detailed information to attract
                  potential bidders.
                </p>

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

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="title">Item Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title for your item"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startingBid">Starting Bid ($)</Label>
                      <Input
                        id="startingBid"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reservePrice">Reserve Price ($) (Optional)</Label>
                      <Input
                        id="reservePrice"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={reservePrice}
                        onChange={(e) => setReservePrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="auctionStart">Auction Start Date</Label>
                      <Input
                        id="auctionStart"
                        type="date"
                        value={auctionStart}
                        onChange={(e) => setAuctionStart(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="auctionEnd">Auction End Date</Label>
                      <Input
                        id="auctionEnd"
                        type="date"
                        value={auctionEnd}
                        onChange={(e) => setAuctionEnd(e.target.value)}
                        required
                      />
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
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your images here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">(Maximum 5 images, JPG or PNG, max 5MB each)</p>
                        <Input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("images")?.click()}
                        >
                          Select Files
                        </Button>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipping">Shipping Information</Label>
                    <Textarea
                      id="shipping"
                      placeholder="Provide details about shipping options, costs, and any restrictions"
                      rows={3}
                      value={shippingInfo}
                      onChange={(e) => setShippingInfo(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded border-gray-300"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
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

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating auction..." : "Submit Auction Listing"}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="my-auctions" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">My Auction Listings</h2>

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

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : userAuctions.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg bg-muted/50">
                    <h3 className="text-lg font-medium">No auctions found</h3>
                    <p className="text-muted-foreground mt-2">You haven't created any auction listings yet.</p>
                    <Button className="mt-4" onClick={() => setActiveTab("create")}>
                      Create Your First Auction
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userAuctions.map((auction) => (
                      <Card key={auction.id}>
                        <div className="md:flex">
                          <div className="md:w-1/4">
                            <img
                              src={auction.images[0] || "/placeholder.svg"}
                              alt={auction.title}
                              className="w-full h-48 object-cover rounded-l-lg"
                            />
                          </div>
                          <div className="md:w-3/4 p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold">{auction.title}</h3>
                                <p className="text-sm text-muted-foreground">{auction.category}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">${auction.currentBid || auction.startingBid}</div>
                                <div className="text-sm text-muted-foreground">
                                  {auction.bids} {auction.bids === 1 ? "bid" : "bids"}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Start Date</p>
                                <p>{format(new Date(auction.auctionStart), "MMM d, yyyy")}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">End Date</p>
                                <p>{format(new Date(auction.auctionEnd), "MMM d, yyyy")}</p>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => router.push(`/auction/${auction.id}`)}>
                                View Details
                              </Button>
                              <Button variant="destructive" onClick={() => handleDeleteAuction(auction.id)}>
                                Delete Auction
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

