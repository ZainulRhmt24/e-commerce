'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function CategoryFilters({ categories, currentCategory }: { categories: string[], currentCategory?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/?#browse" onClick={() => toast.info('Loading all items...')}>
        <Button variant={!currentCategory ? "default" : "outline"} size="sm" className={`rounded-full px-5 h-9 ${!currentCategory ? '' : 'bg-card hover:bg-muted'}`}>
          All Items
        </Button>
      </Link>
      {categories.map(category => (
        <Link key={category} href={`/?category=${encodeURIComponent(category)}#browse`} onClick={() => toast.info(`Filtering by ${category}...`)}>
          <Button
            variant={currentCategory === category ? "default" : "outline"}
            size="sm"
            className={`rounded-full px-5 h-9 ${currentCategory === category ? '' : 'bg-card hover:bg-muted'}`}
          >
            {category}
          </Button>
        </Link>
      ))}
    </div>
  )
}
