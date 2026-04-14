'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export function ProductCard({ id, name, price, image, description, category }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const IMAGE_MAP: Record<string, string> = {
    'Premium Wireless Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    'Ergonomic Mechanical Keyboard': 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    '4K Webcam': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    'USB-C Hub': 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=800',
    'Laptop Stand': 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80&w=800',
    'Monitor Light Bar': 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=800',
    'Portable SSD 1TB': 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&q=80&w=800',
  }

  const fallbackImage = IMAGE_MAP[name] || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800"
  const finalImage = image || fallbackImage

  const handleAddToCart = async () => {
    setIsAdding(true)
    addItem({
      id,
      name,
      price,
      image: finalImage,
      quantity: 1,
    })
    toast.success(`${name} added to your bag.`)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div className="group border border-border bg-card overflow-hidden hover:border-foreground/20 hover:shadow-2xl transition-all duration-700 flex flex-col h-full rounded-none">
      <div className="relative w-full h-80 bg-muted/20 overflow-hidden flex items-center justify-center">
        <Image
          src={finalImage}
          alt={name}
          fill
          unoptimized // Skip next/image domain checks for Unsplash external URLs
          className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out brightness-95 group-hover:brightness-105"
        />
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 font-bold text-[10px] uppercase tracking-[0.2em] text-foreground border border-border">
          {category}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1 justify-between bg-card">
        <div>
          <h3 className="text-xl font-bold font-serif text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-sm text-muted-foreground mb-8 line-clamp-2 leading-relaxed font-medium">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-4 mt-auto">
          <span className="text-2xl font-bold font-serif text-foreground tracking-tight">${price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            size="sm"
            className="px-6 rounded-none font-bold uppercase tracking-[0.1em] shadow-sm hover:shadow-md transition-all bg-foreground text-background"
          >
            {isAdding ? 'Adding' : 'Add to Bag'}
          </Button>
        </div>
      </div>
    </div>
  )
}
