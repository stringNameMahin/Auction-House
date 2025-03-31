import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Check your email</CardTitle>
            <CardDescription className="text-center">
              A sign in link has been sent to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>If you don't see it, check your spam folder. The link will expire after 24 hours.</p>
            <p className="text-sm text-muted-foreground">
              If you didn't receive an email, you can request a new verification link.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/login">Back to login</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

