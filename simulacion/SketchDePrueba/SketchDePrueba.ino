int ledPin = 11;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
  delay(2000);
  digitalWrite(ledPin, LOW);
}

void loop() {
  if(Serial.available()){
    char command = Serial.read();

    if(command == 'A'){
      digitalWrite(ledPin, HIGH);
    }else if(command == 'B'){
      digitalWrite(ledPin, LOW);
    }
  }
}
