"use client";

import BackButton from "../components/BackButton/BackButton";
import StatusFailed from "../components/StatusFailed/StatusFailed";
import StatusOK from "../components/StatusOK/StatusOK";
import { useState } from "react";
import "./style.css";
import { connectToBluetoothDevice } from "../utils/bluetooth";
import BluetoothIcon from "../utils/icons/bluetoothIcon";
 
export default function ConfigPage() {

    const [ isDeviceConnected, setIsDeviceConnected ] = useState(false);
    const [ error, setError] = useState(false);

    const checkBluetoothConnection = async () => {
        setError(false) // Reset error state
        const isConnected = await connectToBluetoothDevice();
        if (isConnected) {
          setIsDeviceConnected(true);
        } else {
          setError(true);
        }
      };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10">
                    CONFIG
                </div> 
                <div className="text-xl text-center mt-6">
                    Press the blue Button in the device and then press the "Connect" Button below
                </div> 
                <button onClick={checkBluetoothConnection} className="check flex">Connect <BluetoothIcon className="w-6 h-6"/></button>
                {isDeviceConnected && <StatusOK></StatusOK>} 
                {error && <StatusFailed></StatusFailed>}
            </div>
            <div className="ml-2 mx-2">    
                <BackButton/>
            </div>
        </div>
        );

}

