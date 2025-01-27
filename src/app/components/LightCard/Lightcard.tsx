interface LightCardProps {
  style: React.CSSProperties;
  value: number;
  reference: string;
  onClick: () => void;
}

export default function LightCard({ style, value, reference, onClick }: LightCardProps) {
  return (
      <div
          className="p-4 rounded shadow cursor-pointer"
          style={style}
          onClick={onClick}
      >
          <div>{value}</div>
          <div>{reference}</div>
      </div>
  );
}