interface MatrixProps {
    text: any[];
}


export default function Matrix(props: MatrixProps) {
        const getLightStyle24 = (text: any) => {
            text = parseInt(text);
            if(text >= 24 && text <= 50) {
                return { color : 'black' };
            }else if(text === 0 || text === 2 || text === 20 || text === 22){
                return { color : 'lightgray' };
            }else{
                return { color : 'red' };
            }
         };
         const getLightStyle38 = (text: any) => {
            text = parseInt(text);
            if(text >= 28 && text <= 59) {
                return { color : 'black' };
            }else if(text === 1 || text === 21){
                return { color : 'lightgray' };
            }else{
                return { color : 'red' };
            }
         };
    
         const getLightStyle40 = (text: any) => {
            text = parseInt(text);
            if(text >= 40 && text <= 63) {
                return { color : "black" };
            }else if(text === 11){
                return { color : 'lightgray' };
            }else{
                return { color : 'red' };
            }
         }
         const getLightStyle27 = (text: any) => {
            text = parseInt(text);
            if(text >= 27 && text <= 56) {
                return { color : 'black' };
            }else if(text === 10 || text === 12){
                return { color : 'lightgray' };
            }else{
                return { color : 'red' };
            }
         }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-10 mb-10">
            <div className="grid grid-cols-3 gap-4 ">
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(props.text[0])}>{props.text[0]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle38(props.text[1])}>{props.text[1]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:38 - 59 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(props.text[2])}>{props.text[2]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle27(props.text[3])}>{props.text[3]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:27 - 56 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle40(props.text[4])}>{props.text[4]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:40 - 63 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle27(props.text[5])}>{props.text[5]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:27 - 56 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(props.text[6])}>{props.text[6]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle38(props.text[7])}>{props.text[7]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2" >REF:38 - 59 [uW/cm2/nm]</div>
                </div>
                <div>
                    <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(props.text[8])}>{props.text[8]}</div>
                        </div>
                    </div>
                    <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                </div>
                
                
            </div>
        </div>
    )
}