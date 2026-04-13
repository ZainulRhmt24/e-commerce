import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Edit2, Trash2 } from 'lucide-react'

export const metadata = {
  title: 'Products - Admin Dashboard',
  description: 'Manage products in the store',
}

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          {products && products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="relative w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name || 'Product Image'}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex w-full h-full justify-center items-center text-xs text-muted-foreground bg-secondary">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>{product.category}</span>
                      <span>${product.price.toFixed(2)}</span>
                      <span>{product.stock} in stock</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No products yet</p>
              <Link href="/admin/products/new">
                <Button>Create Your First Product</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
