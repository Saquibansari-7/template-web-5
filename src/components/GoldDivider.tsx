interface GoldDividerProps {
  width?: string;
  className?: string;
  withDiamond?: boolean;
}

export default function GoldDivider({ width = '120px', className = '', withDiamond = true }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div
        className="h-[1px]"
        style={{
          width,
          background: 'linear-gradient(90deg, transparent, #F2C94C, transparent)',
        }}
      />
      {withDiamond && (
        <span className="text-gold-accent text-xs">❖</span>
      )}
      <div
        className="h-[1px]"
        style={{
          width,
          background: 'linear-gradient(90deg, transparent, #F2C94C, transparent)',
        }}
      />
    </div>
  );
}
