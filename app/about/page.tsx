import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Exclusive Story - ShopHub',
  description: 'Learn about our passion for curated electronics and accessories.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 bg-card">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center pt-16">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-8 text-foreground">
          The ShopHub Story
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          We believe that everyday essentials should be extraordinary. Our mission is to
          curate a collection of premium, meticulously designed items that elevate your
          daily life. Uncompromising quality meets timeless aesthetic.
        </p>
        <Link href="/?#browse">
          <Button size="lg" className="rounded-none uppercase tracking-widest font-bold px-10 h-14">
            Explore the Collection
          </Button>
        </Link>
      </div>
    </div>
  )
}
