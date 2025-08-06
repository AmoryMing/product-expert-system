"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ArrowLeft, Loader2, Youtube, MessageCircle, Heart, TrendingUp, Calendar, Eye, ThumbsUp, Share2 } from 'lucide-react'
import Link from "next/link"

export default function SocialAgent() {
  const [productName, setProductName] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSearch = async () => {
    if (!productName) return

    setIsSearching(true)
    setProgress(0)

    // 模拟搜索过程
    const steps = [
      { name: "搜索YouTube", duration: 1500 },
      { name: "搜索微信公众号", duration: 1500 },
      { name: "搜索小红书", duration: 1500 },
      { name: "分析内容", duration: 2000 },
      { name: "生成摘要", duration: 1000 },
    ]

    let currentProgress = 0
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration))
      currentProgress += 20
      setProgress(currentProgress)
    }

    setIsSearching(false)
    setSearchComplete(true)
  }

  const socialData = {
    youtube: [
      {
        title: "产品深度评测：功能全面解析",
        channel: "科技评测师",
        views: "12.5万",
        likes: "2.1万",
        publishDate: "2024-01-15",
        duration: "15:32",
        summary: "详细介绍了产品的核心功能，用户反馈整体积极，特别是UI设计和易用性方面获得好评。",
        sentiment: "positive",
        thumbnail: "/youtube-thumbnail.png",
      },
      {
        title: "使用体验分享：一个月真实感受",
        channel: "产品体验官",
        views: "8.3万",
        likes: "1.5万",
        publishDate: "2024-01-10",
        duration: "12:45",
        summary: "用户分享了一个月的使用体验，提到了一些小bug但整体满意度较高。",
        sentiment: "neutral",
        thumbnail: "/product-review-video.png",
      },
    ],
    wechat: [
      {
        title: "这款产品真的值得入手吗？",
        account: "数字生活指南",
        readCount: "5.2万",
        likeCount: "892",
        publishDate: "2024-01-12",
        summary: "从性价比角度分析产品优劣，认为功能丰富但价格偏高，适合专业用户。",
        sentiment: "neutral",
        tags: ["产品评测", "性价比", "专业工具"],
      },
      {
        title: "产品使用技巧大全",
        account: "效率工具箱",
        readCount: "3.8万",
        likeCount: "1.2千",
        publishDate: "2024-01-08",
        summary: "分享了多个实用技巧和隐藏功能，帮助用户更好地使用产品。",
        sentiment: "positive",
        tags: ["使用技巧", "教程", "效率提升"],
      },
    ],
    xiaohongshu: [
      {
        title: "新手必看！产品入门指南",
        author: "小红薯用户",
        likes: "1.5千",
        comments: "234",
        shares: "89",
        publishDate: "2024-01-14",
        summary: "详细的新手教程，图文并茂，获得了很多初学者的好评。",
        sentiment: "positive",
        tags: ["新手教程", "入门指南", "实用"],
      },
      {
        title: "踩坑记录：使用中遇到的问题",
        author: "数码达人",
        likes: "892",
        comments: "156",
        shares: "45",
        publishDate: "2024-01-11",
        summary: "记录了使用过程中遇到的一些问题和解决方案，对其他用户很有帮助。",
        sentiment: "neutral",
        tags: ["问题解决", "经验分享", "踩坑"],
      },
    ],
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      case "neutral":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSentimentText = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "正面"
      case "negative":
        return "负面"
      case "neutral":
        return "中性"
      default:
        return "未知"
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
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">产品舆情调研</h1>
                <p className="text-sm text-gray-500">洞察产品热搜与产品趋势</p>
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
                  <MessageSquare className="w-5 h-5" />
                  <span>产品舆情搜索</span>
                </CardTitle>
                <CardDescription>输入产品名称，搜索相关舆情内容</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">产品名称</label>
                  <Input
                    placeholder="输入产品名称..."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    disabled={isSearching}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium block">搜索平台</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Youtube className="w-3 h-3" />
                      <span>YouTube</span>
                    </Badge>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>微信</span>
                    </Badge>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>小红书</span>
                    </Badge>
                  </div>
                </div>

                <Button onClick={handleSearch} disabled={!productName || isSearching} className="w-full">
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      搜索中...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      开始搜索
                    </>
                  )}
                </Button>

                {isSearching && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>搜索进度</span>
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
            {!searchComplete ? (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>输入产品名称开始搜索</p>
                </div>
              </Card>
            ) : (
              <Tabs defaultValue="youtube" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="youtube" className="flex items-center space-x-2">
                    <Youtube className="w-4 h-4" />
                    <span>YouTube</span>
                  </TabsTrigger>
                  <TabsTrigger value="wechat" className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>微信</span>
                  </TabsTrigger>
                  <TabsTrigger value="xiaohongshu" className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>小红书</span>
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>总结</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="youtube" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">YouTube 内容</h3>
                    <Badge variant="outline">{socialData.youtube.length} 个视频</Badge>
                  </div>

                  {socialData.youtube.map((video, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt="视频缩略图"
                            className="w-32 h-20 object-cover rounded"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-sm">{video.title}</h4>
                              <Badge className={getSentimentColor(video.sentiment)}>
                                {getSentimentText(video.sentiment)}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{video.channel}</span>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{video.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{video.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{video.publishDate}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{video.summary}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="wechat" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">微信公众号文章</h3>
                    <Badge variant="outline">{socialData.wechat.length} 篇文章</Badge>
                  </div>

                  {socialData.wechat.map((article, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold">{article.title}</h4>
                            <Badge className={getSentimentColor(article.sentiment)}>
                              {getSentimentText(article.sentiment)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{article.account}</span>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.readCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{article.likeCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{article.publishDate}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{article.summary}</p>
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="xiaohongshu" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">小红书笔记</h3>
                    <Badge variant="outline">{socialData.xiaohongshu.length} 篇笔记</Badge>
                  </div>

                  {socialData.xiaohongshu.map((note, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold">{note.title}</h4>
                            <Badge className={getSentimentColor(note.sentiment)}>
                              {getSentimentText(note.sentiment)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="text-xs">用</AvatarFallback>
                              </Avatar>
                              <span>{note.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{note.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{note.comments}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Share2 className="w-3 h-3" />
                              <span>{note.shares}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{note.publishDate}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{note.summary}</p>
                          <div className="flex flex-wrap gap-1">
                            {note.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="summary" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">调研总结</h3>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      导出报告
                    </Button>
                  </div>

                  {/* 情感分析 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>整体情感倾向</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">60%</div>
                          <div className="text-sm text-gray-600">正面评价</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">30%</div>
                          <div className="text-sm text-gray-600">中性评价</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">10%</div>
                          <div className="text-sm text-gray-600">负面评价</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 关键洞察 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>关键洞察</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-green-700">用户体验好评</div>
                            <div className="text-sm text-gray-600">
                              多数用户对产品的UI设计和易用性给予正面评价，特别是新手友好度较高
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-yellow-700">功能需求多样</div>
                            <div className="text-sm text-gray-600">
                              用户对高级功能有较多需求，希望产品能够提供更多专业化工具
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-red-700">价格敏感度高</div>
                            <div className="text-sm text-gray-600">
                              部分用户认为产品定价偏高，希望有更多价格档位选择
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 改进建议 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>基于用户反馈的改进建议</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="font-medium text-blue-800 mb-1">产品功能</div>
                          <div className="text-sm text-blue-700">增加更多高级功能和自定义选项，满足专业用户需求</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="font-medium text-green-800 mb-1">用户支持</div>
                          <div className="text-sm text-green-700">
                            加强用户教育和技术支持，提供更多使用教程和最佳实践
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="font-medium text-purple-800 mb-1">定价策略</div>
                          <div className="text-sm text-purple-700">
                            考虑推出不同价格档位的版本，满足不同用户群体的需求
                          </div>
                        </div>
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
