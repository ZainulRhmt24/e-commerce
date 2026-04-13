'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart, type CartItem } from '@/hooks/use-cart'
import { Trash2 } from 'lucide-react'

interface CartItemComponentProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <div className="relative w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{item.name}</h4>
          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 p-0"
          >
            −
          </Button>
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="w-12 h-8 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 p-0"
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <p className="font-semibold text-foreground">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  )
}
