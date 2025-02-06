"use client"
import { useEffect, useState } from 'react';
import BackButton from "../components/BackButton/BackButton";
import { useBluetooth } from "../utils/BluetoothContext";
import { useRouter } from 'next/navigation';
import RealTimeChart from '../components/RealTimeChart/RealTimeChart'

export default function GraphPage() {
    const { server,
      proximityCharacteristic,
      lightCharacteristic,
     } = useBluetooth();
    const [proximityData, setProximityData] = useState(0);
    const [lightData, setLightData] = useState<number[]>([0]);
    const [timers, setTimers] = useState({ button1: 0, button2: 0 });
    const [timestamps, setTimestamps] = useState<string[]>([]);
    const [isTesting, setIsTesting] = useState(false);
    const [isTestComplete, setIsTestComplete] = useState(false);

    const handleButtonClick = async (type: 'P' | 'L', button: 'button1' | 'button2') => {
      const characteristic = type === 'P' ? proximityCharacteristic : lightCharacteristic;
      if (!characteristic) {
        console.error('La característica no está inicializada.');
        return;
      }
  
      try {
        setTimers((prev) => ({ ...prev, [button]: 10 }));
        await characteristic.startNotifications();
        setIsTesting(true);
        setIsTestComplete(false);
  
        const handleValueChange = (event: any) => {
          const value = event.target.value;
          const floatValue = value.getFloat32(0, true);

          if(type === 'P'){
            setProximityData(floatValue.toFixed(2));
          }else{
            setLightData(prev => [...prev, floatValue.toFixed(2)]);
          }
        };
  
        characteristic.addEventListener('characteristicvaluechanged', handleValueChange);
  
        // Esperar 10 segundos
        await new Promise((resolve) => setTimeout(resolve, 10000));
  
        await characteristic.stopNotifications();
        characteristic.removeEventListener('characteristicvaluechanged', handleValueChange);
        
        console.log('Notificaciones detenidas y valor congelado.');
        setIsTesting(false);
        setIsTestComplete(true);
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
    
    useEffect(() => {
      localStorage.removeItem('currentData');
      localStorage.removeItem('matrixData');
    }, []);



     const getProximityStyle = () => {
      const proximity = proximityData;
      if(proximityData === undefined || proximityData === 0){
        return { color: 'lightgray' };
      }
      return proximity < 30 || proximity > 50 ? { color: 'red' } : { color: 'black' };
     };

     const getLightStyle = () => {
      const light = lightData;
      if(lightData === undefined || lightData[0] === 0){
        return { color: 'lightgray' };
      }
      return light[0] < 20 || light[0] > 63 ? { color: 'red' } : { color: 'blue' };
     };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    GRAPH
                </div> 
                { server ? <div>
                    <div className="text-xl text-center mt-6 mb-4">
                    <p>
                      <strong>1)</strong> Press Test.
                    </p>
                    <p>
                      <strong>2)</strong> Press the  <strong><span className="text-yellow-500">Yellow</span> Button</strong> in the Device.
                    </p>
                </div>
                <button onClick={() => handleButtonClick('P', 'button1')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5" disabled={timers.button1 > 0}>TEST</button>
                <div className="bg-white borderrounded-md p-8 shadow-md w-80 mx-auto">
                    <p className="text-xl mt-2 text-center">
                      {timers.button1 > 0 ? `${timers.button1} Seconds Left` : ""}
                   </p>
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center text-gray-700" style={getProximityStyle()}>{`${proximityData || '0'}`}</div>
                    </div>
                    <div className="text-md text-black text-center mt-5">30 - 50 [cm]</div>
                </div>
                <div className="text-xl text-center mt-6 mb-4">
                <p>
                  <strong>1)</strong> Press Test.
                </p>
                <p>
                  <strong>2)</strong> Press the <strong><span className="text-red-500">Red</span> Button</strong> in the Device.
                </p>
                </div>
                <button onClick={() => handleButtonClick('L', 'button2')} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5" disabled={timers.button2 > 0}>TEST</button>
                <div className="bg-white borde rounded-md p-8 shadow-md w-80 mx-auto mb-5">
                   <p className="text-xl mt-2 text-center">
                      {timers.button2 > 0 ? `${timers.button2} Seconds left` : ""}
                   </p>
                    <RealTimeChart data={lightData} timestamps={timestamps} isTestComplete={isTestComplete}></RealTimeChart>
                </div>
                </div> : <div>
                <div className="text-xl text-center mt-6 mb-4">
                    Please Connect a <strong>Bluetooth</strong> Device in <strong>CONFIG</strong>.
                </div>
                </div> }
                
            </div>
            <div className="ml-2 mx-2 grid grid-cols-2"> 
                <BackButton/>
            </div>
        </div>
    )
}