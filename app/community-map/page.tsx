"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Filter, Heart, MessageCircle, Share2, Star, TrendingUp, Clock, MapPin } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

interface ProductCard {
  id: number
  title: string
  author: string
  avatar: string
  image: string
  likes: number
  comments: number
  shares: number
  rating: number
  category: string
  tags: string[]
  publishTime: string
  location?: string
  isHot: boolean
}

export default function CommunityMap() {
  const [activeFilter, setActiveFilter] = useState<"hot" | "new" | "nearby">("hot")
  const [products, setProducts] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // 模拟产品数据
  const generateMockProducts = (startId: number, count: number): ProductCard[] => {
    const categories = ["生产力工具", "设计工具", "沟通协作", "数据管理", "项目管理", "知识管理"]
    const locations = ["北京", "上海", "深圳", "杭州", "成都", "广州"]
    
    return Array.from({ length: count }, (_, index) => ({
      id: startId + index,
      title: `产品调研报告 #${startId + index}`,
      author: `用户${Math.floor(Math.random() * 1000)}`,
      avatar: `/placeholder.svg?height=40&width=40&query=avatar${index}`,
      image: `/placeholder.svg?height=400&width=300&query=product${startId + index}`,
      likes: Math.floor(Math.random() * 2000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      shares: Math.floor(Math.random() * 200) + 5,
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      category: categories[Math.floor(Math.random() * categories.length)],
      tags: ["功能分析", "竞品对比", "用户调研"].slice(0, Math.floor(Math.random() * 3) + 1),
      publishTime: `${Math.floor(Math.random() * 24)}小时前`,
      location: Math.random() > 0.5 ? locations[Math.floor(Math.random() * locations.length)] : undefined,
      isHot: Math.random() > 0.7,
    }))
  }

  // 初始加载数据
  useEffect(() => {
    setProducts(generateMockProducts(1, 12))
  }, [])

  // 无限滚动加载更多
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    
    setLoading(true)
    setTimeout(() => {
      const newProducts = generateMockProducts(products.length + 1, 6)
      setProducts(prev => [...prev, ...newProducts])
      setLoading(false)
      
      // 模拟数据加载完毕
      if (products.length > 50) {
        setHasMore(false)
      }
    }, 1000)
  }, [loading, hasMore, products.length])

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore])

  // 筛选逻辑
  const filteredProducts = products.filter(product => {
    switch (activeFilter) {
      case "hot":
        return product.likes >= 1000
      case "new":
        return true // 按时间排序，这里简化处理
      case "nearby":
        return product.location !== undefined
      default:
        return true
    }
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeFilter) {
      case "hot":
        return b.likes - a.likes
      case "new":
        return a.id - b.id // 简化的时间排序
      case "nearby":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 高斯模糊背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm z-0"></div>
      
      {/* 半透明遮罩 */}
      <div className="fixed inset-0 bg-white/60 z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">大家的产品地图</h1>
                <p className="text-sm text-gray-500">发现优秀的产品调研内容</p>
              </div>
            </div>
          </div>
        </div>

        {/* 筛选导航 */}
        <div className="border-t border-gray-200/50 bg-white/80">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-6">
              <Button
                variant={activeFilter === "hot" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("hot")}
                className="flex items-center space-x-1"
              >
                <TrendingUp className="w-4 h-4" />
                <span>最热</span>
              </Button>
              <Button
                variant={activeFilter === "new" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("new")}
                className="flex items-center space-x-1"
              >
                <Clock className="w-4 h-4" />
                <span>最新</span>
              </Button>
              <Button
                variant={activeFilter === "nearby" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("nearby")}
                className="flex items-center space-x-1"
              >
                <MapPin className="w-4 h-4" />
                <span>附近</span>
              </Button>
              <div className="flex-1"></div>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 瀑布流内容 */}
      <main className="relative z-10 container mx-auto px-4 py-6">
        <div className="columns-2 md:columns-3 gap-2 space-y-3">
          {sortedProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="break-inside-avoid mb-3 hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-gray-200/50"
              style={{ marginBottom: '12px' }}
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover rounded-t-lg"
                  style={{ aspectRatio: '3/4' }}
                />
                {product.isHot && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    🔥 热门
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.title}</h3>
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <span>{product.author}</span>
                  </div>
                  <span>{product.publishTime}</span>
                </div>

                {product.location && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{product.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{product.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{product.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-3 h-3" />
                      <span>{product.shares}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    查看
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 加载更多指示器 */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <span>加载更多内容...</span>
            </div>
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-8 text-gray-500">
            <p>已经到底了～</p>
          </div>
        )}
      </main>
    </div>
  )
}
