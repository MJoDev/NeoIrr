
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

```bash
    #include <BLEPeripheral.h>

    BLEPeripheral blePeripheral;
    BLEService sensorService("181A"); // Environmental Sensing
    BLECharacteristic proximityCharacteristic("2A19", BLENotify, 2);
    BLECharacteristic lightCharacteristic("2A1C", BLENotify, 2);

    const int proximitySensorPin = A0;
    const int lightSensorPin = A1;
    const int buttonPin = 2;

    void setup() {
    pinMode(proximitySensorPin, INPUT);
    pinMode(lightSensorPin, INPUT);
    pinMode(buttonPin, INPUT_PULLUP);
    
    blePeripheral.setLocalName("SensorDevice");
    blePeripheral.setAdvertisedServiceUuid(sensorService.uuid());
    blePeripheral.addAttribute(sensorService);
    blePeripheral.addAttribute(proximityCharacteristic);
    blePeripheral.addAttribute(lightCharacteristic);

    blePeripheral.begin();
    }

    void loop() {
    blePeripheral.poll();

    if (digitalRead(buttonPin) == LOW) {
        int proximityValue = analogRead(proximitySensorPin);
        int lightValue = analogRead(lightSensorPin);
        
        proximityCharacteristic.setValue(proximityValue);
        lightCharacteristic.setValue(lightValue);
        
        delay(500); // Debounce
    }
    }
```


