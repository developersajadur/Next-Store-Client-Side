"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Save, ArrowLeft, Package, ImageIcon, DollarSign, Tag, FileText, Loader2 } from "lucide-react"
import Link from "next/link"
import { MultiSelect } from "@/components/shared/MultiSelect"
import { RichTextEditor } from "@/components/shared/RichTextEditor"
import { MultiImageUpload } from "@/components/shared/ImageUpload/MultiImageUpload"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { IMediaResponse } from "@/types"
import { createProduct, TProduct } from "@/services/(AdminServices/ManageProductService"
import { SingleImageUpload } from "@/components/shared/ImageUpload/SingleImageUpload"

const categories = [
  { value: "68339490284573cbd701c680", label: "Home Appliances" },
  { value: "68339472284573cbd701c67c", label: "Fashion" },
  { value: "68339464284573cbd701c678", label: "Electronics" },
]

const brands = [
  { value: "6834e3f701008a6072fdd451", label: "StyleNest" },
  { value: "6833964d284573cbd701c69c", label: "LG" },
  { value: "68339633284573cbd701c698", label: "HomeEase" },
  { value: "6833941d284573cbd701c673", label: "TechNova" }
]

const colors = [
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
]

export default function AddProductPage() {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<IMediaResponse | null>(null)
  const [galleryImages, setGalleryImages] = useState<IMediaResponse[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: {
      title: "",
      image: null,
      gallery_images: [],
      category: [],
      brand: "",
      description: "",
      short_description: "",
      color: [],
      price: 0,
      regular_price: 0,
      sale_price: 0,
      stock_quantity: 0,
      specifications: [{ key: "", value: "" }],
      warranty: "",
      weight: 0,
      size: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: ""
    },
  })

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specifications",
  })

  const onSubmit = async (formData: TProduct) => {
    setIsSubmitting(true)
    try {
      // Convert number fields from strings to numbers
      const productData: TProduct = {
        ...formData,
        price: Number(formData.price),
        regular_price: Number(formData.regular_price),
        sale_price: Number(formData.sale_price),
        stock_quantity: Number(formData.stock_quantity),
        weight: Number(formData.weight),
        image: mainImage?._id || null,
        gallery_images: galleryImages.map(img => img._id),
        category: selectedCategories,
        color: selectedColors,
      }

      const response = await createProduct(productData)
      
      if (response.success) {
        toast.success(response.message || "Product created successfully")
        router.push("/dashboard/manage-products")
      } else {
        toast.error(response.error || "Failed to create product")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error("An error occurred while creating the product")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/manage-products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Add New Product</h1>
            <p className="text-sm md:text-base text-muted-foreground">Create a new product for your store</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" type="button">Save as Draft</Button>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content - Removed outer form element */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                <Package className="mr-2 h-5 w-5 text-primary" />
                Product Information
              </CardTitle>
              <CardDescription className="text-gray-600">Basic details about your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-medium">Product Name *</Label>
                  <Input
                    id="title"
                    {...register("title", { required: "Product name is required" })}
                    placeholder="Enter product name"
                    className="focus-visible:ring-primary"
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand" className="font-medium">Brand *</Label>
                  <Select 
                    onValueChange={(value) => setValue("brand", value)}
                    required
                  >
                    <SelectTrigger className="focus:ring-primary">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.value} value={brand.value}>
                          {brand.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Categories *</Label>
                  <MultiSelect
                    options={categories}
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                    placeholder="Select categories"
                  />
                  {selectedCategories.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">At least one category is required</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_description" className="font-medium">Short Description</Label>
                <Textarea
                  id="short_description"
                  {...register("short_description")}
                  placeholder="Brief description of the product"
                  rows={3}
                  className="focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium">Description *</Label>
                <RichTextEditor
                  value={watch("description")}
                  onChange={(value) => setValue("description", value)}
                  placeholder="Detailed product description"
                />
                {!watch("description") && (
                  <p className="text-sm text-red-500 mt-1">Description is required</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Pricing & Inventory
              </CardTitle>
              <CardDescription className="text-gray-600">Set pricing and manage inventory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regular_price" className="font-medium">Regular Price *</Label>
                  <Input
                    id="regular_price"
                    type="number"
                    step="0.01"
                    {...register("regular_price", { 
                      required: "Regular price is required", 
                      min: { value: 0, message: "Price must be positive" },
                      valueAsNumber: true
                    })}
                    placeholder="0.00"
                    className="focus-visible:ring-primary"
                  />
                  {errors.regular_price && <p className="text-sm text-red-500 mt-1">{errors.regular_price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale_price" className="font-medium">Sale Price</Label>
                  <Input
                    id="sale_price"
                    type="number"
                    step="0.01"
                    {...register("sale_price", { 
                      min: { value: 0, message: "Price must be positive" },
                      valueAsNumber: true
                    })}
                    placeholder="0.00"
                    className="focus-visible:ring-primary"
                  />
                  {errors.sale_price && <p className="text-sm text-red-500 mt-1">{errors.sale_price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-medium">Current Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { 
                      required: "Current price is required", 
                      min: { value: 0, message: "Price must be positive" },
                      valueAsNumber: true
                    })}
                    placeholder="0.00"
                    className="focus-visible:ring-primary"
                  />
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock_quantity" className="font-medium">Stock Quantity *</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    {...register("stock_quantity", { 
                      required: "Stock quantity is required", 
                      min: { value: 0, message: "Quantity must be positive" },
                      valueAsNumber: true
                    })}
                    placeholder="0"
                    className="focus-visible:ring-primary"
                  />
                  {errors.stock_quantity && <p className="text-sm text-red-500 mt-1">{errors.stock_quantity.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="font-medium">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    {...register("weight", { 
                      min: { value: 0, message: "Weight must be positive" },
                      valueAsNumber: true
                    })}
                    placeholder="0.00"
                    className="focus-visible:ring-primary"
                  />
                  {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="font-medium">Size</Label>
                <Input 
                  id="size" 
                  {...register("size")} 
                  placeholder="e.g., 55 inch, Large, XL" 
                  className="focus-visible:ring-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Specifications */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Specifications
              </CardTitle>
              <CardDescription className="text-gray-600">Add technical specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {specFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`spec-key-${index}`} className="font-medium">Specification</Label>
                    <Input
                      id={`spec-key-${index}`}
                      {...register(`specifications.${index}.key` as const)}
                      placeholder="e.g., Display Technology"
                      className="focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`spec-value-${index}`} className="font-medium">Value</Label>
                    <Input
                      id={`spec-value-${index}`}
                      {...register(`specifications.${index}.value` as const)}
                      placeholder="e.g., OLED"
                      className="focus-visible:ring-primary"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSpec(index)}
                    disabled={specFields.length === 1}
                    className="border-gray-300 hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendSpec({ key: "", value: "" })}
                className="w-full border-gray-300 hover:bg-gray-100"
              >
                <Plus className="mr-2 h-4 w-4 text-primary" />
                Add Specification
              </Button>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                <Tag className="mr-2 h-5 w-5 text-primary" />
                SEO Settings
              </CardTitle>
              <CardDescription className="text-gray-600">Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle" className="font-medium">SEO Title</Label>
                <Input 
                  id="seoTitle" 
                  {...register("seoTitle")} 
                  placeholder="SEO optimized title" 
                  className="focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoDescription" className="font-medium">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  {...register("seoDescription")}
                  placeholder="SEO meta description"
                  rows={3}
                  className="focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoKeywords" className="font-medium">SEO Keywords</Label>
                <Input 
                  id="seoKeywords" 
                  {...register("seoKeywords")} 
                  placeholder="keyword1, keyword2, keyword3" 
                  className="focus-visible:ring-primary"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Images & Attributes */}
        <div className="space-y-6">
          {/* Product Images */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                <ImageIcon className="mr-2 h-5 w-5 text-primary" />
                Product Images
              </CardTitle>
              <CardDescription className="text-gray-600">Upload product images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Image */}
              <div className="space-y-2">
                <Label className="font-medium">Main Image *</Label>
                <SingleImageUpload
                  value={mainImage} 
                  onChange={setMainImage} 
                  placeholder="Upload main product image"
                />
                {!mainImage && (
                  <p className="text-sm text-red-500 mt-1">Main image is required</p>
                )}
              </div>

              <Separator className="my-4" />

              {/* Gallery Images */}
              <div className="space-y-2">
                <Label className="font-medium">Gallery Images (Max 4)</Label>
                <MultiImageUpload 
                  value={galleryImages} 
                  onChange={setGalleryImages} 
                  maxImages={4} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Attributes */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Product Attributes</CardTitle>
              <CardDescription className="text-gray-600">Additional product properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-medium">Available Colors</Label>
                <MultiSelect
                  options={colors}
                  selected={selectedColors}
                  onChange={setSelectedColors}
                  placeholder="Select colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warranty" className="font-medium">Warranty</Label>
                <Input 
                  id="warranty" 
                  {...register("warranty")} 
                  placeholder="e.g., 2 years manufacturer warranty" 
                  className="focus-visible:ring-primary"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}