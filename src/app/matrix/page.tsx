"use client"

import { useState, useEffect, useRef } from "react";
import BackButton from "../components/BackButton/BackButton";
import Matrix from "../components/Matrix/Matrix";
import { useBluetooth } from "../utils/BluetoothContext";
import { useRouter } from 'next/navigation';
import { read } from "fs";


export default function MatrixPage() {


    const [proximityData, setProximityData] = useState<number>(0);
    const [lightData, setLightData] = useState<any[]>(["00", "01", "02", "10", "11", "12", "20", "21", "22"]);
    const [showSection, setShowSection] = useState('section1');
    const [isNextClicked, setIsNextClicked] = useState(false);
    const { server,
        proximityCharacteristic,
        lightCharacteristic,
       } = useBluetooth();
    const router = useRouter();
    const [isReading, setIsReading] = useState(true);
    const proximityIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [timerProximity, setTimerProximity] = useState(0);
    const [timers, setTimers] = useState({
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: 0,
        value6: 0,
        value7: 0,
        value8: 0,
        value9: 0,
    });
    
    useEffect(() => {
        const activeTimers = Object.entries(timers).filter(([_, time]) => time > 0);
    
        const timer = setTimeout(() => {
          activeTimers.forEach(([value, time]) => {
            setTimers((prev) => ({ ...prev, [value]: time - 1 }));
          });
        }, 1000);
    
        return () => clearTimeout(timer); // Limpia el temporizador en cada render
      }, [timers]);

      useEffect(() => {
        if (timerProximity > 0) {
          const timer = setTimeout(() => {
            setTimerProximity((prev) => prev - 1);
          }, 1000);
    
          return () => clearTimeout(timer); // Limpia el temporizador en cada render
        }
      }, [timerProximity]);
    
    // Función para cambiar la sección
    const toggleSection = () => {
        setShowSection(prevSection => (prevSection === 'section1' ? 'section2' : 'section1'));
        setIsNextClicked(true);
    };

    const readProximityData = async () => {
        const characteristic = proximityCharacteristic;
        if (!characteristic) {
            console.error('La característica no está inicializada.');
            return;
        }

        try {
            setTimers((prev) => ({ ...prev, [0]: 10 }));
            await characteristic.startNotifications();
    
            const handleValueChange = (event: any) => {
            const value = event.target.value;
            const floatValue = value.getFloat32(0, true);
            setProximityData(floatValue.toFixed(2));
            
            };
    
            characteristic.addEventListener('characteristicvaluechanged', handleValueChange);
    
            // Esperar 10 segundos
            await new Promise((resolve) => setTimeout(resolve, 10000));
    
            await characteristic.stopNotifications();
            characteristic.removeEventListener('characteristicvaluechanged', handleValueChange);
    
            console.log('Notificaciones detenidas y valor congelado.');
        } catch (error) {
            console.error('Error manejando la característica:', error);
        }
    };

    const readData = async () => {
        const characteristic = lightCharacteristic;
        if (!characteristic) {
            console.error('La característica no está inicializada.');
            return;
        }
        try {
            // Inicializa el array de datos
            const updatedData: any[] = [];
    
            // Bucle para ejecutar 9 veces
            for (let i = 0; i < 9; i++) {
                setTimers((prev) => ({ ...prev, [i]: 10 })); // Actualiza el temporizador para cada iteración
                
                await characteristic.startNotifications();
    
                const handleValueChange = (event: any) => {
                    const value = event.target.value;
                    const floatValue = value.getFloat32(0, true);
                    console.log(`Valor recibido en la iteración ${i}: ${floatValue.toFixed(2)}`);
                    updatedData.push(floatValue.toFixed(2)); // Agrega el valor al array
                };
    
                characteristic.addEventListener('characteristicvaluechanged', handleValueChange);
    
                // Esperar 10 segundos
                await new Promise((resolve) => setTimeout(resolve, 10000));
    
                await characteristic.stopNotifications();
                characteristic.removeEventListener('characteristicvaluechanged', handleValueChange);
                console.log(`Notificaciones detenidas para la iteración ${i}`);
                setLightData((prev) => ({
                    ...prev,
                    [i]: updatedData[i],
                }));
            }
    
            // Actualiza el estado con todos los datos recolectados
            
            setIsReading(false);
            console.log('Proceso completado. Datos recolectados:', updatedData);
    
        } catch (error) {
            console.error('Error manejando la característica:', error);
        }
    };
        
    const getLightStyle24 = (text: any) => {
        text = parseInt(text);
        if(text >= 24 && text <= 50) {
            return { color : 'black' };
        }else if(text == 0 || text == 2 || text == 20 || text == 22){
            return { color : 'lightgray' };
        }else{
            return { color : 'red' };
        }
     };
     const getLightStyle38 = (text: any) => {
        text = parseInt(text);
        if(text >= 28 && text <= 59) {
            return { color : 'black' };
        }else if(text == 1 || text == 21){
            return { color : 'lightgray' };
        }else{
            return { color : 'red' };
        }
     };

     const getLightStyle40 = (text: any) => {
        text = parseInt(text);
        if(text >= 40 && text <= 63) {
            return { color : "black" };
        }else if(text == 11){
            return { color : 'lightgray' };
        }else{
            return { color : 'red' };
        }
     }
     const getLightStyle27 = (text: any) => {
        text = parseInt(text);
        if(text >= 27 && text <= 56) {
            return { color : 'black' };
        }else if(text == 10 || text == 12){
            return { color : 'lightgray' };
        }else{
            return { color : 'red' };
        }
     }
                

    const getProximityStyle = () => {
        const proximity = proximityData;
        if(proximity === undefined){
          return { color: 'lightgray' };
        }
        return proximity < 10 || proximity > 40 ? { color: 'red' } : { color: 'black' };
       };

    const handleReadAndSaveClick = async () => {
        
        if (proximityData > 0 && !setIsReading) {
        const dataToSave = {
          proximityData,
          lightData,
        };
            localStorage.setItem('matrixData', JSON.stringify(dataToSave));
            router.push('/save');
        } else {
            alert('No data to save!');
        }
      };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    MATRIX
                </div> 
                {server ?  <div> {showSection === 'section1' ? (
                    <div>
                        <div className="text-xl text-center mt-6 mb-4">
                            Press the Yellow Button in the device
                        </div>
                        <button onClick={readProximityData} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                        <div className="bg-white border rounded-md p-8 shadow-md w-80 mx-auto">
                            <p className="text-xl mt-2 text-center">
                                {timerProximity > 0 ? `${timerProximity} Seconds Left` : ""}
                            </p>
                            <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                                <div className="text-6xl font-bold text-center text-gray-700" style={getProximityStyle()}>{`${proximityData || '0'}`}</div>
                            </div>
                            <div className="text-md text-center text-black mt-5">REF: 10-40 [cm]</div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-xl text-center mt-6 mb-4">
                            Press the Red Button in the device
                        </div>
                        <button onClick={readData} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                        <div className="flex flex-col items-center justify-center space-y-4 mt-10 mb-10">
                        <div className="grid grid-cols-3 gap-4 ">
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value1 > 0 ? `${timers.value1} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(lightData[0])}>{lightData[0]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value2 > 0 ? `${timers.value2} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle38(lightData[1])}>{lightData[1]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:38 - 59 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value3 > 0 ? `${timers.value3} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(lightData[2])}>{lightData[2]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value4 > 0 ? `${timers.value4} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle27(lightData[3])}>{lightData[3]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:27 - 56 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value5 > 0 ? `${timers.value5} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle40(lightData[4])}>{lightData[4]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:40 - 63 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value6 > 0 ? `${timers.value6} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle27(lightData[5])}>{lightData[5]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:27 - 56 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value7 > 0 ? `${timers.value7} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(lightData[6])}>{lightData[6]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value8 > 0 ? `${timers.value8} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle38(lightData[7])}>{lightData[7]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2" >REF:38 - 59 [uW/cm2/nm]</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-21 w-21 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                    <p className="text-xl mt-2 text-center">
                                            {timers.value9 > 0 ? `${timers.value9} Seconds Left` : ""}
                                    </p>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-700" style={getLightStyle24(lightData[8])}>{lightData[8]}</div>
                                    </div>
                                </div>
                                <div className="text-md text-black text-center mt-2">REF:24 - 50 [uW/cm2/nm]</div>
                            </div>
                            
                            
                        </div>
                    </div>
                    </div>
                )}</div> : <div>
                <div className="text-xl text-center mt-6 mb-4">
                    Please Connect a Bluetooth Device in Config.
                </div>
                </div>}
                
            </div>
            {server ? <div className="ml-2 mx-2 grid grid-cols-2"> 
                {!isNextClicked ? (
                    <button onClick={toggleSection} className="rounded-full border border-green-500 bg-green-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5">NEXT</button>
                ) : (
                    <button onClick={handleReadAndSaveClick} className="rounded-full border border-blue-500 bg-blue-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition mx-5 ml-5">
                        REC
                    </button>
                )}
                <BackButton/>
            </div> :  <div className="ml-2 mx-2 grid"> 
                <BackButton/>
              </div> }
        </div>
    )
}