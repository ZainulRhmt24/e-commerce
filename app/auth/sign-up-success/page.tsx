'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription>Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You&apos;ve successfully signed up. Please check your email to
                confirm your account before signing in.
              </p>
              <p className="text-sm text-muted-foreground animate-pulse">
                Redirecting to login shortly...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
