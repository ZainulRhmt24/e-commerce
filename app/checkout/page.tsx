'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleCheckout = async () => {
    if (!email || items.length === 0) {
      alert('Please enter an email and add items to cart')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(item.price * 100),
              product_data: {
                name: item.name,
                images: [item.image],
              },
            },
            quantity: item.quantity,
          })),
          customer_email: email,
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/checkout`,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
        clearCart()
      } else {
        alert('Error creating checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error during checkout')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-foreground hover:opacity-80 transition">
              TechStore
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8">Checkout</h2>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Order Review */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Review</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${(total() * 1.1).toFixed(2)}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Checkout Actions */}
            <div className="flex gap-4">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Cart
                </Button>
              </Link>
              <Button
                onClick={handleCheckout}
                disabled={isLoading || !email}
                className="flex-1"
              >
                {isLoading ? 'Processing...' : 'Complete Purchase'}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
