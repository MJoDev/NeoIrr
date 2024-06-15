"use client"
import { useEffect, useState } from 'react';
import BackButton from "../components/BackButton/BackButton";
import { useBluetooth } from "../utils/BluetoothContext";
import { useRouter } from 'next/navigation';

export default function GeneralPage() {

    const { server } = useBluetooth();
    const [proximityData, setProximityData] = useState<number[]>([]);
    const [lightData, setLightData] = useState<number[]>([]);
    const router = useRouter();
    
    

    useEffect(() => {
      const receiveData = async () => {
        if (server) {
          try {
            const service = await server.getPrimaryService('12345678-1234-5678-1234-56789abcdef0'); // UUID de 128 bits del servicio de sensores
            const proximityCharacteristic = await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef1'); // UUID de la característica de proximidad
            const lightCharacteristic = await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef2'); // UUID de la característica de luz
  
            proximityCharacteristic.startNotifications();
            lightCharacteristic.startNotifications();
  
            proximityCharacteristic.addEventListener('characteristicvaluechanged', (event: any) => {
              const value = event.target.value.getUint16(0, true);
              setProximityData((prevData) => {
                const newData = [...prevData, value];
                localStorage.setItem('proximityData', JSON.stringify(newData));
                return newData;
              });
            });
  
            lightCharacteristic.addEventListener('characteristicvaluechanged', (event: any) => {
              const value = event.target.value.getUint16(0, true);
              setLightData((prevData) => {
                const newData = [...prevData, value];
                localStorage.setItem('lightData', JSON.stringify(newData));
                return newData;
              });
            });
          } catch (error) {
            console.error('Error receiving data from the device:', error);
          }
        }
      };
  
      receiveData();
    }, [server]);

    const handleButtonClick = async (type: 'P' | 'L') => {
      if (server) {
        try {
          const service = await server.getPrimaryService('12345678-1234-5678-1234-56789abcdef0');
          const characteristic = type === 'P' ? await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef1') : await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef2');
          await characteristic.writeValue(new TextEncoder().encode(type));
        } catch (error) {
          console.error('Error sending command to the device:', error);
        }
      }
    };

    const handleSaveClick = () => {
      if (proximityData.length > 0 && lightData.length > 0) {
        const dataToSave = {
          proximityData,
          lightData,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem('currentData', JSON.stringify(dataToSave));
        router.push('/save');
      } else {
        alert('No data to save!');
      }
    };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    GENERAL
                </div> 
                { !server ? <div>
                    <div className="text-xl text-center mt-6 mb-4">
                    Press the Yellow Button in the device
                </div>
                <button onClick={() => handleButtonClick('P')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                <div className="bg-white border border-gray-400 rounded-md p-8 shadow-md w-80 mx-auto">
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center text-gray-700">0{proximityData.map((data, index) => (
          <div key={index}>{data}</div>
        ))}<div className="text-sm text-gray-500">REF: 10-40 CM</div></div>
                    </div>
                </div>
                <div className="text-xl text-center mt-6 mb-4">
                    Press the Red Button in the device
                </div>
                <button onClick={() => handleButtonClick('L')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                <div className="bg-white border border-gray-400 rounded-md p-8 shadow-md w-80 mx-auto mb-5">
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center text-gray-700">0{lightData.map((data, index) => (
          <div key={index}>{data}</div>
        ))}<div className="text-sm text-gray-500">REF: 40 - 63 [uW/cm2/nm]</div></div>
                    </div>
                </div>
                </div> : <div>
                <div className="text-xl text-center mt-6 mb-4">
                    Please Connect a Bluetooth Device in Config.
                </div>
                </div> }
                
            </div>
            <div className="ml-2 mx-2 grid grid-cols-2"> 
              <button onClick={handleSaveClick} className="rounded-full border border-blue-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition mx-5 ml-5">
                   REC
               </button>
                <BackButton/>
            </div>
        </div>
    )
}