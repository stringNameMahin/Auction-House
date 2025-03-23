export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-screen">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Auction House
          </span>
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Discover unique items and bid on treasures from around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="/bid"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Start Bidding
          </a>
          <a
            href="/auction-off"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Auction an Item
          </a>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </section>
  );
}
