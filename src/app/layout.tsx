import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'CDED 食譜 — 克隆氏症排除飲食指南',
  description:
    '提供克隆氏症排除飲食 (CDED) 各階段的食譜與飲食建議，幫助患者建立健康飲食習慣。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="font-sans text-gray-800 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
