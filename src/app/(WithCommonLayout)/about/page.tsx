"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users, Award, Globe, Heart, Shield, Truck, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/shared/Logo"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Products Sold", value: "1M+", icon: ShoppingBag },
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Years Experience", value: "10+", icon: Award },
  ]

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every product is carefully selected and tested to meet our high standards of quality and reliability.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to get your orders to you as fast as possible, anywhere in the world.",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our business, from products to customer service.",
    },
  ]

  const team = [
    {
      name: "Sajadur Rahman",
      role: "CEO & Founder",
      image: "https://res.cloudinary.com/devsajadurrahman/image/upload/v1750027939/imz4oeihuwkwdfnsrtgv.jpg",
      description: "Visionary leader with 15+ years in e-commerce",
    },
    {
      name: "Comming Soon",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      description: "Tech innovator driving our digital transformation",
    },
    {
      name: "Comming Soon",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description: "Operations expert ensuring smooth customer experience",
    },
  ]

  const milestones = [
    { year: "2025", title: "Company Founded", description: "Started as a small online store with big dreams" },
    {
      year: "2016",
      title: "First 1000 Customers",
      description: "Reached our first major milestone in customer growth",
    },
    { year: "2018", title: "International Expansion", description: "Expanded to serve customers across 10 countries" },
    { year: "2020", title: "1M Products Sold", description: "Celebrated selling our millionth product" },
    { year: "2022", title: "Award Recognition", description: "Received 'Best E-commerce Platform' award" },
    { year: "2024", title: "50K+ Happy Customers", description: "Continuing to grow and serve our amazing community" },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About <span className="text-orange-500">Next Store</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                We're more than just an online store. We're your trusted partner in finding quality products that
                enhance your lifestyle. Since 2014, we've been committed to delivering exceptional shopping experiences
                to customers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white" size="lg">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Driving innovation in e-commerce while maintaining our commitment to quality and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-8 lg:p-12">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To provide exceptional shopping experiences by offering high-quality products, outstanding customer
                  service, and innovative solutions that make online shopping simple, secure, and enjoyable for
                  everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 lg:p-12">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the world's most trusted and innovative e-commerce platform, connecting people with products
                  they love while building sustainable relationships with customers, partners, and communities globally.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape the way we interact with our customers and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate people behind Next Store who work tirelessly to bring you the best shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    width={300}
                    height={300}
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted global e-commerce platform.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-orange-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust Next Store for their shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-500 hover:bg-gray-100" size="lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
            <Link  className="border-white text-white hover:text-black" href="/contact">
              <Button
                className="border-white text-white hover:text-black"
                size="lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
