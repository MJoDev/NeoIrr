"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface BluetoothContextProps {
  device: BluetoothDevice | null;
  server: BluetoothRemoteGATTServer | null;
  proximityCharacteristic: BluetoothRemoteGATTCharacteristic | null;
  lightCharacteristic: BluetoothRemoteGATTCharacteristic | null;
  setDevice: (device: BluetoothDevice) => void;
  setServer: (server: BluetoothRemoteGATTServer) => void;
}

const BluetoothContext = createContext<BluetoothContextProps | undefined>(undefined);

interface BluetoothProviderProps {
  children: ReactNode;
}

export const BluetoothProvider: React.FC<BluetoothProviderProps> = ({ children }) => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);
  const [proximityCharacteristic, setProximityCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);
  const [lightCharacteristic, setLightCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);

  const initializeCharacteristics = useCallback(async () => {
    if (!server) {
      console.error('El servidor GATT no está disponible.');
      return;
    }

    try {
      const service = await server.getPrimaryService('12345678-1234-5678-1234-56789abcdef0');
      const proximity = await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef1');
      const light = await service.getCharacteristic('12345678-1234-5678-1234-56789abcdef2');

      setProximityCharacteristic(proximity);
      setLightCharacteristic(light);

      console.log('Características inicializadas correctamente.');
    } catch (error) {
      console.error('Error inicializando características:', error);
    }
  }, [server]);

  useEffect(() => {
    if (!server) return;

    initializeCharacteristics();
  }, [server, initializeCharacteristics]);

  return (
    <BluetoothContext.Provider
      value={{
        device,
        server,
        proximityCharacteristic,
        lightCharacteristic,
        setDevice,
        setServer,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  if (!context) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  return context;
};
