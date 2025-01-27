import LightCard from "../LightCard/Lightcard";

interface MatrixProps {
    text: number[];
    selectedPosition: number | null;
    onCardSelect: (position: number) => void;
}

export default function Matrix(props: MatrixProps) {
    const { text, selectedPosition, onCardSelect } = props;

    const getLightStyle = (text: number, range: [number, number], lightGrayValues: number[]) => {
        const parsedText = text;
        if (parsedText >= range[0] && parsedText <= range[1]) {
            return { color: "black" };
        } else if (lightGrayValues.includes(parsedText)) {
            return { color: "lightgray" };
        } else {
            return { color: "red" };
        }
    };

    const getLightStyle24 = (text: number) => getLightStyle(text, [24, 50], [0, 2, 20, 22]);
    const getLightStyle38 = (text: number) => getLightStyle(text, [28, 59], [1, 21]);
    const getLightStyle40 = (text: number) => getLightStyle(text, [40, 63], [11]);
    const getLightStyle27 = (text: number) => getLightStyle(text, [27, 56], [10, 12]);

    const lightData = [
        { style: getLightStyle24(props.text[0]), value: props.text[0], reference: "REF:24 - 50 [uW/cm2/nm]" },
        { style: getLightStyle38(props.text[1]), value: props.text[1], reference: "REF:38 - 59 [uW/cm2/nm]" },
        { style: getLightStyle24(props.text[2]), value: props.text[2], reference: "REF:24 - 50 [uW/cm2/nm]" },
        { style: getLightStyle27(props.text[3]), value: props.text[3], reference: "REF:27 - 56 [uW/cm2/nm]" },
        { style: getLightStyle40(props.text[4]), value: props.text[4], reference: "REF:40 - 63 [uW/cm2/nm]" },
        { style: getLightStyle27(props.text[5]), value: props.text[5], reference: "REF:27 - 56 [uW/cm2/nm]" },
        { style: getLightStyle24(props.text[6]), value: props.text[6], reference: "REF:24 - 50 [uW/cm2/nm]" },
        { style: getLightStyle38(props.text[7]), value: props.text[7], reference: "REF:38 - 59 [uW/cm2/nm]" },
        { style: getLightStyle24(props.text[8]), value: props.text[8], reference: "REF:24 - 50 [uW/cm2/nm]" }
      ];
    
      return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-10 mb-10">
          <div className="grid grid-cols-3 gap-4">
            {lightData.map((data, index) => {
                const isSelected = index === selectedPosition;
                const borderColor = isSelected ? "border-blue-500" : "border-transparent";
                return <LightCard key={index} style={{ ...data.style, border: `2px solid ${borderColor}` }}value={data.value} reference={data.reference} onClick={() => onCardSelect} />
            })}
          </div>
        </div>
      );
}
