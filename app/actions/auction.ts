"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface CreateAuctionItemParams {
  title: string
  description: string
  category: string
  startingBid: number
  reservePrice?: number
  auctionStart: Date
  auctionEnd: Date
  images: string[]
  shippingInfo?: string
}

export async function createAuctionItem(data: CreateAuctionItemParams) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in to create an auction" }
  }

  try {
    const auctionItem = await prisma.auctionItem.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    revalidatePath("/auction-off")
    revalidatePath("/bid")

    return { success: true, id: auctionItem.id }
  } catch (error) {
    console.error("Create auction error:", error)
    return { error: "Failed to create auction item" }
  }
}

export async function getUserAuctionItems() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in to view your auctions" }
  }

  try {
    const auctionItems = await prisma.auctionItem.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, items: auctionItems }
  } catch (error) {
    console.error("Get user auctions error:", error)
    return { error: "Failed to fetch your auction items" }
  }
}

export async function deleteAuctionItem(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in to delete an auction" }
  }

  try {
    // Check if the auction belongs to the user
    const auctionItem = await prisma.auctionItem.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!auctionItem) {
      return { error: "Auction item not found" }
    }

    if (auctionItem.userId !== session.user.id) {
      return { error: "You don't have permission to delete this auction" }
    }

    // Delete the auction item
    await prisma.auctionItem.delete({
      where: { id },
    })

    revalidatePath("/auction-off")
    revalidatePath("/bid")

    return { success: true }
  } catch (error) {
    console.error("Delete auction error:", error)
    return { error: "Failed to delete auction item" }
  }
}

export async function getAllAuctionItems() {
  try {
    const now = new Date()

    const auctionItems = await prisma.auctionItem.findMany({
      where: {
        status: "active",
        auctionEnd: {
          gt: now,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        auctionEnd: "asc",
      },
    })

    return { success: true, items: auctionItems }
  } catch (error) {
    console.error("Get all auctions error:", error)
    return { error: "Failed to fetch auction items" }
  }
}

export async function placeBid(auctionItemId: string, amount: number) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in to place a bid" }
  }

  try {
    // Get the auction item
    const auctionItem = await prisma.auctionItem.findUnique({
      where: { id: auctionItemId },
    })

    if (!auctionItem) {
      return { error: "Auction item not found" }
    }

    // Check if auction is still active
    const now = new Date()
    if (now > auctionItem.auctionEnd) {
      return { error: "This auction has ended" }
    }

    // Check if bid amount is higher than current bid or starting bid
    const currentHighestBid = auctionItem.currentBid || auctionItem.startingBid
    if (amount <= currentHighestBid) {
      return { error: `Bid must be higher than the current bid of $${currentHighestBid}` }
    }

    // Create the bid and update the auction item
    await prisma.$transaction([
      prisma.bid.create({
        data: {
          amount,
          userId: session.user.id,
          auctionItemId,
        },
      }),
      prisma.auctionItem.update({
        where: { id: auctionItemId },
        data: {
          currentBid: amount,
          bids: { increment: 1 },
        },
      }),
    ])

    revalidatePath("/bid")

    return { success: true }
  } catch (error) {
    console.error("Place bid error:", error)
    return { error: "Failed to place bid" }
  }
}

