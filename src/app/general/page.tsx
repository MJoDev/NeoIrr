"use client"
import BackButton from "../components/BackButton/BackButton";
import RecordButton from "../components/RecordButton/RecordButton";
import { useBluetooth } from "../utils/BluetoothContext";

export default function GeneralPage() {

    const { server } = useBluetooth();
    
    const sendCommandToDevice = async () => {
        if (server) {
          try {
            const service = await server.getPrimaryService('');
            const characteristic = await service.getCharacteristic('');
            await characteristic.writeValue(new TextEncoder().encode(''));
          } catch (error) {
            console.error('Error sending command to the device:', error);
          }
        }
      };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10">
                    GENERAL
                </div> 
                { server ? <div>
                    <div className="text-xl text-center mt-6 mb-4">
                    Press the Yellow Button in the device
                </div>
                <button onClick={sendCommandToDevice} className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                <div className="bg-white border border-gray-400 rounded-md p-8 shadow-md w-80 mx-auto">
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center">0<div className="text-sm text-gray-500">REF: 10-40 CM</div></div>
                    </div>
                </div>
                <div className="text-xl text-center mt-6 mb-4">
                    Press the Red Button in the device
                </div>
                <button className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                <div className="bg-white border border-gray-400 rounded-md p-8 shadow-md w-80 mx-auto mb-5">
                    <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                        <div className="text-6xl font-bold text-center">0 <div className="text-sm text-gray-500">REF: 40 - 63 [uW/cm2/nm]</div></div>
                    </div>
                </div>
                </div> : <div>
                <div className="text-xl text-center mt-6 mb-4">
                    Please Connect a Bluetooth Device in Config.
                </div>
                </div> }
                
            </div>
            <div className="ml-2 mx-2 grid grid-cols-2"> 
                <RecordButton/>
                <BackButton/>
            </div>
        </div>
    )
}