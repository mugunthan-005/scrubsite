import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: { opacity?: number; y?: number; x?: number };
  to?: { opacity?: number; y?: number; x?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 30,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
  tag = 'p',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLParagraphElement | HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;

    const elements = containerRef.current.querySelectorAll('.split-item');
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: from.opacity ?? 0, y: from.y ?? 30, x: from.x ?? 0 },
        {
          opacity: to.opacity ?? 1,
          y: to.y ?? 0,
          x: to.x ?? 0,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            if (onLetterAnimationComplete) onLetterAnimationComplete();
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), onLetterAnimationComplete]);

  const Tag = tag || 'p';

  if (splitType === 'words') {
    const words = text.split(' ');
    return (
      <Tag
        ref={containerRef as any}
        style={{ textAlign }}
        className={`inline-block overflow-hidden ${className}`.trim()}
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            <span className="split-item inline-block">{word}</span>
          </span>
        ))}
      </Tag>
    );
  }

  // Default: splitType === 'chars'
  const words = text.split(' ');
  return (
    <Tag
      ref={containerRef as any}
      style={{ textAlign }}
      className={`inline-block overflow-hidden ${className}`.trim()}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span key={cIdx} className="split-item inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
