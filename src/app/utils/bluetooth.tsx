export async function connectToBluetoothDevice(): Promise<boolean> {
    try {
      const device = await navigator.bluetooth.requestDevice({
        // Filtros y opciones de dispositivos
        acceptAllDevices: true
      });
  
      const server = await device.gatt?.connect();
      if (server) {
        return true;
      }
    } catch (error) {
      
    }
    return false;
}