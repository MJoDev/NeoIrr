
interface MatrixProps {
    text: string[];
}

export default function Matrix(MatrixProps: MatrixProps) {

    return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-10 mb-10">
        <div className="grid grid-cols-3 gap-4 ">
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[0]}</div>
                    <div className="text-xs text-gray-500">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[1]}</div>
                    <div className="text-xs text-gray-500">REF:38 - 59 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[2]}</div>
                    <div className="text-xs text-gray-500">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[3]}</div>
                    <div className="text-xs text-gray-500">REF:27 - 56 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[4]}</div>
                    <div className="text-xs text-gray-500">REF:40 - 63 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[5]}</div>
                    <div className="text-xs text-gray-500">REF:27 - 56 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[6]}</div>
                    <div className="text-xs text-gray-500">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[7]}</div>
                    <div className="text-xs text-gray-500">REF:38 - 59 [uW/cm2/nm]</div>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-bold">{MatrixProps.text[8]}</div>
                    <div className="text-xs text-gray-500">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
            </div>
        </div>
    </div>
    )
}