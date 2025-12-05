export interface ComparisonPoint {
  feature: string;
  gpt: string;
  gemini: string;
  winner: 'Gemini' | 'GPT' | 'Tie';
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: ComparisonPoint[];
  visualMetric: { label: string; gpt: number; gemini: number }[];
}

export enum Tab {
  REPORT = 'report',
  LAB = 'lab'
}