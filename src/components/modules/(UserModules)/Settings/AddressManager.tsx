"use client"

import { Edit, Trash2} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AddressManager() {
  return (
    <Card className="lg:col-span-2">

      <CardContent className="space-y-4">
        {/* Address examples here; ideally map through fetched data */}
        <div className="flex items-start justify-between p-4 border rounded-lg bg-muted/20">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium">Home Address</h4>
              <Badge variant="secondary">Default</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>John Doe</p>
              <p>123 Main Street, Apt 4B</p>
              <p>San Francisco, CA 94102</p>
              <p>United States</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" variant="outline" size="sm">
              <Edit className="h-4 w-4  " />
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer" variant="outline" size="sm">
              <Trash2 className="h-4 w-4 cursor-pointer " />
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Set a default address to speed up checkout.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
