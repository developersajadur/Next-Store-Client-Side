"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IProductCard } from "@/types";
import Link from "next/link";

interface AdminProductsTableProps {
  products: IProductCard[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface FilterForm {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  availability: string;
}

export function ManageProducts({
  products,
  currentPage,
  totalPages,
  totalItems,
}: AdminProductsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<string[]>([]);
  const itemsPerPage = 20;

  const { register, watch, setValue, handleSubmit, reset } =
    useForm<FilterForm>({
      defaultValues: {
        search: "",
        category: "all",
        minPrice: "",
        maxPrice: "",
        availability: "all",
      },
    });

  const values = watch();

  useEffect(() => {
    if (!searchParams) return;

    const paramsObj: Partial<FilterForm> = {
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "all",
      minPrice: searchParams.get("priceMin") ?? "",
      maxPrice: searchParams.get("priceMax") ?? "",
      availability: searchParams.get("availability") ?? "all",
    };

    reset(paramsObj);
  }, [searchParams, reset]);

  const selectAll = (checked: boolean) => {
    setSelected(checked ? products.map((p) => p._id) : []);
  };

  const selectOne = (id: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const buildUrlParams = (filters: FilterForm, page: number) => {
    const params = new URLSearchParams();

    if (filters.search.trim()) params.set("search", filters.search.trim());
    if (filters.category && filters.category !== "all")
      params.set("category", filters.category);
    if (filters.minPrice) params.set("priceMin", filters.minPrice);
    if (filters.maxPrice) params.set("priceMax", filters.maxPrice);
    if (filters.availability && filters.availability !== "all")
      params.set("availability", filters.availability);

    params.set("page", page.toString());

    return params.toString();
  };

  const applyFilters = (data: FilterForm) => {
    const queryString = buildUrlParams(data, 1);
    router.replace(`/dashboard/manage-products?${queryString}`);
  };

  const clearFilters = () => {
    reset({
      search: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      availability: "all",
    });
    setSelected([]);
    router.replace("/dashboard/manage-products");
  };

  const goToPage = (page: number) => {
    const queryString = buildUrlParams(values, page);
    router.replace(`/dashboard/manage-products?${queryString}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link href={"/dashboard/manage-products/add-product"} >
        <Button>
          <Plus className="mr-2" /> Add Product
        </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(applyFilters)}>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="search" placeholder="Search products..." className="pl-8" {...register("search")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Category slug or name..." {...register("category")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minPrice">Min Price</Label>
                <Input id="minPrice" type="number" placeholder="0" {...register("minPrice")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPrice">Max Price</Label>
                <Input id="maxPrice" type="number" placeholder="1000" {...register("maxPrice")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={values.availability} onValueChange={(val) => setValue("availability", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button type="submit">Apply Filters</Button>
              <Button variant="outline" onClick={clearFilters} type="button">Clear Filters</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {selected.length > 0 && (
        <Card>
          <CardContent>
            <div className="flex justify-between items-center">
              <p>{selected.length} item(s) selected</p>
              <div className="flex gap-2">
                <Button size="sm">Bulk Edit</Button>
                <Button size="sm">Export</Button>
                <Button size="sm" variant="destructive">Delete Selected</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      checked={selected.length === products.length && products.length > 0}
                      onCheckedChange={selectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(p._id)}
                        onCheckedChange={(val) => selectOne(p._id, val as boolean)}
                      />
                    </TableCell>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{p.price.toFixed(2)} BDT</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {p.category.map((cat) => (
                            <DropdownMenuItem key={cat._id}>{cat.title}</DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>{p.brand?.title}</TableCell>
                    <TableCell>{p.stock_quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          p.stock_quantity > 10
                            ? "default"
                            : p.stock_quantity > 0
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {p.stock_quantity > 10
                          ? "In Stock"
                          : p.stock_quantity > 0
                          ? "Low Stock"
                          : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center py-4">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}–
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}