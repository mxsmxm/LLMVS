import React, { useState } from 'react';
import { generateMarketingCopy, generatePetImage } from '../services/geminiService';
import { Loader2, Sparkles, Image as ImageIcon, Type } from 'lucide-react';

const LiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'copy' | 'image'>('copy');
  const [productName, setProductName] = useState('');
  const [tone, setTone] = useState<'playful' | 'scientific' | 'luxury'>('playful');
  const [imagePrompt, setImagePrompt] = useState('');
  
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCopyGen = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const result = await generateMarketingCopy(productName, tone);
      setOutput(result);
    } catch (e) {
      setOutput("生成内容出错，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const handleImageGen = async () => {
    if (!imagePrompt) return;
    setLoading(true);
    try {
      const result = await generatePetImage(imagePrompt);
      setOutput(result);
    } catch (e) {
      setOutput("生成图片出错，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const toneMap = {
    playful: '俏皮可爱',
    scientific: '科学严谨',
    luxury: '高端奢华'
  };

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">Gemini 3 实验室</h2>
        <p className="text-xl text-gray-500">亲身体验多模态的卓越差异。</p>
      </div>

      <div className="max-w-4xl mx-auto bg-[#f5f5f7] rounded-[32px] overflow-hidden shadow-2xl border border-white/50">
        {/* Toggle */}
        <div className="flex p-2 bg-gray-200/50 backdrop-blur m-4 rounded-full w-fit mx-auto">
          <button
            onClick={() => { setActiveTab('copy'); setOutput(null); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'copy' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-900'}`}
          >
            智能文案
          </button>
          <button
            onClick={() => { setActiveTab('image'); setOutput(null); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'image' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-900'}`}
          >
            视觉生成
          </button>
        </div>

        <div className="p-8 md:p-12 min-h-[500px] flex flex-col items-center justify-center transition-all">
          
          {/* Copywriting UI */}
          {activeTab === 'copy' && (
            <div className="w-full max-w-lg space-y-6 fade-in-up">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">产品名称</label>
                <input 
                  type="text" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="例如：超软舒缓宠物安抚窝"
                  className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">品牌调性</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(toneMap)).map(([key, label]) => (
                    <button 
                      key={key}
                      onClick={() => setTone(key as any)}
                      className={`py-2 px-3 rounded-lg text-sm border transition-all ${tone === key ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleCopyGen}
                disabled={loading || !productName}
                className="w-full py-4 rounded-full bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Type size={18} />}
                生成文案
              </button>
            </div>
          )}

          {/* Image UI */}
          {activeTab === 'image' && (
            <div className="w-full max-w-lg space-y-6 fade-in-up">
               <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">图片提示词</label>
                <textarea 
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="例如：一只在花园里戴着宇航员头盔的毛茸茸波斯猫，照片级真实感，4k画质"
                  rows={3}
                  className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                />
              </div>
              <button 
                onClick={handleImageGen}
                disabled={loading || !imagePrompt}
                className="w-full py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={18} />}
                生成素材
              </button>
            </div>
          )}

          {/* Output Display */}
          {(output || loading) && (
             <div className="w-full mt-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur z-10 flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 font-medium">Gemini 3 正在思考...</span>
                    </div>
                )}
                
                {output && activeTab === 'copy' && (
                    <div className="text-left w-full prose prose-slate">
                         <div className="text-xs text-blue-500 font-bold uppercase mb-2 tracking-wide flex items-center gap-1">
                            <Sparkles size={12} /> 由 Gemini 3 Pro 生成
                         </div>
                         <div className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed font-medium">
                            {output}
                         </div>
                    </div>
                )}

                {output && activeTab === 'image' && (
                    <div className="w-full flex flex-col items-center">
                        <div className="text-xs self-start text-blue-500 font-bold uppercase mb-4 tracking-wide flex items-center gap-1">
                            <Sparkles size={12} /> 由 Gemini 3 Image Preview 生成
                         </div>
                        <img src={output} alt="Generated pet asset" className="rounded-lg shadow-lg max-h-[400px] w-auto object-cover" />
                    </div>
                )}
             </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default LiveDemo;