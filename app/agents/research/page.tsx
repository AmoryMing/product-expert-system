"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Globe, List, GitBranch, Download, ArrowLeft, Loader2 } from 'lucide-react'
import Link from "next/link"

export default function ResearchAgent() {
  const [url, setUrl] = useState("")
  const [userPrompt, setUserPrompt] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleAnalyze = async () => {
    if (!url) return

    setIsAnalyzing(true)
    setProgress(0)

    // 模拟分析过程
    const steps = [
      { name: "访问网站", duration: 1000 },
      { name: "解析页面结构", duration: 1500 },
      { name: "提取功能信息", duration: 2000 },
      { name: "生成流程图", duration: 1500 },
      { name: "整理报告", duration: 1000 },
    ]

    let currentProgress = 0
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration))
      currentProgress += 20
      setProgress(currentProgress)
    }

    setIsAnalyzing(false)
    setAnalysisComplete(true)
  }

  const downloadMarkdownReport = () => {
    const markdownContent = `# 产品功能分析报告

## 分析概览
- 网站URL: ${url}
- 分析时间: ${new Date().toLocaleString()}
- 用户提示: ${userPrompt || '无特殊要求'}

## 功能统计
- 总功能数: 15
- 已实现: 12
- 部分实现: 2
- 未实现: 1

## 详细功能列表

### 用户管理
| 功能 | 功能描述 | 解决痛点 | 目标用户 |
|------|----------|----------|----------|
| 用户注册 | 支持邮箱、手机号多种方式注册 | 新用户快速入门 | 所有新用户 |
| 用户登录 | 安全的身份验证和会话管理 | 账户安全保护 | 注册用户 |
| 个人资料 | 用户信息管理和个性化设置 | 个性化体验需求 | 活跃用户 |
| 权限管理 | 基于角色的访问控制系统 | 数据安全和权限控制 | 管理员用户 |

### 内容管理
| 功能 | 功能描述 | 解决痛点 | 目标用户 |
|------|----------|----------|----------|
| 文章发布 | 支持富文本内容创建和发布 | 内容创作效率 | 内容创作者 |
| 富文本编辑 | 所见即所得的编辑体验 | 格式化内容需求 | 内容创作者 |
| 媒体上传 | 图片、视频等多媒体文件管理 | 多媒体内容展示 | 内容创作者 |
| 内容审核 | 自动化和人工审核机制 | 内容质量控制 | 平台管理员 |

### 社交功能
| 功能 | 功能描述 | 解决痛点 | 目标用户 |
|------|----------|----------|----------|
| 评论系统 | 用户互动和反馈机制 | 用户参与度提升 | 所有用户 |
| 点赞收藏 | 内容互动和个人收藏 | 内容价值认可 | 活跃用户 |
| 关注系统 | 用户间的社交连接 | 社交网络构建 | 社交用户 |
| 私信功能 | 用户间私密沟通渠道 | 私密交流需求 | 高级用户 |

## 用户流程分析

### 新用户注册流程
1. 访问注册页面
2. 选择注册方式（邮箱/手机）
3. 填写基本信息
4. 验证身份
5. 完成注册并引导

### 内容发布流程
1. 登录系统
2. 进入创作页面
3. 编辑内容
4. 预览确认
5. 发布内容

## 技术实现分析

### 后端技术架构
- **用户认证**: JWT + OAuth2.0
- **数据存储**: PostgreSQL + Redis缓存
- **文件存储**: 云存储服务
- **API设计**: RESTful API + GraphQL
- **安全机制**: HTTPS + 数据加密

### 前端技术栈
- **框架**: React + TypeScript
- **状态管理**: Redux/Zustand
- **UI组件**: 自定义组件库
- **构建工具**: Vite/Webpack
- **部署**: CDN + 静态托管

## 改进建议

1. **功能完善**: 优先完善私信功能和内容审核机制
2. **用户体验**: 提升新手引导和操作流程
3. **性能优化**: 加强缓存策略和加载速度
4. **安全加固**: 完善权限控制和数据保护

## 总结

该产品具有完整的用户管理和内容管理功能，社交功能相对完善但仍有提升空间。建议优先完善私信功能和内容审核机制，以提升用户体验和平台安全性。

---
*报告生成时间: ${new Date().toLocaleString()}*
`

    const blob = new Blob([markdownContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `产品功能分析报告_${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const mockFeatures = [
    {
      category: "用户管理",
      features: [
        { 
          name: "用户注册", 
          description: "支持邮箱、手机号多种方式注册",
          painPoint: "新用户快速入门",
          targetUser: "所有新用户"
        },
        { 
          name: "用户登录", 
          description: "安全的身份验证和会话管理",
          painPoint: "账户安全保护",
          targetUser: "注册用户"
        },
        { 
          name: "个人资料", 
          description: "用户信息管理和个性化设置",
          painPoint: "个性化体验需求",
          targetUser: "活跃用户"
        },
        { 
          name: "权限管理", 
          description: "基于角色的访问控制系统",
          painPoint: "数据安全和权限控制",
          targetUser: "管理员用户"
        },
      ],
    },
    {
      category: "内容管理",
      features: [
        { 
          name: "文章发布", 
          description: "支持富文本内容创建和发布",
          painPoint: "内容创作效率",
          targetUser: "内容创作者"
        },
        { 
          name: "富文本编辑", 
          description: "所见即所得的编辑体验",
          painPoint: "格式化内容需求",
          targetUser: "内容创作者"
        },
        { 
          name: "媒体上传", 
          description: "图片、视频等多媒体文件管理",
          painPoint: "多媒体内容展示",
          targetUser: "内容创作者"
        },
        { 
          name: "内容审核", 
          description: "自动化和人工审核机制",
          painPoint: "内容质量控制",
          targetUser: "平台管理员"
        },
      ],
    },
    {
      category: "社交功能",
      features: [
        { 
          name: "评论系统", 
          description: "用户互动和反馈机制",
          painPoint: "用户参与度提升",
          targetUser: "所有用户"
        },
        { 
          name: "点赞收藏", 
          description: "内容互动和个人收藏",
          painPoint: "内容价值认可",
          targetUser: "活跃用户"
        },
        { 
          name: "关注系统", 
          description: "用户间的社交连接",
          painPoint: "社交网络构建",
          targetUser: "社交用户"
        },
        { 
          name: "私信功能", 
          description: "用户间私密沟通渠道",
          painPoint: "私密交流需求",
          targetUser: "高级用户"
        },
      ],
    },
  ]

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
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">产品功能调研</h1>
                <p className="text-sm text-gray-500">深度分析产品网站功能架构</p>
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
                  <Globe className="w-5 h-5" />
                  <span>产品网站分析</span>
                </CardTitle>
                <CardDescription>输入产品网站URL，AI将自动分析其功能架构</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">网站URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isAnalyzing}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">分析重点 (可选)</label>
                  <Textarea 
                    placeholder="请描述您希望重点关注的功能模块..." 
                    rows={3} 
                    disabled={isAnalyzing}
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  disabled={!url || isAnalyzing} 
                  className={`w-full ${analysisComplete && !isAnalyzing ? 'bg-gray-500 hover:bg-gray-600' : ''}`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      分析中...
                    </>
                  ) : analysisComplete ? (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      重新分析
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      开始分析
                    </>
                  )}
                </Button>

                {analysisComplete && (
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    导出列表
                  </Button>
                )}

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>分析进度</span>
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
            {!analysisComplete ? (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>输入网站URL开始分析</p>
                </div>
              </Card>
            ) : (
              <Tabs defaultValue="features" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="features" className="flex items-center space-x-2">
                    <List className="w-4 h-4" />
                    <span>功能列表</span>
                  </TabsTrigger>
                  <TabsTrigger value="flowchart" className="flex items-center space-x-2">
                    <GitBranch className="w-4 h-4" />
                    <span>流程图</span>
                  </TabsTrigger>
                  <TabsTrigger value="report" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>分析报告</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="space-y-6">
                  <div className="space-y-6">
                    {mockFeatures.map((category, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b bg-gray-50">
                                  <th className="text-left p-3 font-medium">功能</th>
                                  <th className="text-left p-3 font-medium">功能描述</th>
                                  <th className="text-left p-3 font-medium">解决痛点</th>
                                  <th className="text-left p-3 font-medium">目标用户</th>
                                </tr>
                              </thead>
                              <tbody>
                                {category.features.map((feature, featureIndex) => (
                                  <tr key={featureIndex} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{feature.name}</td>
                                    <td className="p-3 text-sm text-gray-600">{feature.description}</td>
                                    <td className="p-3 text-sm text-gray-600">{feature.painPoint}</td>
                                    <td className="p-3 text-sm text-gray-600">{feature.targetUser}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="flowchart">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-center">基于分析结果生成的功能实现流程</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* 用户流程图 */}
                      <div>
                        <h4 className="text-base font-semibold mb-4 text-gray-800">用户流程图</h4>
                        <div className="h-64 bg-blue-50 rounded-lg flex items-center justify-center border-2 border-blue-200">
                          <div className="text-center text-blue-600">
                            <GitBranch className="w-12 h-12 mx-auto mb-4" />
                            <p className="font-medium">用户操作流程图</p>
                            <p className="text-sm mt-2">展示用户完成功能的具体步骤</p>
                          </div>
                        </div>
                      </div>

                      {/* 技术路线图 */}
                      <div>
                        <h4 className="text-base font-semibold mb-4 text-gray-800">技术路线图</h4>
                        <div className="h-64 bg-green-50 rounded-lg flex items-center justify-center border-2 border-green-200">
                          <div className="text-center text-green-600">
                            <GitBranch className="w-12 h-12 mx-auto mb-4" />
                            <p className="font-medium">后端技术实现流程</p>
                            <p className="text-sm mt-2">展示功能背后的技术实现路径</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="report">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-center">完整的产品功能分析报告</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">15</div>
                          <div className="text-sm text-gray-600">总功能数</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">12</div>
                          <div className="text-sm text-gray-600">已实现</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">2</div>
                          <div className="text-sm text-gray-600">部分实现</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">1</div>
                          <div className="text-sm text-gray-600">未实现</div>
                        </div>
                      </div>

                      <div className="prose max-w-none">
                        <h4>分析总结</h4>
                        <p>
                          该产品具有完整的用户管理和内容管理功能，社交功能相对完善但仍有提升空间。
                          建议优先完善私信功能和内容审核机制，以提升用户体验和平台安全性。
                        </p>

                        <h4>技术架构</h4>
                        <ul>
                          <li>前端：React + TypeScript</li>
                          <li>后端：Node.js + Express</li>
                          <li>数据库：PostgreSQL</li>
                          <li>部署：Vercel + Supabase</li>
                        </ul>
                      </div>

                      <Button className="w-full" onClick={downloadMarkdownReport}>
                        <Download className="w-4 h-4 mr-2" />
                        下载 Markdown 报告
                      </Button>
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
