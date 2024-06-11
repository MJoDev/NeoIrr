"use client"

export default function Page() {

    async function requestBluetoothDevice() {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true, // Accept all devices
                optionalServices: ['battery_service'] // Specify optional services
            });
            console.log('Device selected:', device);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <button className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5" onClick={requestBluetoothDevice}></button>
        </div>
    );
}