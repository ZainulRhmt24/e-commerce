'use client'

import { Button } from '@/components/ui/button'
import { CartItemComponent } from '@/components/cart-item'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'

export default function CartPage() {
  const { items, total, clearCart } = useCart()

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h2>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border p-6">
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${total().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${(total() * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">
                    ${(total() * 1.1).toFixed(2)}
                  </span>
                </div>

                <Link href="/checkout" className="w-full block mb-2">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
