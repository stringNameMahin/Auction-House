import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BidPage() {
  // Sample auction items data
  const auctionItems = [
    {
      id: 1,
      title: "Vintage Mechanical Watch",
      category: "Jewelry & Watches",
      currentBid: 450,
      bids: 12,
      endTime: "2025-04-15T14:30:00",
      image: "/placeholder.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Antique Oak Dining Table",
      category: "Home & Garden",
      currentBid: 850,
      bids: 7,
      endTime: "2025-04-18T10:00:00",
      image: "/placeholder.jpg",
    },
    {
      id: 3,
      title: "Signed Baseball Collection",
      category: "Sports Memorabilia",
      currentBid: 320,
      bids: 9,
      endTime: "2025-04-14T18:45:00",
      image: "/placeholder.jpg",
    },
    {
      id: 4,
      title: "Modern Abstract Painting",
      category: "Art & Collectibles",
      currentBid: 1200,
      bids: 15,
      endTime: "2025-04-20T12:00:00",
      image: "/placeholder.jpg",
      featured: true,
    },
    {
      id: 5,
      title: "Vintage Camera Set",
      category: "Electronics",
      currentBid: 580,
      bids: 11,
      endTime: "2025-04-16T20:30:00",
      image: "/placeholder.jpg",
    },
    {
      id: 6,
      title: "Designer Handbag",
      category: "Fashion",
      currentBid: 750,
      bids: 18,
      endTime: "2025-04-17T15:15:00",
      image: "/placeholder.jpg",
    },
  ]

  // Function to format the remaining time
  const formatTimeRemaining = (endTimeStr: string) => {
    const endTime = new Date(endTimeStr).getTime()
    const now = new Date().getTime()
    const timeRemaining = endTime - now

    if (timeRemaining <= 0) return "Ended"

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`

    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    if (hours > 0) return `${hours}h ${minutes}m remaining`

    return `${minutes}m remaining`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Browse Auctions</h1>

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

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {auctionItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
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
                          <span className="font-bold">${item.currentBid.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Bids:</span>
                          <span>{item.bids}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Time Left:</span>
                          <span className="text-primary">{formatTimeRemaining(item.endTime)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button className="flex-1">Bid Now</Button>
                        <Button variant="outline" className="flex-1">
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
                      const endTime = new Date(item.endTime).getTime()
                      const now = new Date().getTime()
                      return endTime - now < 3 * 24 * 60 * 60 * 1000 // Less than 3 days
                    })
                    .map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg"}
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
                            <span className="font-bold">${item.currentBid.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Bids:</span>
                            <span>{item.bids}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Time Left:</span>
                            <span className="text-destructive font-medium">{formatTimeRemaining(item.endTime)}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex gap-2">
                          <Button className="flex-1">Bid Now</Button>
                          <Button variant="outline" className="flex-1">
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
                            src={item.image || "/placeholder.svg"}
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
                            <span className="font-bold">${item.currentBid.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Bids:</span>
                            <span>{item.bids}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Time Left:</span>
                            <span className="text-primary">{formatTimeRemaining(item.endTime)}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex gap-2">
                          <Button className="flex-1">Bid Now</Button>
                          <Button variant="outline" className="flex-1">
                            Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>

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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

