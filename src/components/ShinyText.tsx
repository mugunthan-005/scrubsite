import { CSSProperties } from 'react';
import './ShinyText.css';

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  style?: CSSProperties;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = '',
  color = 'rgba(255, 255, 255, 0.15)',
  shineColor = '#2DD4BF',
  spread = 120,
  style
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className} style={style}>{text}</span>;
  }

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    ['--shiny-speed' as any]: `${speed}s`,
    ...style
  };

  return (
    <span className={`shiny-text ${className}`} style={gradientStyle}>
      {text}
    </span>
  );
}
