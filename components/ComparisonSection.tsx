import React from 'react';
import { Scenario } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  scenario: Scenario;
  inverted?: boolean;
}

const ComparisonSection: React.FC<Props> = ({ scenario, inverted = false }) => {
  return (
    <div className={`py-24 px-6 md:px-12 lg:px-24 ${inverted ? 'bg-black text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${inverted ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                {scenario.icon}
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{scenario.title}</h2>
            </div>
            <p className={`text-xl md:text-2xl font-medium leading-relaxed ${inverted ? 'text-gray-400' : 'text-gray-500'}`}>
              {scenario.description}
            </p>

            <div className="mt-12 space-y-6">
              {scenario.details.map((point, idx) => (
                <div key={idx} className={`border-t ${inverted ? 'border-gray-800' : 'border-gray-300'} pt-6`}>
                  <h4 className="text-lg font-semibold mb-2">{point.feature}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className={`text-xs uppercase font-bold tracking-wider ${inverted ? 'text-blue-400' : 'text-blue-600'}`}>Gemini 3</span>
                      <p className={`text-sm ${inverted ? 'text-gray-300' : 'text-gray-700'}`}>{point.gemini}</p>
                    </div>
                    <div className="space-y-1">
                      <span className={`text-xs uppercase font-bold tracking-wider ${inverted ? 'text-purple-400' : 'text-purple-600'}`}>GPT 5.1</span>
                      <p className={`text-sm ${inverted ? 'text-gray-300' : 'text-gray-700'}`}>{point.gpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual/Data Content */}
          <div className="flex-1 w-full mt-12 md:mt-0">
             <div className={`rounded-3xl p-8 h-[500px] flex flex-col justify-center ${inverted ? 'bg-gray-900' : 'bg-white shadow-xl'}`}>
                <h3 className={`text-center mb-8 font-semibold ${inverted ? 'text-gray-200' : 'text-gray-900'}`}>
                  核心性能指标对比 (1-10分)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    layout="vertical" 
                    data={scenario.visualMetric} 
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    barGap={6}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke={inverted ? '#333' : '#eee'} opacity={0.5} />
                    <XAxis type="number" domain={[0, 10]} hide />
                    <YAxis 
                      dataKey="label" 
                      type="category" 
                      tick={{ fill: inverted ? '#9ca3af' : '#4b5563', fontSize: 12, fontWeight: 500 }}
                      width={100}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      cursor={{fill: inverted ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}}
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        backgroundColor: inverted ? '#1f2937' : '#fff',
                        color: inverted ? '#fff' : '#000'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                    <Bar dataKey="gemini" name="Gemini 3" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16} />
                    <Bar dataKey="gpt" name="GPT 5.1" fill="#a855f7" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
                
             </div>
             
             {/* Recommendation Badge */}
             <div className={`mt-8 p-6 rounded-2xl border ${inverted ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-md`}>
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">本场景推荐模型</span>
                    <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                        scenario.details.filter(d => d.winner === 'Gemini').length > scenario.details.filter(d => d.winner === 'GPT').length 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                        {scenario.details.filter(d => d.winner === 'Gemini').length > scenario.details.filter(d => d.winner === 'GPT').length ? 'Gemini 3' : 'GPT 5.1'}
                    </span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;