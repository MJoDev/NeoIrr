"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface BluetoothContextProps {
  device: BluetoothDevice | null;
  server: BluetoothRemoteGATTServer | null;
  setDevice: (device: BluetoothDevice) => void;
  setServer: (server: BluetoothRemoteGATTServer) => void | undefined;
}

const BluetoothContext = createContext<BluetoothContextProps | undefined>(undefined);

interface BluetoothProviderProps {
  children: ReactNode;
}

export const BluetoothProvider: React.FC<BluetoothProviderProps> = ({ children }) => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);

  return (
    <BluetoothContext.Provider value={{ device, server, setDevice, setServer }}>
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