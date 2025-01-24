"use client"
import { useEffect, useState } from 'react';
import BackButton from "../components/BackButton/BackButton";
import { useBluetooth } from "../utils/BluetoothContext";
import { useRouter } from 'next/navigation';

export default function GeneralPage() {

    const { server,
      proximityCharacteristic,
      lightCharacteristic,
     } = useBluetooth();
    const [proximityData, setProximityData] = useState(0);
    const [lightData, setLightData] = useState(0)
    const router = useRouter();
    const [timers, setTimers] = useState({ button1: 0, button2: 0 });

    const handleButtonClick = async (type: 'P' | 'L', button: 'button1' | 'button2') => {
      const characteristic = type === 'P' ? proximityCharacteristic : lightCharacteristic;
      if (!characteristic) {
        console.error('La característica no está inicializada.');
        return;
      }
  
      try {
        setTimers((prev) => ({ ...prev, [button]: 10 }));
        await characteristic.startNotifications();
  
        const handleValueChange = (event: any) => {
          const value = event.target.value;
          const floatValue = value.getFloat32(0, true);

          if(type === 'P'){
            setProximityData(floatValue.toFixed(2));
          }else{
            setLightData(floatValue.toFixed(2));
          }
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

    useEffect(() => {
      const activeTimers = Object.entries(timers).filter(([_, time]) => time > 0);
  
      const timer = setTimeout(() => {
        activeTimers.forEach(([button, time]) => {
          setTimers((prev) => ({ ...prev, [button]: time - 1 }));
        });
      }, 1000);
  
      return () => clearTimeout(timer); // Limpia el temporizador en cada render
    }, [timers]);
    


    const handleSaveClick = () => {
      if (proximityData > 0 && lightData > 0) {
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
      const proximity = proximityData;
      if(proximityData === undefined || proximityData === 0){
        return { color: 'lightgray' };
      }
      return proximity < 30 || proximity > 50 ? { color: 'red' } : { color: 'black' };
     };

     const getLightStyle = () => {
      const light = lightData;
      if(lightData === undefined || lightData === 0){
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
                <button onClick={() => handleButtonClick('P', 'button1')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5" disabled={timers.button1 > 0}>TEST</button>
                <div className="bg-white borderrounded-md p-8 shadow-md w-80 mx-auto">
                    <p className="text-xl mt-2 text-center">
                      {timers.button1 > 0 ? `${timers.button1} Seconds Left` : ""}
                   </p>
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center text-gray-700" style={getProximityStyle()}>{`${proximityData || '0'}`}</div>
                    </div>
                    <div className="text-md text-black text-center mt-5">REF: 30-50 [cm]</div>
                </div>
                <div className="text-xl text-center mt-6 mb-4">
                    Press the Red Button in the device
                </div>
                <button onClick={() => handleButtonClick('L', 'button2')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5" disabled={timers.button2 > 0}>TEST</button>
                <div className="bg-white borde rounded-md p-8 shadow-md w-80 mx-auto mb-5">
                   <p className="text-xl mt-2 text-center">
                      {timers.button2 > 0 ? `${timers.button2} segundos` : ""}
                   </p>
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center text-gray-700" style={getLightStyle()} >{`${lightData || '0'}`}</div>
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