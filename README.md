
## Primeros pasos

Para correr el proyecto en fase Dev:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abrir (https://localhost:3000) en el navegador para conseguir la pagina.

## Arduino

En el código Arduino, se deben definir los servicios y características que el dispositivo BLE ofrece.
Si se usa un BLE compatible se debe definir y encontrar los UUIDs de los servicios y características en la documentación del módulo o en el código del firmware que estás utilizando.

El bluetooth esta configurado para aceptar solo dispositivos con el filtro de servicios disponibles "12345678-1234-5678-1234-56789abcdef0".

El servicio de los sensores deberia llamarse "12345678-1234-5678-1234-56789abcdef0" (Se puede cambiar en el codigo de config a preferencia) Mientras que la caracteristica de proximidad "12345678-1234-5678-1234-56789abcdef1" y la caracteristica de luz "12345678-1234-5678-1234-56789abcdef2". Como se ve en el código de abajo:

```bash
#include <BLEPeripheral.h>

BLEPeripheral blePeripheral;
BLEService sensorService("12345678-1234-5678-1234-56789abcdef0"); // UUID de 128 bits del servicio de sensores

// Características de proximidad y luz
BLECharacteristic proximityCharacteristic("12345678-1234-5678-1234-56789abcdef1", BLENotify, 2);
BLECharacteristic lightCharacteristic("12345678-1234-5678-1234-56789abcdef2", BLENotify, 2);

const int proximitySensorPin = A0;  // Pin del sensor de proximidad
const int lightSensorPin = A1;      // Pin del sensor de luz
const int proximityButtonPin = 2;   // Pin del botón de proximidad
const int lightButtonPin = 3;       // Pin del botón de luz

void setup() {
  pinMode(proximitySensorPin, INPUT);
  pinMode(lightSensorPin, INPUT);
  pinMode(proximityButtonPin, INPUT_PULLUP);
  pinMode(lightButtonPin, INPUT_PULLUP);
  
  // Configuración BLE
  blePeripheral.setLocalName("SensorDevice");
  blePeripheral.setAdvertisedServiceUuid(sensorService.uuid());
  blePeripheral.addAttribute(sensorService);
  blePeripheral.addAttribute(proximityCharacteristic);
  blePeripheral.addAttribute(lightCharacteristic);

  blePeripheral.begin();
  Serial.begin(9600);   
}

void loop() {
  blePeripheral.poll();

  if (digitalRead(proximityButtonPin) == LOW) {
    int proximityValue = analogRead(proximitySensorPin);
    proximityCharacteristic.setValue(proximityValue);
    Serial.print("Proximity: ");
    Serial.println(proximityValue);
    delay(500);  // Debounce del botón
  }

  if (digitalRead(lightButtonPin) == LOW) {
    int lightValue = analogRead(lightSensorPin);
    lightCharacteristic.setValue(lightValue);
    Serial.print("Light: ");
    Serial.println(lightValue);
    delay(500);  // Debounce del botón
  }
}
```
V1


