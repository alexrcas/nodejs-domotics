#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>

const char* ssid = "Red Wifi A_2";             //Set your wifi network name(ssid)
const char* password = "Turing0906";                //Set your router password
String msg;
int state;
WiFiServer server(80);
WiFiClient raspy;
const char *host = "192.168.0.4";
const int port = 3000;



void setup() {
  Serial.begin(9600); //change according to your com port baud rate
  delay(10);


  pinMode(LED_BUILTIN, OUTPUT);

  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  // Start the server
  server.begin();
  Serial.println("Server started");

  // Print the IP address
  Serial.print("Use this URL : ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");

  
  String url = "/handshake";
  String request = String("GET ") + url + "?" + "ip=" + WiFi.localIP().toString() + "&MAC=" + WiFi.macAddress() + "  HTTP/1.1\r\n" +
  "Host: " + host + ":" + port  +"\r\n" +
  "Connection: close\r\n\r\n";
  
  Serial.println("Intentando conectar...\n");
  if (raspy.connect(host, port)) {
    Serial.println(request);
    raspy.print(request);

    
  }
  else {
    Serial.println("Fallo!");
  }

}

void loop() {
  
  // Check for an active client
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  // Wait until client responds
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }

  // Read client request
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();

  // Match the request
  
  if (request.indexOf("/Relay=ON") != -1) {
    digitalWrite(LED_BUILTIN, LOW);
    state = 1;
    msg = state;
  }
  if (request.indexOf("/Relay=OFF") != -1){
    digitalWrite(LED_BUILTIN, HIGH);
    state = 0;
    msg = state;
  }

  if (request.indexOf("/Toggle") != -1) {
    if (state == 0) {
      digitalWrite(LED_BUILTIN, LOW);
      state = 1;
    }
    else {
      digitalWrite(LED_BUILTIN, HIGH);
      state = 0;
    }
    msg = state;
  }

  if (request.indexOf("/Status") != -1) {
    Serial.println("DigitalRead: ");
    Serial.println(digitalRead(LED_BUILTIN));
    msg = !(digitalRead(LED_BUILTIN));
  }

  // Return the client response
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println(""); //  do not forget this one
  
  client.println(msg);

  delay(1);
  Serial.println("Client disconnected");
  Serial.println("");

}
