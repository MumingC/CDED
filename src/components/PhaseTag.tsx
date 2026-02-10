import { PhaseNumber } from '@/types';

const phaseStyles: Record<PhaseNumber, string> = {
  1: 'bg-orange-100 text-orange-700',
  2: 'bg-blue-100 text-blue-700',
  3: 'bg-green-100 text-green-700',
};

export default function PhaseTag({ phase }: { phase: PhaseNumber }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${phaseStyles[phase]}`}>
      Phase {phase}
    </span>
  );
}
