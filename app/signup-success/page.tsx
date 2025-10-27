import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function SignupSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-4 text-4xl">✓</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Created!</h1>
          <p className="text-muted-foreground mb-8">
            Please check your email to confirm your account before signing in.
          </p>
          <Link href="/login">
            <Button className="w-full bg-primary hover:bg-primary/90">Back to Login</Button>
          </Link>
        </Card>
      </div>
    </main>
  )
}
