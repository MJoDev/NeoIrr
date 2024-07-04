"use client"

import { useState, useEffect, useRef } from "react";
import BackButton from "../components/BackButton/BackButton";
import Matrix from "../components/Matrix/Matrix";
import { useBluetooth } from "../utils/BluetoothContext";
import { useRouter } from 'next/navigation';
import { read } from "fs";


export default function MatrixPage() {

    const { server } = useBluetooth();
    const [proximityData, setProximityData] = useState<number[]>([]);
    const [lightData, setLightData] = useState<string[]>(["00", "01", "02", "10", "11", "12", "20", "21", "22"]);
    const [showSection, setShowSection] = useState('section1');
    const [isNextClicked, setIsNextClicked] = useState(false);
    const router = useRouter();
    const [isReading, setIsReading] = useState(true);
    const proximityIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // Función para cambiar la sección
    const toggleSection = () => {
        setShowSection(prevSection => (prevSection === 'section1' ? 'section2' : 'section1'));
        setIsNextClicked(true);
    };

    const readProximityData = async () => {
        if(server){
            try {
                const service = await server.getPrimaryService('12345678-1234-5678-1234-56789abcdef0'); // UUID de 128 bits del servicio de sensores
                const proximityCharacteristic = await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef1'); // UUID de la característica de proximidad
                const proximityValue = await proximityCharacteristic.readValue();
                const newProximityData = [...proximityData];
                newProximityData.push(proximityValue.getUint8(0));
                setProximityData(newProximityData);
            } catch(error){
                console.log("Error receiving data from the device:", error);
        }
    }else{
        alert("Bluetooth not connected")
    }
    }
    const readData = async () => {
        if (server) {
            try {
                const service = await server.getPrimaryService('12345678-1234-5678-1234-56789abcdef0'); // UUID de 128 bits del servicio de sensores
                const lightCharacteristic = await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef2'); // UUID de la característica de luz

                for (let i = 0; i < lightData.length; i++) {
                    const lightValue = await lightCharacteristic.readValue();
                    const newLightData = [...lightData];
                    newLightData[i] = lightValue.getUint8(0).toString(); // Convert value to string
                    setLightData(newLightData);
                    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
                  }
                  setIsReading(false)

            } catch(error){
                console.log("Error receiving data from the device:", error);

            }

        }
    }

    const getProximityStyle = () => {
        const proximity = proximityData[0];
        if(proximityData[0] == undefined){
          return { color: 'lightgray' };
        }
        return proximity < 10 || proximity > 40 ? { color: 'red' } : { color: 'black' };
       };

    const handleReadAndSaveClick = async () => {
        
        if (proximityData.length > 0 && !setIsReading) {
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
                            <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                                <div className="text-6xl font-bold text-center text-gray-700" style={getProximityStyle()}>{`${proximityData[0] || '0'}`}</div>
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
                        <Matrix text={lightData}/>
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