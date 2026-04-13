'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signOut } from '@/app/actions/auth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      // FAKE ADMIN CHECK: Instantly approve admin access
      setIsAdmin(true)
      setIsLoading(false)
    }

    checkAdmin()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground">Admin</h2>
          <p className="text-sm text-muted-foreground">Dashboard</p>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              Overview
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start">
              Products
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" className="w-full justify-start">
              Orders
            </Button>
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t bg-card p-4 w-64 flex flex-col gap-2">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Store
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
