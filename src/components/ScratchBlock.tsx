import React from 'react';
import { ScratchBlockDef, BlockCategory } from '../types';

interface ScratchBlockProps {
  block: ScratchBlockDef;
  onRemove?: () => void;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showCategoryLabel?: boolean;
}

const CATEGORY_STYLES: Record<
  BlockCategory,
  { bg: string; border: string; text: string; label: string; icon: string }
> = {
  events: {
    bg: 'bg-[#FFBF00]',
    border: 'border-[#DE9E00]',
    text: 'text-slate-900',
    label: 'Sự kiện',
    icon: '⚡'
  },
  motion: {
    bg: 'bg-[#4C97FF]',
    border: 'border-[#3373CC]',
    text: 'text-white',
    label: 'Chuyển động',
    icon: '➡️'
  },
  looks: {
    bg: 'bg-[#9966FF]',
    border: 'border-[#774DCB]',
    text: 'text-white',
    label: 'Hiển thị',
    icon: '💬'
  },
  sound: {
    bg: 'bg-[#CF63CF]',
    border: 'border-[#BD42BD]',
    text: 'text-white',
    label: 'Âm thanh',
    icon: '🔊'
  },
  control: {
    bg: 'bg-[#FFAB19]',
    border: 'border-[#CF8B17]',
    text: 'text-white',
    label: 'Điều khiển',
    icon: '🔁'
  },
  sensing: {
    bg: 'bg-[#5CB1D6]',
    border: 'border-[#2E8EB8]',
    text: 'text-white',
    label: 'Cảm biến',
    icon: '🎯'
  },
  operators: {
    bg: 'bg-[#59C059]',
    border: 'border-[#389438]',
    text: 'text-white',
    label: 'Các phép toán',
    icon: '➕'
  },
  variables: {
    bg: 'bg-[#FF8C1A]',
    border: 'border-[#DB6E00]',
    text: 'text-white',
    label: 'Các biến',
    icon: '📦'
  }
};

export const ScratchBlock: React.FC<ScratchBlockProps> = ({
  block,
  onRemove,
  onClick,
  size = 'md',
  showCategoryLabel = false
}) => {
  const style = CATEGORY_STYLES[block.category] || CATEGORY_STYLES.events;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 min-h-[30px]',
    md: 'text-sm px-3.5 py-1.5 min-h-[38px]',
    lg: 'text-base px-4 py-2 min-h-[46px]'
  }[size];

  // Render authentic Scratch block shapes
  const isHat = block.shape === 'hat';
  const isCBlock = block.shape === 'c-block';
  const isReporter = block.shape === 'reporter';
  const isBoolean = block.shape === 'boolean';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center font-bold tracking-tight select-none shadow-sm transition-transform active:scale-[0.98] ${
        onClick ? 'cursor-pointer hover:brightness-105' : ''
      } ${style.bg} ${style.text} ${sizeClasses} ${
        isReporter
          ? 'rounded-full border-2 ' + style.border
          : isBoolean
          ? 'rounded-none clip-path-hex border-2 ' + style.border
          : isHat
          ? 'rounded-t-2xl rounded-b-md border-t-4 border-b-2 border-x-2 ' + style.border
          : isCBlock
          ? 'rounded-md border-2 border-l-8 ' + style.border
          : 'rounded-md border-2 ' + style.border
      }`}
      style={{
        boxShadow: '0 2px 4px rgba(0,0,0,0.12)'
      }}
    >
      {/* Scratch hat curve indicator */}
      {isHat && (
        <span className="mr-1.5 text-xs opacity-90">🚩</span>
      )}

      {/* Main block text with styled inputs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span>{block.text}</span>
      </div>

      {showCategoryLabel && (
        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-black/20 text-white/90 font-normal">
          {style.label}
        </span>
      )}

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-2 w-4 h-4 rounded-full bg-black/30 hover:bg-black/50 text-white text-[10px] flex items-center justify-center cursor-pointer transition-colors"
          title="Xóa khối lệnh"
        >
          ✕
        </button>
      )}
    </div>
  );
};
