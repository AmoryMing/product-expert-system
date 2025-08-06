"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { GitCompare, ArrowLeft, Loader2, CheckCircle, XCircle, AlertCircle, TrendingUp, Download } from "lucide-react"
import Link from "next/link"

export default function CompareAgent() {
  const [productA, setProductA] = useState("")
  const [productB, setProductB] = useState("")
  const [isComparing, setIsComparing] = useState(false)
  const [compareComplete, setCompareComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleCompare = async () => {
    if (!productA || !productB) return

    setIsComparing(true)
    setProgress(0)

    // 模拟对比过程
    const steps = [
      { name: "分析产品A", duration: 1500 },
      { name: "分析产品B", duration: 1500 },
      { name: "功能对比", duration: 2000 },
      { name: "生成差异报告", duration: 1500 },
      { name: "整理建议", duration: 500 },
    ]

    let currentProgress = 0
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration))
      currentProgress += 20
      setProgress(currentProgress)
    }

    setIsComparing(false)
    setCompareComplete(true)
  }

  const comparisonData = {
    overview: {
      productA: { name: "产品A", score: 85, features: 24 },
      productB: { name: "产品B", score: 78, features: 19 },
    },
    categories: [
      {
        name: "用户管理",
        productA: { status: "完整", features: ["注册登录", "个人资料", "权限管理", "多账号切换"] },
        productB: { status: "基础", features: ["注册登录", "个人资料"] },
        advantage: "A",
      },
      {
        name: "内容管理",
        productA: { status: "完整", features: ["富文本编辑", "媒体上传", "版本控制"] },
        productB: { status: "完整", features: ["富文本编辑", "媒体上传", "批量操作", "定时发布"] },
        advantage: "B",
      },
      {
        name: "数据分析",
        productA: { status: "基础", features: ["基础统计", "导出功能"] },
        productB: { status: "高级", features: ["实时分析", "自定义报表", "数据可视化", "预测分析"] },
        advantage: "B",
      },
      {
        name: "API集成",
        productA: { status: "完整", features: ["RESTful API", "Webhook", "第三方集成"] },
        productB: { status: "基础", features: ["RESTful API"] },
        advantage: "A",
      },
    ],
  }

  const getAdvantageIcon = (advantage: string) => {
    if (advantage === "A") return <TrendingUp className="w-4 h-4 text-green-500" />
    if (advantage === "B") return <TrendingUp className="w-4 h-4 text-blue-500" />
    return <AlertCircle className="w-4 h-4 text-gray-500" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "完整":
        return "bg-green-100 text-green-800"
      case "高级":
        return "bg-blue-100 text-blue-800"
      case "基础":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">产品功能对比</h1>
                <p className="text-sm text-gray-500">对比两个产品的功能差异</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 输入区域 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitCompare className="w-5 h-5" />
                  <span>产品对比</span>
                </CardTitle>
                <CardDescription>输入两个产品的URL进行功能对比分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">产品A URL</label>
                  <Input
                    placeholder="https://product-a.com"
                    value={productA}
                    onChange={(e) => setProductA(e.target.value)}
                    disabled={isComparing}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">产品B URL</label>
                  <Input
                    placeholder="https://product-b.com"
                    value={productB}
                    onChange={(e) => setProductB(e.target.value)}
                    disabled={isComparing}
                  />
                </div>

                <Button onClick={handleCompare} disabled={!productA || !productB || isComparing} className="w-full">
                  {isComparing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      对比中...
                    </>
                  ) : (
                    <>
                      <GitCompare className="w-4 h-4 mr-2" />
                      开始对比
                    </>
                  )}
                </Button>

                {isComparing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>对比进度</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 结果区域 */}
          <div className="lg:col-span-2">
            {!compareComplete ? (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>输入两个产品URL开始对比</p>
                </div>
              </Card>
            ) : (
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">对比概览</TabsTrigger>
                  <TabsTrigger value="details">详细对比</TabsTrigger>
                  <TabsTrigger value="recommendations">改进建议</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">对比概览</h3>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      导出报告
                    </Button>
                  </div>

                  {/* 总体对比 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="text-center">
                        <CardTitle className="text-green-600">产品A</CardTitle>
                        <div className="text-3xl font-bold">{comparisonData.overview.productA.score}</div>
                        <CardDescription>综合评分</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-lg font-semibold mb-2">
                          {comparisonData.overview.productA.features} 个功能
                        </div>
                        <Badge className="bg-green-100 text-green-800">功能丰富</Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="text-center">
                        <CardTitle className="text-blue-600">产品B</CardTitle>
                        <div className="text-3xl font-bold">{comparisonData.overview.productB.score}</div>
                        <CardDescription>综合评分</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-lg font-semibold mb-2">
                          {comparisonData.overview.productB.features} 个功能
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">专业化强</Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 功能分类对比 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>功能分类对比</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {comparisonData.categories.map((category, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{category.name}</h4>
                              {getAdvantageIcon(category.advantage)}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-sm font-medium text-green-600">产品A</span>
                                  <Badge className={getStatusColor(category.productA.status)}>
                                    {category.productA.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">{category.productA.features.join("、")}</div>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-sm font-medium text-blue-600">产品B</span>
                                  <Badge className={getStatusColor(category.productB.status)}>
                                    {category.productB.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">{category.productB.features.join("、")}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>详细功能对比</CardTitle>
                      <CardDescription>逐项对比两个产品的具体功能实现</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {comparisonData.categories.map((category, index) => (
                          <div key={index}>
                            <h4 className="font-semibold mb-4 text-lg">{category.name}</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left p-3">功能</th>
                                    <th className="text-center p-3 text-green-600">产品A</th>
                                    <th className="text-center p-3 text-blue-600">产品B</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* 合并两个产品的功能列表 */}
                                  {Array.from(
                                    new Set([...category.productA.features, ...category.productB.features]),
                                  ).map((feature, featureIndex) => (
                                    <tr key={featureIndex} className="border-b">
                                      <td className="p-3">{feature}</td>
                                      <td className="text-center p-3">
                                        {category.productA.features.includes(feature) ? (
                                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                                        ) : (
                                          <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                                        )}
                                      </td>
                                      <td className="text-center p-3">
                                        {category.productB.features.includes(feature) ? (
                                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                                        ) : (
                                          <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations">
                  <Card>
                    <CardHeader>
                      <CardTitle>改进建议</CardTitle>
                      <CardDescription>基于对比分析的产品改进建议</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3">产品A 改进建议</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <div>
                              <div className="font-medium">加强数据分析能力</div>
                              <div className="text-sm text-gray-600">
                                建议增加实时数据分析、自定义报表和数据可视化功能，提升产品的数据洞察能力
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <div>
                              <div className="font-medium">优化内容管理流程</div>
                              <div className="text-sm text-gray-600">
                                可以学习产品B的批量操作和定时发布功能，提升内容管理效率
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-600 mb-3">产品B 改进建议</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <div>
                              <div className="font-medium">完善用户管理系统</div>
                              <div className="text-sm text-gray-600">
                                建议增加权限管理和多账号切换功能，提升企业级用户的使用体验
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <div>
                              <div className="font-medium">扩展API集成能力</div>
                              <div className="text-sm text-gray-600">
                                建议增加Webhook和第三方集成功能，提升产品的扩展性和集成能力
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">市场定位建议</h4>
                        <p className="text-sm text-blue-700">
                          产品A更适合功能全面的通用型解决方案，产品B更适合专业化的垂直领域应用。
                          建议根据目标用户群体的具体需求来选择发展方向。
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
