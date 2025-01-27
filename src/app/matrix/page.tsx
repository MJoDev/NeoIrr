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
    const [timers, setTimers] = useState({ button1: 0, button2: 0});
    const [selectedPosition, setSelectedPosition] = useState<number>(-1); 

    const handleCardSelect = (position: number) => {
        console.log("card selected: " + position);
        setSelectedPosition(position);
    };


    // Función para cambiar la sección
    const toggleSection = () => {
        setShowSection(prevSection => (prevSection === 'section1' ? 'section2' : 'section1'));
        setIsNextClicked(true);
    };

    const readProximityData = async () => {
        const characteristic = proximityCharacteristic;
        setIsReading(true)
        if (!characteristic) {
            console.error('La característica no está inicializada.');
            return;
        }

        try {
            setTimers((prev) => ({ ...prev, button1: 10 }));
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
            setIsReading(false)
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
        if(selectedPosition <= -1){
            alert("Select a field!")
            return
        }
        try {
            setIsReading(true)
            
            await characteristic.startNotifications();
            setTimers((prev) => ({ ...prev, button2: 10 })); // Actualiza el temporizador para cada iteración
                
            const handleValueChange = (event: any) => {
                const value = event.target.value;
                const floatValue = value.getFloat32(0, true);
                setLightData((prev) => 
                        prev.map((val, idx) => (idx === selectedPosition ? floatValue.toFixed(2) : val))
                    );
            };
    
            characteristic.addEventListener('characteristicvaluechanged', handleValueChange);
            // Esperar 10 segundos
            await new Promise((resolve) => setTimeout(resolve, 10000));
            characteristic.removeEventListener('characteristicvaluechanged', handleValueChange);
                
            
            await characteristic.stopNotifications();
            
    
            // Actualiza el estado con todos los datos recolectados
            
            setIsReading(false);
    
        } catch (error) {
            console.error('Error manejando la característica:', error);
        }
    };
        
    useEffect(() => {
        const activeTimers = Object.entries(timers).filter(([_, time]) => time > 0);
    
        const timer = setTimeout(() => {
          activeTimers.forEach(([button, time]) => {
            setTimers((prev) => ({ ...prev, [button]: time - 1 }));
          });
        }, 1000);
    
        return () => clearTimeout(timer); // Limpia el temporizador en cada render
      }, [timers]);
      

    const getProximityStyle = () => {
        const proximity = proximityData;
        if(proximity === undefined || proximity === 0){
          return { color: 'lightgray' };
        }
        return proximity < 30 || proximity > 50 ? { color: 'red' } : { color: 'black' };
       };

    const handleReadAndSaveClick = async () => {
        console.log("Proximity DATA: ", proximityData)
        console.log("LightData Data: ", lightData)
        if (proximityData && lightData && !isReading) {
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
                        <p>
                            <strong>1)</strong> Press Test.
                        </p>
                        <p>
                            <strong>2)</strong> Press the  <strong><span className="text-yellow-500">Yellow</span> Button</strong> in the Device.
                        </p>
                        </div>
                        <button onClick={readProximityData} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                        <div className="bg-white border rounded-md p-8 shadow-md w-80 mx-auto">
                            <p className="text-xl mt-2 text-center">
                                {timers.button1 > 0 ? `${timers.button1} Seconds Left` : ""}
                            </p>
                            <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                                <div className="text-6xl font-bold text-center text-gray-700" style={getProximityStyle()}>{`${proximityData || '0'}`}</div>
                            </div>
                            <div className="text-md text-center text-black mt-5">REF: 30-50 [cm]</div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-xl text-center mt-6 mb-4">
                        <p>
                            <strong>1)</strong> Click a Field.
                        </p>
                        <p>
                            <strong>2)</strong> Press Test.
                        </p>
                        <p>
                            <strong>3)</strong> Press the <strong><span className="text-red-500">Red</span> Button</strong> in the Device.
                        </p>
                        </div>
                        <button onClick={readData} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5 disabled:opacity-30" disabled={isReading}>TEST</button>
                        <p className="text-xl mt-2 text-center">
                                {timers.button2 > 0 ? `${timers.button2} Seconds Left` : ""}
                        </p>
                        <Matrix text={lightData} selectedPosition={selectedPosition} onCardSelect={handleCardSelect}/>
                    </div>
                )}</div> : <div>
                <div className="text-xl text-center mt-6 mb-4">
                    Please Connect a <strong>Bluetooth</strong> Device in <strong>CONFIG</strong>.
                </div>
                </div>}
                
            </div>
            {server ? <div className="ml-2 mx-2 grid grid-cols-2"> 
                <BackButton/>
                {!isNextClicked ? (
                    <button onClick={toggleSection} className="rounded-full border border-green-500 bg-green-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5 disabled:opacity-50" disabled={isReading}>NEXT</button>
                ) : (
                    <button onClick={handleReadAndSaveClick} className="rounded-full border border-blue-500 bg-blue-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition mx-5 ml-5 disabled:opacity-50" disabled={isReading}>
                        SAVE
                    </button>
                )}
            </div> :  <div className="ml-2 mx-2 grid"> 
                <BackButton/>
              </div> }
        </div>
    )
}