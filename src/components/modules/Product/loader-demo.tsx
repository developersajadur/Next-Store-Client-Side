"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader } from "./loader"

export function LoaderDemo() {
  const [variant, setVariant] = useState<"spinner" | "dots" | "pulse" | "skeleton">("spinner")
  const [size, setSize] = useState<"sm" | "md" | "lg">("md")
  const [text, setText] = useState("Loading...")
  const [showText, setShowText] = useState(true)
  const [color, setColor] = useState("border-primary")

  const colors = [
    { name: "Primary", value: "border-primary bg-primary" },
    { name: "Secondary", value: "border-secondary bg-secondary" },
    { name: "Destructive", value: "border-destructive bg-destructive" },
    { name: "Green", value: "border-green-500 bg-green-500" },
    { name: "Purple", value: "border-purple-500 bg-purple-500" },
    { name: "Amber", value: "border-amber-500 bg-amber-500" },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Loader Component</CardTitle>
        <CardDescription>Customize the loader to fit your application's needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          <div className="flex items-center justify-center h-40 border rounded-lg">
            <Loader variant={variant} size={size} color={color} text={showText ? text : undefined} />
          </div>

          <div className="grid gap-4">
            <Tabs defaultValue="variant" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="variant">Variant</TabsTrigger>
                <TabsTrigger value="size">Size</TabsTrigger>
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>

              <TabsContent value="variant" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant={variant === "spinner" ? "default" : "outline"} onClick={() => setVariant("spinner")}>
                    Spinner
                  </Button>
                  <Button variant={variant === "dots" ? "default" : "outline"} onClick={() => setVariant("dots")}>
                    Dots
                  </Button>
                  <Button variant={variant === "pulse" ? "default" : "outline"} onClick={() => setVariant("pulse")}>
                    Pulse
                  </Button>
                  <Button
                    variant={variant === "skeleton" ? "default" : "outline"}
                    onClick={() => setVariant("skeleton")}
                  >
                    Skeleton
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="size" className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={size === "sm" ? "default" : "outline"} onClick={() => setSize("sm")}>
                    Small
                  </Button>
                  <Button variant={size === "md" ? "default" : "outline"} onClick={() => setSize("md")}>
                    Medium
                  </Button>
                  <Button variant={size === "lg" ? "default" : "outline"} onClick={() => setSize("lg")}>
                    Large
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="color" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {colors.map((c) => (
                    <Button
                      key={c.value}
                      variant={color === c.value ? "default" : "outline"}
                      onClick={() => setColor(c.value)}
                    >
                      {c.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant={showText ? "default" : "outline"} onClick={() => setShowText(true)} size="sm">
                      Show Text
                    </Button>
                    <Button variant={!showText ? "default" : "outline"} onClick={() => setShowText(false)} size="sm">
                      Hide Text
                    </Button>
                  </div>
                  {showText && (
                    <Select value={text} onValueChange={setText}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select text" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Loading...">Loading...</SelectItem>
                        <SelectItem value="Please wait">Please wait</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Fetching data">Fetching data</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
