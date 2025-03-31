import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">About Auction House</h1>
        <div className="prose max-w-none">
          <p className="mb-4">
            Welcome to Auction House, your premier destination for online auctions. Established with a vision to create
            a transparent, secure, and user-friendly platform for buyers and sellers alike, we have quickly grown to
            become a trusted marketplace for unique and valuable items.
          </p>
          <p className="mb-4">
            Our mission is to connect passionate collectors, savvy shoppers, and sellers looking to reach a global
            audience. Whether you're searching for rare collectibles, vintage items, or modern treasures, our platform
            offers a diverse range of categories to explore.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              <strong>Transparency:</strong> We believe in clear, honest communication and fair bidding processes.
            </li>
            <li className="mb-2">
              <strong>Security:</strong> Your data and transactions are protected with state-of-the-art security
              measures.
            </li>
            <li className="mb-2">
              <strong>Community:</strong> We foster a community of passionate collectors and sellers who share knowledge
              and expertise.
            </li>
            <li className="mb-2">
              <strong>Innovation:</strong> We continuously improve our platform to provide the best possible user
              experience.
            </li>
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4">How We Work</h2>
          <p className="mb-4">
            Our platform connects sellers with potential buyers through a secure and transparent auction process.
            Sellers can list their items with detailed descriptions and images, set starting bids, and reach a global
            audience. Buyers can browse categories, place bids, and track their activity all in one place.
          </p>
          <p className="mb-4">
            We verify all sellers and implement secure payment processing to ensure a safe experience for everyone
            involved. Our customer support team is available to assist with any questions or concerns throughout the
            process.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

