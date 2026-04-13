'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function NewsletterForm() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success('Thanks for subscribing!', {
      description: 'You will receive early access to our exclusive drops.',
    })
    setEmail('')
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email" 
        required
        className="flex-1 px-6 h-14 rounded-full bg-card border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
      />
      <Button type="submit" size="lg" className="h-14 px-8 rounded-full font-bold">
        Subscribe
      </Button>
    </form>
  )
}
