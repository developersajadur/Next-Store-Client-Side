"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from "lucide-react"

const revenueData = [
  { month: "Jan", current: 15000, previous: 12000 },
  { month: "Feb", current: 18000, previous: 14000 },
  { month: "Mar", current: 22000, previous: 16000 },
  { month: "Apr", current: 25000, previous: 18000 },
  { month: "May", current: 28000, previous: 20000 },
  { month: "Jun", current: 32000, previous: 22000 },
]

const salesChannelData = [
  { name: "Direct", value: 38.6, color: "#8b5cf6" },
  { name: "Affiliate", value: 25.2, color: "#06b6d4" },
  { name: "Sponsored", value: 21.8, color: "#10b981" },
  { name: "E-mail", value: 14.4, color: "#f59e0b" },
]

const topProducts = [
  { name: "Shirt", price: 76.89, category: "Men Cloths", quantity: 128, amount: 6647.15 },
  { name: "T-Shirt", price: 79.8, category: "Women Cloths", quantity: 89, amount: 6647.15 },
  { name: "Pant", price: 86.65, category: "Kid Cloths", quantity: 74, amount: 6647.15 },
  { name: "Sweater", price: 56.07, category: "Men Cloths", quantity: 69, amount: 6647.15 },
  { name: "Light Jacket", price: 36.0, category: "Women Cloths", quantity: 65, amount: 6647.15 },
]

export default function DashboardAnalysisPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Report Analysis</h1>
        <p className="text-sm md:text-base text-muted-foreground">Here's what's happening with your business today.</p>
      </div>

      {/* Overview Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">$34,456.00</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              14% in the last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Order</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">3456</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              17% in the last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">$1,456.00</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              14% in the last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customer</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">42,456</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              11% in the last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart - Takes 2 columns on large screens */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Revenue</CardTitle>
            <CardDescription className="text-sm">
              <span className="hidden sm:inline">Current Week: $58,211 • Previous Week: $68,763</span>
              <span className="sm:hidden">Current vs Previous Week</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                current: {
                  label: "Current Week",
                  color: "hsl(var(--chart-1))",
                },
                previous: {
                  label: "Previous Week",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px] md:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} tickMargin={10} />
                  <YAxis fontSize={12} tickMargin={10} tickFormatter={(value: any) => `$${value / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="var(--color-current)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="var(--color-previous)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sales Channel Chart - Takes 1 column */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Total Sales</CardTitle>
            <CardDescription className="text-sm">Sales by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                direct: { label: "Direct", color: "#8b5cf6" },
                affiliate: { label: "Affiliate", color: "#06b6d4" },
                sponsored: { label: "Sponsored", color: "#10b981" },
                email: { label: "E-mail", color: "#f59e0b" },
              }}
              className="h-[200px] md:h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesChannelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {salesChannelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {salesChannelData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Products - Responsive Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Top Selling Products</CardTitle>
          <CardDescription className="text-sm">Your best performing products this month</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{product.name}</h3>
                  <span className="text-sm font-medium">${product.price}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Category: {product.category}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Amount: ${product.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Product Name</th>
                  <th className="text-left py-3 px-2">Price</th>
                  <th className="text-left py-3 px-2">Category</th>
                  <th className="text-left py-3 px-2">Quantity</th>
                  <th className="text-left py-3 px-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-2 font-medium">{product.name}</td>
                    <td className="py-3 px-2">${product.price}</td>
                    <td className="py-3 px-2">{product.category}</td>
                    <td className="py-3 px-2">{product.quantity}</td>
                    <td className="py-3 px-2">${product.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
