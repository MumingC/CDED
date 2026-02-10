import Link from 'next/link';
import { phases } from '@/data/phases';
import { getAllRecipes } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';

const phaseColors = [
  'border-orange-300 bg-orange-50',
  'border-blue-300 bg-blue-50',
  'border-green-300 bg-green-50',
];

export default function HomePage() {
  const featured = getAllRecipes().slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CDED 克隆氏症排除飲食食譜
          </h1>
          <p className="text-lg text-primary-100 mb-8 leading-relaxed">
            為克隆氏症患者提供依照治療階段分類的食譜與飲食建議，
            <br className="hidden md:block" />
            幫助您在每個階段都能吃得安心、吃得健康。
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/recipes"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-bold hover:bg-primary-50 transition-colors"
            >
              瀏覽食譜
            </Link>
            <Link
              href="/phases"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-600 transition-colors"
            >
              了解階段
            </Link>
          </div>
        </div>
      </section>

      {/* Phase overview */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">CDED 三階段飲食</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((p, i) => (
            <Link key={p.phase} href={`/phases/${p.phase}`}>
              <div
                className={`border-2 rounded-xl p-6 h-full hover:shadow-md transition-shadow ${phaseColors[i]}`}
              >
                <div className="text-sm font-medium text-gray-500 mb-1">
                  {p.duration}
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured recipes */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">精選食譜</h2>
          <Link
            href="/recipes"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
