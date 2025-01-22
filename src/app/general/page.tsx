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
              console.log(event.target.value);
              const value = event.target.value.getUint16(0, true);
              setProximityData((prevData) => {
                const newData = [...prevData, value];
                proximityData.push(value);
                return newData;
              });
              console.log(proximityData);
            });
  
            lightCharacteristic.addEventListener('characteristicvaluechanged', (event: any) => {
              console.log(event.target.value);
              const value = event.target.value.getUint16(0, true);
              setLightData((prevData) => {
                const newData = [...prevData, value];
                lightData.push(value);
                return newData;
              });
              console.log(lightCharacteristic); 
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

     const getProximityStyle = () => {
      const proximity = proximityData[0];
      if(proximityData[0] == undefined){
        return { color: 'lightgray' };
      }
      return proximity < 10 || proximity > 40 ? { color: 'red' } : { color: 'black' };
     };

     const getLightStyle = () => {
      const light = lightData[0];
      if(lightData[0] == undefined){
        return { color: 'lightgray' };
      }
      return light < 40 || light > 63 ? { color: 'red' } : { color: 'black' };
     };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    GENERAL
                </div> 
                { server ? <div>
                    <div className="text-xl text-center mt-6 mb-4">
                    Press the Yellow Button in the device
                </div>
                <button onClick={() => handleButtonClick('P')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                <div className="bg-white borderrounded-md p-8 shadow-md w-80 mx-auto">
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center text-gray-700" style={getProximityStyle()}>{`${proximityData[0] || '0'}`}</div>
                    </div>
                    <div className="text-md text-black text-center mt-5">REF: 10-40 [cm]</div>
                </div>
                <div className="text-xl text-center mt-6 mb-4">
                    Press the Red Button in the device
                </div>
                <button onClick={() => handleButtonClick('L')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                <div className="bg-white borde rounded-md p-8 shadow-md w-80 mx-auto mb-5">
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center text-gray-700" style={getLightStyle()}>{`${lightData[0] || '0'}`}</div>
                    </div>
                    <div className="text-md text-black text-center mt-5">REF: 40 - 63 [uW/cm2/nm]</div>
                </div>
                </div> : <div>
                <div className="text-xl text-center mt-6 mb-4">
                    Please Connect a Bluetooth Device in Config.
                </div>
                </div> }
                
            </div>
            <div className="ml-2 mx-2 grid grid-cols-2"> 
              <button onClick={handleSaveClick} className="rounded-full border border-blue-500 bg-blue-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition mx-5 ml-5">
                   REC
               </button>
                <BackButton/>
            </div>
        </div>
    )
}