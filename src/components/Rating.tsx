import { Star } from 'lucide-react';

interface Props {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}

export default function Rating({ rating, count, size = 14, showCount = true, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={
              i <= Math.round(rating)
                ? 'fill-accent-400 text-accent-400'
                : 'fill-ink-100 text-ink-200'
            }
          />
        ))}
      </div>
      <span className="text-xs font-medium text-ink-500">
        {rating.toFixed(1)}
        {showCount && count !== undefined ? ` (${count})` : ''}
      </span>
    </div>
  );
}
