"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Vintage Watch",
    price: 150,
    image: "/placeholder.jpg",
    timeLeft: "02:30:00", // Hardcoded time left
  },
  {
    id: 2,
    name: "Rare Comic Book",
    price: 200,
    image: "/placeholder.jpg",
    timeLeft: "01:15:45",
  },
  {
    id: 3,
    name: "Antique Vase",
    price: 300,
    image: "/placeholder.jpg",
    timeLeft: "03:50:20",
  },
];

export default function BiddingPage() {
  const [bids, setBids] = useState<{ [key: number]: number }>({
    1: 150,
    2: 200,
    3: 300,
  });

  const handleBid = (id: number) => {
    setBids((prevBids) => ({
      ...prevBids,
      [id]: prevBids[id] + 10, // Hardcoded bid increment
    }));
  };

  const removeBid = (id: number) => {
    setBids((prevBids) => ({
      ...prevBids,
      [id]: Math.max(items.find((item) => item.id === id)?.price || 0, prevBids[id] - 10),
    }));
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100 min-h-screen">
        {items.map((item) => (
          <Card key={item.id} className="w-72 p-4 shadow-lg rounded-lg h-[500px]">
            <Image
              src={item.image}
              alt={item.name}
              width={288} // Matches card width
              height={200}
              className="rounded-lg object-cover"
            />
            <CardContent className="text-center">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-600">Current Bid: ${bids[item.id]}</p>
              <p className="text-red-500 font-medium">Time Left: {item.timeLeft}</p>
              <div className="mt-4 flex flex-col gap-2">
                <Button className="w-full" onClick={() => handleBid(item.id)}>
                  Place Bid (+$10)
                </Button>
                <Button
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={() => removeBid(item.id)}
                >
                  Remove Bid (-$10)
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </main>
  );
}
