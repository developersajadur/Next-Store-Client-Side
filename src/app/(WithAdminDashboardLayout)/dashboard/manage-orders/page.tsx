"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Truck, CheckCircle, XCircle } from "lucide-react"

const orders = [
  { id: 1, orderId: "ORD-001", customer: "John Doe", total: 299.99, status: "Pending", items: 3, date: "2024-01-15" },
  {
    id: 2,
    orderId: "ORD-002",
    customer: "Jane Smith",
    total: 149.99,
    status: "Confirmed",
    items: 2,
    date: "2024-01-16",
  },
  {
    id: 3,
    orderId: "ORD-003",
    customer: "Mike Johnson",
    total: 89.99,
    status: "Shipped",
    items: 1,
    date: "2024-01-17",
  },
  {
    id: 4,
    orderId: "ORD-004",
    customer: "Sarah Wilson",
    total: 199.99,
    status: "Delivered",
    items: 4,
    date: "2024-01-18",
  },
  { id: 5, orderId: "ORD-005", customer: "Tom Brown", total: 79.99, status: "Cancelled", items: 1, date: "2024-01-19" },
  {
    id: 6,
    orderId: "ORD-006",
    customer: "Lisa Davis",
    total: 329.99,
    status: "Returned",
    items: 2,
    date: "2024-01-20",
  },
]

interface FilterForm {
  search: string
  status: string
  dateFrom: string
  dateTo: string
}

export default function OrdersPage() {
  const [orderList, setOrderList] = useState(orders)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const itemsPerPage = 10

  const { register, watch, setValue } = useForm<FilterForm>({
    defaultValues: {
      search: "",
      status: "All status", // Updated default value to be a non-empty string
      dateFrom: "",
      dateTo: "",
    },
  })

  const watchedValues = watch()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orderList.map((o) => o.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: number, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
    setOrderList(orderList.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const filteredOrders = orderList.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(watchedValues.search.toLowerCase()) ||
      order.customer.toLowerCase().includes(watchedValues.search.toLowerCase())
    const matchesStatus = !watchedValues.status || order.status === watchedValues.status

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary"
      case "Confirmed":
        return "default"
      case "Shipped":
        return "default"
      case "Delivered":
        return "default"
      case "Cancelled":
        return "destructive"
      case "Returned":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Manage Orders</h1>
          <p className="text-sm md:text-base text-muted-foreground">Track and manage customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Search orders..." className="pl-8" {...register("search")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={watchedValues.status} onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All status">All status</SelectItem>{" "}
                  {/* Updated value prop to be a non-empty string */}
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input id="dateFrom" type="date" {...register("dateFrom")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input id="dateTo" type="date" {...register("dateTo")} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Actions */}
      {selectedOrders.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{selectedOrders.length} order(s) selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Confirmed
                </Button>
                <Button variant="outline" size="sm">
                  <Truck className="mr-2 h-4 w-4" />
                  Mark as Shipped
                </Button>
                <Button variant="outline" size="sm">
                  Export Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>A list of all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {order.status === "Pending" && (
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "Confirmed")}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Confirm Order
                            </DropdownMenuItem>
                          )}
                          {order.status === "Confirmed" && (
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "Shipped")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Mark as Shipped
                            </DropdownMenuItem>
                          )}
                          {order.status === "Shipped" && (
                            <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "Delivered")}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                          )}
                          {(order.status === "Pending" || order.status === "Confirmed") && (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleUpdateOrderStatus(order.id, "Cancelled")}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} results
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
