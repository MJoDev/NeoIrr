interface MatrixProps {
    text: string[];
    timers: { [key: string]: number }; // Objeto con claves de tipo string y valores de tipo number
    setTimers: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>; // Función para actualizar el estado
}


export default function Matrix(MatrixProps: MatrixProps) {
    

    return (
        <div></div>
    )
}