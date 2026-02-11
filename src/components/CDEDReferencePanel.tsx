'use client';

import { useState } from 'react';
import { PhaseNumber } from '@/types';
import { cdedReference } from '@/data/cded-reference';

interface CDEDReferencePanelProps {
  recipePhases: PhaseNumber[];
}

export default function CDEDReferencePanel({ recipePhases }: CDEDReferencePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePhase, setActivePhase] = useState<PhaseNumber>(recipePhases[0] || 1);

  const phaseData = cdedReference.find((p) => p.phase === activePhase);

  const phaseColors: Record<PhaseNumber, { tab: string; activeTab: string; badge: string }> = {
    1: {
      tab: 'text-orange-600 hover:bg-orange-50',
      activeTab: 'bg-orange-100 text-orange-800 border-orange-400',
      badge: 'bg-orange-500',
    },
    2: {
      tab: 'text-blue-600 hover:bg-blue-50',
      activeTab: 'bg-blue-100 text-blue-800 border-blue-400',
      badge: 'bg-blue-500',
    },
    3: {
      tab: 'text-green-600 hover:bg-green-50',
      activeTab: 'bg-green-100 text-green-800 border-green-400',
      badge: 'bg-green-500',
    },
  };

  return (
    <>
      {/* Toggle Button (fixed on right side) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary-600 text-white px-2 py-4 rounded-l-lg shadow-lg hover:bg-primary-700 transition-all"
        style={{ writingMode: 'vertical-rl' }}
        aria-label="開啟 CDED 飲食規範參考"
      >
        {isOpen ? '關閉 ✕' : 'CDED 規範 ▸'}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">CDED 飲食規範參考</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="關閉面板"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Phase Tabs */}
          <div className="flex gap-1">
            {([1, 2, 3] as PhaseNumber[]).map((phase) => {
              const isRecipePhase = recipePhases.includes(phase);
              const colors = phaseColors[phase];
              return (
                <button
                  key={phase}
                  onClick={() => setActivePhase(phase)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all relative ${
                    activePhase === phase
                      ? colors.activeTab
                      : `border-transparent ${colors.tab}`
                  }`}
                >
                  第{phase}階段
                  {isRecipePhase && (
                    <span
                      className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${colors.badge} border-2 border-white`}
                      title="此食譜適用的階段"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Content */}
        <div className="overflow-y-auto h-[calc(100vh-120px)] p-4 space-y-5">
          {phaseData && (
            <>
              {/* PEN info */}
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm">
                <div className="font-medium text-purple-800 mb-1">腸內營養配方 (PEN)</div>
                <div className="text-purple-600">{phaseData.pen}</div>
              </div>

              {/* Mandatory foods */}
              {phaseData.mandatory.length > 0 && (
                <section>
                  <h3 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    每日必須食用
                  </h3>
                  <ul className="space-y-1.5">
                    {phaseData.mandatory.map((item, i) => (
                      <li key={i} className="text-sm flex gap-2 bg-red-50 rounded-lg px-3 py-2">
                        <span className="font-medium text-red-800 flex-shrink-0">{item.name}</span>
                        {item.note && (
                          <span className="text-red-500 text-xs mt-0.5">{item.note}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Allowed foods */}
              <section>
                <h3 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  允許食用
                </h3>
                <div className="space-y-3">
                  {phaseData.allowed.map((cat, ci) => (
                    <div key={ci}>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        {cat.category}
                      </div>
                      {cat.items.length > 0 && (
                        <ul className="space-y-1">
                          {cat.items.map((item, ii) => (
                            <li key={ii} className="text-sm flex gap-2 bg-green-50 rounded px-2.5 py-1.5">
                              <span className="text-green-800">{item.name}</span>
                              {item.note && (
                                <span className="text-green-500 text-xs mt-0.5">{item.note}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Disallowed foods */}
              <section>
                <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gray-500" />
                  禁止食用
                </h3>
                <div className="space-y-3">
                  {phaseData.disallowed.map((cat, ci) => (
                    <div key={ci}>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        {cat.category}
                      </div>
                      <ul className="space-y-1">
                        {cat.items.map((item, ii) => (
                          <li key={ii} className="text-sm bg-gray-50 rounded px-2.5 py-1.5 text-gray-600 line-through decoration-gray-300">
                            {item.name}
                            {item.note && (
                              <span className="no-underline text-gray-400 text-xs ml-1">({item.note})</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Source */}
              <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                資料來源：Levine et al., <em>Gastroenterology</em> 2019;
                Children&apos;s Wisconsin CDED Teaching Sheets.
                本資料僅供參考，請務必遵照您的醫療團隊指示。
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
