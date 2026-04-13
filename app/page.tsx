import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'
import { CategoryFilters } from '@/components/category-filters'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export const metadata = {
  title: 'ShopHub – Premium E-Commerce curated for You',
  description: 'Discover curated electronics, accessories, and storage solutions.',
}

export default async function HomePage(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams
  const categoryFilter = searchParams?.category as string | undefined
  const supabase = await createClient()
  let query = supabase.from('products').select('*').order('created_at', { ascending: false })
  
  if (categoryFilter) {
    query = query.eq('category', categoryFilter)
  }

  const { data: products } = await query

  const { data: allProducts } = await supabase.from('products').select('category')
  const categories = [...new Set((allProducts || []).map(p => p.category))]
  const featuredProducts = products?.slice(0, 3) || []

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Luxury Editorial Aesthetic */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-32 border-b border-border">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djp7d121x/image/upload/v1689255839/grid_1_f5l9x0.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex-1 max-w-2xl relative z-20">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-border bg-card shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">The 2025 Édition</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-foreground mb-8 tracking-tighter leading-[1.05] font-serif">
              Objects <br /> 
              of <span className="text-muted-foreground italic font-light">Desire.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed font-medium">
              We meticulously curate the world’s most exquisite electronics and modern essentials. Uncompromising quality meets timeless design.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <Link href="#browse">
                <Button size="lg" className="h-14 px-10 rounded-none text-sm font-bold uppercase tracking-[0.15em] bg-foreground text-background hover:bg-foreground/90 transition-all">
                  Shop Collection
                </Button>
              </Link>
              <Link href="#featured" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors hover:underline underline-offset-8">
                Featured Highlights
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full relative group">
            <div className="absolute -inset-4 bg-border/40 transform rotate-2 transition-transform duration-700 group-hover:rotate-1"></div>
            <div className="relative aspect-[4/5] lg:aspect-square w-full bg-muted overflow-hidden shadow-2xl">
              {/* Stunning Unsplash placeholder for Hero */}
              <img 
                src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=100&w=1200" 
                alt="Premium Lifestyle" 
                className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-bold tracking-[0.2em] uppercase">Featured: Midnight Black Collection</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Featured Section */}
      {featuredProducts.length > 0 && (
        <section id="featured" className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Picks</h2>
                <p className="text-muted-foreground">Most loved items from our community.</p>
              </div>
              <Button variant="ghost" className="hidden sm:flex group items-center">
                View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product: Product) => (
                <div key={product.id} className="relative group overflow-hidden rounded-3xl bg-card border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                   <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Browse Section */}
      <main id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <TrendingUp className="h-4 w-4" />
              Explore Catalog
            </div>
            <h2 className="text-4xl font-bold text-foreground tracking-tight">Browse Everything</h2>
          </div>
          
          {categories.length > 0 && (
            <CategoryFilters categories={categories} currentCategory={categoryFilter} />
          )}
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                category={product.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 rounded-3xl bg-muted/10 border border-dashed border-border">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground text-lg mb-6">Your store items will appear here after setup.</p>
            <Link href="/setup">
              <Button size="lg" className="rounded-full px-8">Run Initial Setup</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Newsletter / Call to Action */}
      <section className="py-24 border-t border-border overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Stay in the Loop</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Get early access to exclusive collection drops and premium content curated just for you.
            </p>
            <div className="mt-10">
              <NewsletterForm />
            </div>
         </div>
      </section>
    </div>
  )
}
