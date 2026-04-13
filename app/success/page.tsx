import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Order Successful - TechStore',
  description: 'Your order has been placed successfully',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/auth/login" className="block">
            <Button variant="outline" className="w-full">
              View Order Status
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
