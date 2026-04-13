import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Package, DollarSign, Users } from 'lucide-react'
import { AdminChart } from '@/components/admin-chart'

export const metadata = {
  title: 'Admin Dashboard - TechStore',
  description: 'Admin dashboard for managing the e-commerce store',
}

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase.from('orders').select('*')
  const { data: products } = await supabase.from('products').select('*')
  const { data: profiles } = await supabase.from('profiles').select('*')

  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0
  const totalOrders = orders?.length || 0
  const totalProducts = products?.length || 0
  const totalUsers = profiles?.length || 0

  // Group orders by date for chart
  const ordersByDate = orders?.reduce((acc: Record<string, number>, order) => {
    const date = new Date(order.created_at).toLocaleDateString()
    acc[date] = (acc[date] || 0) + (order.total || 0)
    return acc
  }, {}) || {}

  const chartData = Object.entries(ordersByDate).map(([date, total]) => ({
    date,
    total,
  }))

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Completed orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">In catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <AdminChart data={chartData} />
          ) : (
            <p className="text-muted-foreground text-center py-8">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
