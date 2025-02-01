import LightCard from "../LightCard/Lightcard";

interface MatrixProps {
    text: number[];
    selectedPosition: number | null;
    onCardSelect: (position: number) => void;
}

export default function Matrix(props: MatrixProps) {
    const { text, selectedPosition, onCardSelect } = props;

    const getLightStyle = (text: string, range: [number, number], lightGrayValues: number[]) => {
        const parsedText = parseFloat(text);
        if (parsedText >= range[0] && parsedText <= range[1]) {
            return { color: "black" };
        } else if (lightGrayValues.includes(parsedText)) {
            return { color: "lightgray" };
        } else {
            return { color: "red" };
        }
    };

    const getLightStyle1836 = (text: string) => getLightStyle(text, [18, 57], [0, 2, 20, 22]);
    const getLightStyle2063 = (text: string) => getLightStyle(text, [20, 63], [11]);
    const getLightStyle1959 = (text: string) => getLightStyle(text, [19, 59], [1,10, 12, 21]);

    const lightData = [
        { reference: "Ref: 18 - 35,1 | 36 - 56,7" },
        { reference: "Ref: 19 - 37,5 | 38 - 59,8" },
        { reference: "Ref: 18 - 35,1 | 36 - 56,7" },
        { reference: "Ref: 19 - 37,5 | 38 - 59,8" },
        { reference: "Ref: 20 - 39 | 40 - 63" },
        { reference: "Ref: 19 - 37,5 | 38 - 59,8" },
        { reference: "Ref: 18 - 35,1 | 36 - 56,7" },
        { reference: "Ref: 19 - 37,5 | 38 - 59,8" },
        { reference: "Ref: 18 - 35,1 | 36 - 56,7" }
      ];
    
      const getLightStyleForIndex = (index: number, value: number) => {
        switch (index) {
            case 0:
                return getLightStyle1836(`${value}`);
            case 1:
                return getLightStyle1959(`${value}`);
            case 2: 
                return getLightStyle1836(`${value}`);
            case 3:
                return getLightStyle1959(`${value}`);
            case 4:
                return getLightStyle2063(`${value}`);
            case 5:
                return getLightStyle1959(`${value}`);
            case 6:
                return getLightStyle1836(`${value}`);
            case 7: 
                return getLightStyle1959(`${value}`);
            case 8:
                return getLightStyle1836(`${value}`);
            default:
                return {};
        }
      };

      const borderSelected = (index: number, nowSelected: number | null): string => {
        if(index === nowSelected){
            return "border-gray-700";
         }else{
            return "border-gray-300";
         }     
    };

      return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-10 mb-10">
          <div className="grid grid-cols-3 gap-4">
          {text.map((value, index) => {
                const style = getLightStyleForIndex(index, value); // Asignamos el estilo según el índice
            
                return (
                        <LightCard
                            borderSelected={borderSelected(index, selectedPosition)} 
                            key={index}
                            style={{ ...style }}
                            value={value}
                            reference={lightData[index].reference}
                            onClick={() => onCardSelect(index)}
                        />
                    );
                })}
          </div>
        </div>
      );
}
