import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <Head>
          <title>About - Auction House</title>
        </Head>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Auction House</h1>
          <p className="text-gray-700 mb-4">
            Auction House is a web application built with Next.js that provides a simple and
            efficient platform for users to auction off their items to other users. The
            application enables seamless bidding, listing, and purchasing of items in a
            user-friendly environment.
          </p>
          <p className="text-gray-500 font-medium">Developed by <span className="font-semibold">23BCE0014</span></p>
        </div>
      </div>
      <Footer />
    </main>
  )
}