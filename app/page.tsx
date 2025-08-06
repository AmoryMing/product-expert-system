import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, GitCompare, MessageSquare, Map, Zap, Target, TrendingUp, Users } from 'lucide-react'

export default function HomePage() {
  const agents = [
    {
      id: "research",
      title: "产品功能调研",
      description: "深度分析产品网站，提取功能列表和实现流程",
      icon: Search,
      color: "bg-blue-500",
      features: ["功能列表提取", "流程图生成", "技术栈分析", "独特用户价值（UVP）"],
      href: "/agents/research",
    },
    {
      id: "compare",
      title: "产品功能对比",
      description: "对比两个产品的功能差异，生成详细报告",
      icon: GitCompare,
      color: "bg-green-500",
      features: ["功能差异分析", "竞争优势识别", "市场定位对比", "产品提升建议"],
      href: "/agents/compare",
    },
    {
      id: "social",
      title: "产品舆情调研",
      description: "收集油管、微信、小红书等平台的产品信息",
      icon: MessageSquare,
      color: "bg-purple-500",
      features: ["多平台搜索", "内容摘要", "用户反馈分析", "趋势洞察"],
      href: "/agents/sentiment",
    },
  ]

  const stats = [
    { label: "调研产品", value: "156", icon: Target },
    { label: "生成报告", value: "89", icon: TrendingUp },
    { label: "活跃用户", value: "23", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ProductAI</h1>
                <p className="text-sm text-gray-500">产品专家智能体系统</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/community-map">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Map className="w-4 h-4" />
                  <span>大家的产品地图</span>
                </Button>
              </Link>
              <Link href="/product-map">
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Map className="w-4 h-4" />
                  <span>我的产品地图</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">智能化产品调研平台</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            通过AI智能体帮助产品经理快速调研竞品功能、对比分析差异、收集社交媒体反馈，
            构建完整的产品知识图谱，让产品决策更加数据驱动。
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agents */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">AI 智能体工作台</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 ${agent.color} rounded-lg flex items-center justify-center`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {agent.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={agent.href}>
                    <Button className="w-full">开始使用</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">产品调研工作流程</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. 功能调研</h4>
              <p className="text-sm text-gray-600">分析目标产品的完整功能架构</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitCompare className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. 竞品对比</h4>
              <p className="text-sm text-gray-600">对比分析竞品功能差异</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. 产品舆情调研</h4>
              <p className="text-sm text-gray-600">洞察产品热搜与产品趋势</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">4. 产品地图</h4>
              <p className="text-sm text-gray-600">构建产品知识图谱</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
