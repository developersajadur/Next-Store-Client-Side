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
import { Search, Filter, MoreHorizontal, Eye, RefreshCw } from "lucide-react"

const payments = [
  {
    id: 1,
    orderId: "ORD-001",
    customer: "John Doe",
    amount: 299.99,
    status: "Paid",
    method: "Online",
    date: "2024-01-15",
    transactionId: "TXN-001",
  },
  {
    id: 2,
    orderId: "ORD-002",
    customer: "Jane Smith",
    amount: 149.99,
    status: "Pending",
    method: "Cash",
    date: "2024-01-16",
    transactionId: "TXN-002",
  },
  {
    id: 3,
    orderId: "ORD-003",
    customer: "Mike Johnson",
    amount: 89.99,
    status: "Failed",
    method: "Online",
    date: "2024-01-17",
    transactionId: "TXN-003",
  },
  {
    id: 4,
    orderId: "ORD-004",
    customer: "Sarah Wilson",
    amount: 199.99,
    status: "Refunded",
    method: "Online",
    date: "2024-01-18",
    transactionId: "TXN-004",
  },
  {
    id: 5,
    orderId: "ORD-005",
    customer: "Tom Brown",
    amount: 79.99,
    status: "Paid",
    method: "Cash",
    date: "2024-01-19",
    transactionId: "TXN-005",
  },
]

interface FilterForm {
  search: string
  status: string
  method: string
  dateFrom: string
  dateTo: string
}

export default function PaymentsPage() {
  const [paymentList, setPaymentList] = useState(payments)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPayments, setSelectedPayments] = useState<number[]>([])
  const itemsPerPage = 10

  const { register, watch, setValue } = useForm<FilterForm>({
    defaultValues: {
      search: "",
      status: "All status",
      method: "All methods",
      dateFrom: "",
      dateTo: "",
    },
  })

  const watchedValues = watch()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPayments(paymentList.map((p) => p.id))
    } else {
      setSelectedPayments([])
    }
  }

  const handleSelectPayment = (paymentId: number, checked: boolean) => {
    if (checked) {
      setSelectedPayments([...selectedPayments, paymentId])
    } else {
      setSelectedPayments(selectedPayments.filter((id) => id !== paymentId))
    }
  }

  const filteredPayments = paymentList.filter((payment) => {
    const matchesSearch =
      payment.orderId.toLowerCase().includes(watchedValues.search.toLowerCase()) ||
      payment.customer.toLowerCase().includes(watchedValues.search.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(watchedValues.search.toLowerCase())
    const matchesStatus = !watchedValues.status || payment.status === watchedValues.status
    const matchesMethod = !watchedValues.method || payment.method === watchedValues.method

    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "secondary"
      case "Failed":
        return "destructive"
      case "Refunded":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Manage Payments</h1>
          <p className="text-sm md:text-base text-muted-foreground">Track and manage payment transactions</p>
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
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Search payments..." className="pl-8" {...register("search")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={watchedValues.status} onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All status">All status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Method</Label>
              <Select value={watchedValues.method} onValueChange={(value) => setValue("method", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All methods">All methods</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
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
      {selectedPayments.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{selectedPayments.length} payment(s) selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export Selected
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Failed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments ({filteredPayments.length})</CardTitle>
          <CardDescription>A list of all payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedPayments.length === paginatedPayments.length && paginatedPayments.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedPayments.includes(payment.id)}
                        onCheckedChange={(checked) => handleSelectPayment(payment.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{payment.orderId}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
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
                          {payment.status === "Failed" && (
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Retry Payment
                            </DropdownMenuItem>
                          )}
                          {payment.status === "Paid" && (
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Refund
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of{" "}
              {filteredPayments.length} results
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
