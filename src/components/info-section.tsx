export default function InfoSection() {
  return (
    <section className="py-12 md:py-24 bg-muted/50 flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-3 text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Discover Unique Items</h3>
            <p className="text-muted-foreground">
              Browse through our extensive collection of rare and unique items from sellers around the world.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Secure Bidding</h3>
            <p className="text-muted-foreground">
              Our platform ensures secure transactions and transparent bidding processes for all users.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Sell with Confidence</h3>
            <p className="text-muted-foreground">
              List your items with ease and reach thousands of potential buyers interested in what you have to offer.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 justify-center text-center">
            {[
              { step: "1", title: "Create an Account", desc: "Sign up and complete your profile to start bidding or selling." },
              { step: "2", title: "Browse Auctions", desc: "Explore active auctions and find items that interest you." },
              { step: "3", title: "Place Bids", desc: "Bid on items you want and keep track of your active bids." },
              { step: "4", title: "Win & Receive", desc: "Pay securely and receive your items directly from the seller." }
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
