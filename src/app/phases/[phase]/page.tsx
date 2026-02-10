import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPhaseInfo } from '@/data/phases';
import { getRecipesByPhase } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';
import { PhaseNumber } from '@/types';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ phase: '1' }, { phase: '2' }, { phase: '3' }];
}

export function generateMetadata({ params }: { params: { phase: string } }): Metadata {
  const info = getPhaseInfo(Number(params.phase));
  if (!info) return { title: '找不到階段' };
  return {
    title: `${info.title} — CDED 食譜`,
    description: info.description,
  };
}

export default function PhaseDetailPage({ params }: { params: { phase: string } }) {
  const phaseNum = Number(params.phase) as PhaseNumber;
  const info = getPhaseInfo(phaseNum);

  if (!info) {
    notFound();
  }

  const recipes = getRecipesByPhase(phaseNum);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/phases" className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block">
        &larr; 返回階段總覽
      </Link>

      <h1 className="text-3xl font-bold mb-2">{info.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{info.duration}</p>
      <p className="text-gray-600 mb-8">{info.description}</p>

      {/* Allowed foods */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-green-800 mb-3">允許食物</h2>
        <ul className="space-y-1">
          {info.allowed.map((item, i) => (
            <li key={i} className="text-green-700 text-sm flex items-start gap-2">
              <span className="mt-0.5">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Avoided foods */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-red-800 mb-3">應避免食物</h2>
        <ul className="space-y-1">
          {info.avoided.map((item, i) => (
            <li key={i} className="text-red-700 text-sm flex items-start gap-2">
              <span className="mt-0.5">&#10007;</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Phase recipes */}
      <h2 className="text-2xl font-bold mb-6">此階段適用食譜</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-400">此階段目前尚無食譜。</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
