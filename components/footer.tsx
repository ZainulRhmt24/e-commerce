'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  // Hide Footer on Admin and Auth pages
  const isAdminPage = pathname?.startsWith('/admin')
  const isAuthPage = pathname?.startsWith('/auth')
  if (isAdminPage || isAuthPage) return null

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image 
                src="/logo-shophub.png" 
                alt="Shop Hub Logo" 
                width={32} 
                height={32} 
                className="w-8 h-8 object-contain rounded-md" 
              />
              <span className="text-xl font-bold text-foreground">ShopHub</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Discover premium curated products designed for modern living. From high-end electronics to essential accessories, we bring you quality and style.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors text-sm">All Products</Link></li>
              <li><Link href="/categories/electronics" className="text-muted-foreground hover:text-primary transition-colors text-sm">Electronics</Link></li>
              <li><Link href="/categories/accessories" className="text-muted-foreground hover:text-primary transition-colors text-sm">Accessories</Link></li>
              <li><Link href="/categories/storage" className="text-muted-foreground hover:text-primary transition-colors text-sm">Storage</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ShopHub Premium Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">Admin Dashboard</Link>
            <Link href="/setup" className="text-xs text-muted-foreground hover:text-primary transition-colors highlight">Setup</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
