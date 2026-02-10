export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p className="font-medium text-gray-600">
            醫療免責聲明
          </p>
          <p>
            本網站僅供參考，不構成醫療建議。CDED 飲食計畫應在醫師或營養師的指導下進行。
            <br />
            如有任何健康疑慮，請諮詢您的醫療團隊。
          </p>
          <p className="pt-4 text-gray-400">
            &copy; {new Date().getFullYear()} CDED 食譜網站
          </p>
        </div>
      </div>
    </footer>
  );
}
