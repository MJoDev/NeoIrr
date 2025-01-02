const bleno = require('bleno');

const SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
const CHARACTERISTIC_UUID = '87654321-4321-4321-4321-cba987654321';

const Characteristic = bleno.Characteristic;
const service = new bleno.PrimaryService({
  uuid: SERVICE_UUID,
  characteristics: [
    new Characteristic({
      uuid: CHARACTERISTIC_UUID,
      properties: ['read', 'write'],
      value: null,
      onReadRequest: (offset, callback) => {
        console.log('Read request received');
        callback(Characteristic.RESULT_SUCCESS, Buffer.from('Hello BLE!'));
      },
      onWriteRequest: (data, offset, withoutResponse, callback) => {
        console.log('Write request received:', data.toString());
        callback(Characteristic.RESULT_SUCCESS);
      },
    }),
  ],
});

bleno.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    bleno.startAdvertising('MyBLEDevice', [SERVICE_UUID]);
    console.log('Advertising...');
  } else {
    bleno.stopAdvertising();
    console.log('Stopped advertising');
  }
});

bleno.on('advertisingStart', (error) => {
  if (!error) {
    bleno.setServices([service]);
    console.log('Services set');
  }
});

// Mantener la aplicación en ejecución
setInterval(() => {
  // Este intervalo mantiene el proceso activo
}, 1000);