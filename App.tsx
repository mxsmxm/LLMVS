import React, { useRef } from 'react';
import { ShoppingBag, Camera, MessageCircle, BarChart3, ChevronRight, PawPrint } from 'lucide-react';
import ComparisonSection from './components/ComparisonSection';
import { Scenario } from './types';

// Research Data
const scenarios: Scenario[] = [
  {
    id: 'copy',
    title: '创意文案',
    description: '生成SEO友好的产品描述、社交媒体配文以及富有情感的品牌故事。',
    icon: <ShoppingBag className="w-6 h-6 text-black" />,
    details: [
      { feature: '语调适应性', gpt: '一致性高，但在极度俏皮或特定人设时略显生硬。', gemini: '卓越。能原生理解多种人设（如“焦虑的狗妈妈”），情感更充沛。', winner: 'Gemini' },
      { feature: 'SEO 结构规范', gpt: '极佳。擅长遵循严格的关键词密度和格式规则。', gemini: '良好，但有时为了追求创意会牺牲部分结构僵化性。', winner: 'GPT' },
      { feature: 'Emoji 与 梗', gpt: '经常感觉被迫营业或用法过时。', gemini: '自然、流行，且非常符合当下的语境。', winner: 'Gemini' }
    ],
    visualMetric: [
      { label: '创意评分', gpt: 8.5, gemini: 9.6 },
      { label: 'SEO 合规度', gpt: 9.8, gemini: 8.9 }
    ]
  },
  {
    id: 'visuals',
    title: '视觉素材',
    description: '制作产品样机图、宠物生活场景照以及包装设计预览。',
    icon: <Camera className="w-6 h-6 text-white" />,
    details: [
      { feature: '毛发纹理渲染', gpt: '良好，但有时纹理混合得不够自然。', gemini: '市场领导者。毛发的每一缕光泽都达到了照片级逼真。', winner: 'Gemini' },
      { feature: '包装上的文字', gpt: '有进步，但在复杂排版中仍容易出现拼写错误。', gemini: '近乎完美。可清晰渲染包装袋上的微小营养成分表。', winner: 'Gemini' },
      { feature: '指令严格遵循', gpt: '非常严格地遵循空间位置指令。', gemini: '富有创意的解读，有时为了美感会微调构图。', winner: 'Tie' }
    ],
    visualMetric: [
      { label: '照片真实感', gpt: 8.2, gemini: 9.7 },
      { label: '文字渲染能力', gpt: 7.5, gemini: 9.4 }
    ]
  },
  {
    id: 'support',
    title: '多模态客服',
    description: '处理包含图片的复杂客户咨询（例如：“这个玩具对我家狗来说是不是太小了？”）。',
    icon: <MessageCircle className="w-6 h-6 text-black" />,
    details: [
      { feature: '图片分析速度', gpt: '快，但通常需要单独的上传步骤（非原生流式）。', gemini: '原生多模态流式传输，支持实时视频分析。', winner: 'Gemini' },
      { feature: '安全/免责声明', gpt: '非常谨慎，常拒绝评论潜在的健康或安全问题。', gemini: '平衡。在提供有益建议的同时保持合理的安全护栏。', winner: 'Gemini' }
    ],
    visualMetric: [
      { label: '响应速度评分', gpt: 6.5, gemini: 9.2 },
      { label: '上下文准确度', gpt: 8.8, gemini: 9.5 }
    ]
  },
  {
    id: 'data',
    title: '库存与数据',
    description: '分析销售趋势、季节性需求以及来自数千条评论的情感倾向。',
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    details: [
      { feature: '上下文窗口', gpt: '128k token。适合处理月度报告。', gemini: '1M-2M token。可直接吞吐全年的原始交易日志，无需预处理。', winner: 'Gemini' },
      { feature: '推理深度', gpt: '在复杂数学逻辑和SQL代码生成方面更胜一筹。', gemini: '强大，但在海量数据集的特定数字检索上偶尔会有幻觉。', winner: 'GPT' }
    ],
    visualMetric: [
      { label: '数据吞吐量', gpt: 7.0, gemini: 9.9 },
      { label: '数学精度', gpt: 9.8, gemini: 9.1 }
    ]
  }
];

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 apple-blur border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <PawPrint className="w-5 h-5" />
            <span>PetAI 研究院</span>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            内部报告：2025 Q4
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div className="z-10 max-w-4xl mx-auto fade-in-up">
          <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-[#1d1d1f] mb-6">
            宠物电商的 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              巅峰对决。
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            深度对比 <strong>ChatGPT 5.1</strong> 与 <strong>Gemini 3</strong>，<br/>聚焦您最关心的核心业务场景。
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
             <button 
               onClick={scrollToContent}
               className="bg-[#0071e3] text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-[#0077ed] transition-colors flex items-center gap-2"
             >
               查看分析报告 <ChevronRight size={18} />
             </button>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute -bottom-1/2 w-[1000px] h-[1000px] bg-gradient-to-t from-blue-100 to-transparent rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
      </header>

      {/* Main Content */}
      <div ref={contentRef}>
        
        {/* Executive Summary */}
        <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 block">执行摘要</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-8 leading-tight">
                Gemini 3 在创意与视觉领域遥遥领先，<br/>而 GPT 5.1 在纯逻辑分析层面保持稳健。
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16">
                <div className="p-8 bg-white rounded-3xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">创意文案</h3>
                    <p className="text-gray-500">Gemini 能够驾驭多种人设，情感连接能力更强，非常适合宠物主人的情感需求。</p>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">视觉表现</h3>
                    <p className="text-gray-500">在毛发纹理和真实感渲染上无与伦比。这是宠物产品图片的核心竞争力。</p>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">运营数据</h3>
                    <p className="text-gray-500">Gemini 的超大上下文窗口简化了年度库存和评论分析，无需复杂的数据预处理。</p>
                </div>
            </div>
        </section>

        {/* Detailed Comparisons */}
        {scenarios.map((scenario, index) => (
          <ComparisonSection 
            key={scenario.id} 
            scenario={scenario} 
            inverted={index % 2 !== 0} // Alternate styling
          />
        ))}

      </div>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>版权所有 © 2025 PetAI Research Inc. 保留所有权利。</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>隐私政策</span>
            <span>使用条款</span>
            <span>销售与退款</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;