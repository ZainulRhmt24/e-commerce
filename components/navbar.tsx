'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, Menu, X, LayoutDashboard, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hide Navbar on Admin and Auth pages for clean UI
  const isAdminPage = pathname?.startsWith('/admin')
  const isAuthPage = pathname?.startsWith('/auth')
  if (isAdminPage || isAuthPage) return null

  return (
    <header className="sticky top-0 w-full z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 bg-inherit">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 shrink-0 group">
            <Image 
              src="/logo-shophub.png" 
              alt="Shop Hub Logo" 
              width={40} 
              height={40} 
              className="w-10 h-10 object-contain transition-transform group-hover:-translate-y-0.5 rounded-lg" 
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">SHOPHUB</h1>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.25em] mt-1">Édition</p>
            </div>
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden lg:flex flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <Input
              type="search"
              placeholder="Search premium collections..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  toast.info(`Searching for "${e.currentTarget.value}"...`)
                  e.currentTarget.value = ''
                }
              }}
              className="pl-12 h-11 bg-muted/30 border border-transparent hover:border-border focus:border-border focus-visible:ring-0 rounded-none transition-all text-sm font-medium w-full"
            />
          </div>

          {/* Navigation & Actions */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/admin">
              <span className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest cursor-pointer">Admin</span>
            </Link>
            
            <div className="w-px h-6 bg-border mx-2"></div>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent group">
                <ShoppingBag className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                <span className="absolute top-1 right-2 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
            </Link>
            
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:bg-transparent"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
              </Button>
            )}

            <Link href="/auth/login" className="ml-2">
              <Button className="h-11 px-8 rounded-none font-bold uppercase tracking-widest text-xs">Sign In</Button>
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1 relative z-50 bg-inherit">
            <Link href="/cart" className="mr-1">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-card border-b border-border shadow-2xl z-40 animate-in slide-in-from-top-2">
          <div className="px-6 py-8 space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    toast.info(`Searching for "${e.currentTarget.value}"...`)
                    e.currentTarget.value = ''
                    setIsMenuOpen(false)
                  }
                }}
                className="w-full bg-muted/30 border-none rounded-none pl-12 h-14 font-medium"
              />
            </div>
            
            <nav className="flex flex-col gap-6">
              <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <LayoutDashboard className="h-5 w-5" /> Admin Panel
              </Link>
              
              {mounted && (
                <button 
                  className="flex items-center gap-4 text-lg font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors text-left"
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark')
                    setIsMenuOpen(false)
                  }}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />} Switch Theme
                </button>
              )}
              
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full mt-4 h-14 text-sm uppercase tracking-widest rounded-none font-bold">Sign In</Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

