"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, Grid3X3, ArrowLeft, Search, Plus, Star, Calendar, Users, TrendingUp, GitBranch, Filter, MoreHorizontal } from 'lucide-react'
import Link from "next/link"

export default function ProductMap() {
  const [viewMode, setViewMode] = useState<"cards" | "network">("cards")
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    {
      id: 1,
      name: "Notion",
      category: "生产力工具",
      status: "已调研",
      rating: 4.5,
      features: 28,
      lastUpdated: "2024-01-15",
      users: "2000万+",
      description: "全能型工作空间，集笔记、数据库、项目管理于一体",
      tags: ["笔记", "协作", "数据库"],
      connections: ["Obsidian", "Airtable"],
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Figma",
      category: "设计工具",
      status: "已调研",
      rating: 4.7,
      features: 35,
      lastUpdated: "2024-01-12",
      users: "400万+",
      description: "协作式界面设计工具，支持实时多人编辑",
      tags: ["设计", "协作", "原型"],
      connections: ["Sketch", "Adobe XD"],
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Slack",
      category: "沟通协作",
      status: "对比中",
      rating: 4.2,
      features: 22,
      lastUpdated: "2024-01-10",
      users: "1200万+",
      description: "企业级即时通讯和协作平台",
      tags: ["沟通", "团队", "集成"],
      connections: ["Discord", "Microsoft Teams"],
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Airtable",
      category: "数据管理",
      status: "已调研",
      rating: 4.4,
      features: 31,
      lastUpdated: "2024-01-08",
      users: "300万+",
      description: "低代码数据库平台，结合电子表格的易用性",
      tags: ["数据库", "低代码", "协作"],
      connections: ["Notion", "Google Sheets"],
      color: "bg-orange-500",
    },
    {
      id: 5,
      name: "Linear",
      category: "项目管理",
      status: "待调研",
      rating: 4.6,
      features: 0,
      lastUpdated: "",
      users: "10万+",
      description: "现代化的项目管理和问题跟踪工具",
      tags: ["项目管理", "敏捷", "开发"],
      connections: ["Jira", "Asana"],
      color: "bg-indigo-500",
    },
    {
      id: 6,
      name: "Obsidian",
      category: "知识管理",
      status: "已调研",
      rating: 4.3,
      features: 25,
      lastUpdated: "2024-01-05",
      users: "100万+",
      description: "基于链接的知识管理工具，支持图谱视图",
      tags: ["笔记", "知识图谱", "本地"],
      connections: ["Notion", "Roam Research"],
      color: "bg-gray-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已调研":
        return "bg-green-100 text-green-800"
      case "对比中":
        return "bg-yellow-100 text-yellow-800"
      case "待调研":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Map className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">产品地图</h1>
                  <p className="text-sm text-gray-500">产品调研知识图谱</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="搜索产品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                添加产品
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 视图切换 */}
        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "cards" | "network")}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="cards" className="flex items-center space-x-2">
              <Grid3X3 className="w-4 h-4" />
              <span>卡片视图</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>网络视图</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{product.name.charAt(0)}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription>{product.category}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                      {product.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{product.features} 功能</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{product.users}</span>
                      </div>
                    </div>

                    {product.lastUpdated && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>更新于 {product.lastUpdated}</span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        查看详情
                      </Button>
                      <Button size="sm" variant="outline">
                        编辑
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>产品关系网络图</CardTitle>
                <CardDescription>展示产品间的竞争关系和功能相似性</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* 模拟网络图 */}
                  <div className="absolute inset-0 p-8">
                    {/* 中心节点 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        Notion
                      </div>
                    </div>

                    {/* 周围节点 */}
                    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                        Obs
                      </div>
                    </div>

                    <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                        Air
                      </div>
                    </div>

                    <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                        Fig
                      </div>
                    </div>

                    <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                        Slack
                      </div>
                    </div>

                    {/* 连接线 */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1="50%"
                        y1="50%"
                        x2="25%"
                        y2="25%"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="75%"
                        y2="25%"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="33%"
                        y2="75%"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="67%"
                        y2="75%"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>

                  {/* 图例 */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm border">
                    <div className="text-xs font-medium mb-2">图例</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>核心产品</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-0.5 bg-gray-300"></div>
                        <span>竞争关系</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
