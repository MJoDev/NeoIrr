export default function LightCard ({ style, value, reference })  {
  return (
    <div>
      <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-700" style={style}>{value}</div>
        </div>
      </div>
      <div className="text-md text-black text-center mt-2">{reference}</div>
    </div>
  )
}
    