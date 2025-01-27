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

    const getLightStyle24 = (text: string) => getLightStyle(text, [24, 50], [0, 2, 20, 22]);
    const getLightStyle38 = (text: string) => getLightStyle(text, [28, 59], [1, 21]);
    const getLightStyle40 = (text: string) => getLightStyle(text, [40, 63], [11]);
    const getLightStyle27 = (text: string) => getLightStyle(text, [27, 56], [10, 12]);

    const lightData = [
        { reference: "REF:24 - 50 [uW/cm2/nm]" },
        { reference: "REF:38 - 59 [uW/cm2/nm]" },
        { reference: "REF:24 - 50 [uW/cm2/nm]" },
        { reference: "REF:27 - 56 [uW/cm2/nm]" },
        { reference: "REF:40 - 63 [uW/cm2/nm]" },
        { reference: "REF:27 - 56 [uW/cm2/nm]" },
        { reference: "REF:24 - 50 [uW/cm2/nm]" },
        { reference: "REF:38 - 59 [uW/cm2/nm]" },
        { reference: "REF:24 - 50 [uW/cm2/nm]" }
      ];
    
      const getLightStyleForIndex = (index: number, value: number) => {
        switch (index) {
            case 0:
                return getLightStyle24(`${value}`);
            case 1:
                return getLightStyle38(`${value}`);
            case 2: 
                return getLightStyle24(`${value}`);
            case 3:
                return getLightStyle27(`${value}`);
            case 4:
                return getLightStyle40(`${value}`);
            case 5:
                return getLightStyle27(`${value}`);
            case 6:
                return getLightStyle24(`${value}`);
            case 7: 
                return getLightStyle38(`${value}`);
            case 8:
                return getLightStyle24(`${value}`);
            default:
                return {};
        }
      };

      return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-10 mb-10">
          <div className="grid grid-cols-3 gap-4">
          {text.map((value, index) => {
                const style = getLightStyleForIndex(index, value); // Asignamos el estilo según el índice
                const isSelected = index === selectedPosition;
                const borderColor = isSelected ? "border-blue-500 4px solid" : "border-transparent";

                return (
                        <LightCard
                            borderSelected={{borderColor}} 
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
