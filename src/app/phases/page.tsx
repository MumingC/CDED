import Link from 'next/link';
import { phases } from '@/data/phases';

const phaseColors = [
  'border-orange-300 bg-orange-50',
  'border-blue-300 bg-blue-50',
  'border-green-300 bg-green-50',
];

export const metadata = {
  title: 'CDED 階段說明 — CDED 食譜',
  description: '了解克隆氏症排除飲食 (CDED) 的三個階段：排除期、漸進期與維持期。',
};

export default function PhasesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">CDED 階段說明</h1>
      <p className="text-gray-500 mb-10">
        克隆氏症排除飲食 (CDED) 分為三個階段，每個階段有不同的飲食限制與目標。
        請在醫療團隊指導下依序進行。
      </p>

      <div className="space-y-6">
        {phases.map((p, i) => (
          <Link key={p.phase} href={`/phases/${p.phase}`}>
            <div
              className={`border-2 rounded-xl p-6 hover:shadow-md transition-shadow mb-6 ${phaseColors[i]}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold">{p.title}</h2>
                <span className="text-sm text-gray-500">{p.duration}</span>
              </div>
              <p className="text-gray-600 mb-4">{p.description}</p>
              <span className="text-primary-600 text-sm font-medium">
                查看詳情與食譜 &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
