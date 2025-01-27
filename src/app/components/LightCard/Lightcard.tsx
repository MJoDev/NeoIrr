interface LightCardProps {
  borderSelected: React.CSSProperties;
  style: React.CSSProperties;
  value: number;
  reference: string;
  onClick: () => void;
}

export default function LightCard ({ borderSelected, style, value, reference, onClick }: LightCardProps)  {
  return (
    <div onClick={onClick}>
      <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg" style={borderSelected}>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-700" style={style}>{value}</div>
        </div>
      </div>
      <div className="text-md text-black text-center mt-2">{reference}</div>
    </div>
  )
}
