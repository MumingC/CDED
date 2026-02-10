import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '關於 — CDED 食譜',
  description: '了解克隆氏症排除飲食 (CDED) 的背景與本網站的使用說明。',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">關於 CDED 食譜網站</h1>

      <section className="prose max-w-none">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-3">什麼是 CDED？</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            克隆氏症排除飲食（Crohn&apos;s Disease Exclusion Diet，簡稱
            CDED）是一種結構化的飲食療法，專為克隆氏症患者設計。此飲食方案由以色列
            Wolfson 醫學中心的 Arie Levine 教授團隊開發，已在多項臨床研究中證實其有效性。
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            CDED 的核心理念是透過排除可能影響腸道菌群、增加腸道通透性或引發腸道發炎反應的食物成分，
            來幫助患者誘導並維持疾病緩解。這些被排除的食物包括加工食品、某些添加物、
            動物脂肪以及特定的乳製品等。
          </p>
          <p className="text-gray-600 leading-relaxed">
            飲食計畫分為三個階段，從最嚴格的排除期開始，逐步放寬飲食限制，
            最終建立一套可長期維持的健康飲食模式。前兩個階段會搭配部分腸內營養配方
            （如 Modulen IBD）以確保營養充足。
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-3">本網站的目的</h2>
          <p className="text-gray-600 leading-relaxed">
            本網站旨在為正在進行或考慮進行 CDED 飲食療法的患者及其家屬提供實用的食譜參考。
            我們依照 CDED 的三個階段分類食譜，並標示每道食譜適用的階段，
            讓您能輕鬆找到當前階段可以食用的料理。
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-3">參考文獻</h2>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>
              Levine A, et al. Crohn&apos;s Disease Exclusion Diet Plus Partial Enteral Nutrition
              Induces Sustained Remission in a Randomized Controlled Trial.
              <em> Gastroenterology</em>. 2019;157(2):440-450.
            </li>
            <li>
              Sigall Boneh R, et al. Dietary Therapy With the Crohn&apos;s Disease Exclusion Diet
              is a Successful Strategy for Induction of Remission in Children and Adults Failing
              Biological Therapy. <em>J Crohns Colitis</em>. 2017;11(10):1205-1212.
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-3 text-amber-800">醫療免責聲明</h2>
          <p className="text-amber-700 leading-relaxed">
            本網站提供的資訊僅供參考與教育用途，不構成任何形式的醫療建議、診斷或治療方案。
            CDED 飲食計畫應在合格的醫師、營養師或其他醫療專業人員的指導下進行。
            在改變飲食方式之前，請務必諮詢您的醫療團隊。
            對於因使用本網站資訊而產生的任何後果，本網站不承擔責任。
          </p>
        </div>
      </section>
    </div>
  );
}
