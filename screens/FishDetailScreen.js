// FishDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';
import { Input, Slider, Icon } from 'react-native-elements';
import {fetchData, putData} from '../awsfunctions'

const addDataToDynamoDB = (thisdata) => {
    const timestamp = Date.now();
    
    // Generate a random message ID
    const messageId = Math.random().toString(36).substr(2, 5); // Adjust the length as needed

    // Convert the JSON data to a string
    const jsonDataString = JSON.stringify(thisdata);

    const userData = {
        timestamp: timestamp,
        message_id: messageId,
        value: jsonDataString,
    };

    putData('IoT_Dynamo_DB', userData);
};

const generateRandomData = () => {
    const randomData = [];

    for (let i = 0; i < 20; i++) {
        // Generate a random message ID
        // const messageId = Math.random().toString(36).substr(2, 5);

        // Generate a timestamp with a datetime difference of every 6 hours
        const timestamp = Date.now() - i * 6 * 60 * 60 * 1000;

        // Generate random values for other fields
        const temperature = Math.random() * 100;
        const phLevel = Math.random() * 14;
        const foodLevel = Math.random() * 100;
        const waterLevel = Math.random() * 100;

        // Create the JSON data
        const jsonData = {
            // timestamp: timestamp,
            date: new Date(timestamp).toISOString(), // Add the date field
            // message_id: messageId,
            temperature: temperature,
            ph: phLevel,
            "food level": foodLevel,
            "water level": waterLevel,
        };

        // Add the JSON data to the array
        randomData.push(jsonData);
    }

    return randomData;
};
  
function FishDetailScreen() {
  const [temperature, setTemperature] = useState(25);
  const [phLevel, setPhLevel] = useState(7);
  const [foodLevel, setFoodLevel] = useState(50);
  const [waterLevel, setWaterLevel] = useState(70);

  const handleFeeding = () => {
    // Implement feeding logic here
    // setFoodLevel(foodLevel + 10);
    console.log("fishhhhh>>>>>>>>>.", temperature,phLevel, foodLevel, waterLevel)
    const randomData = generateRandomData();
    console.log("data....????/", randomData)
    // randomData.forEach(data => addDataToDynamoDB(data));
    // addDataToDynamoDB({"temperature": temperature,"ph":phLevel,"food level": foodLevel,"water level": waterLevel})
  };

  return (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/1600x900/?fish,water' }}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View style={{ padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Fish Detail Screen</Text>
        <Input
          label="Temperature"
          value={`${temperature} °C`}
          disabled
          inputStyle={{ color: '#333' }}
        />
        <Slider
          value={temperature}
          onValueChange={(value) => setTemperature(value)}
          minimumValue={0}
          maximumValue={40}
          step={1}
          thumbStyle={{ height: 15, width: 15, backgroundColor: '#3498db' }}
          thumbTintColor="#3498db"
        />
        <Input
          label="pH Level"
          value={`${phLevel}`}
          disabled
          inputStyle={{ color: '#333' }}
        />
        <Slider
          value={phLevel}
          onValueChange={(value) => setPhLevel(value)}
          minimumValue={0}
          maximumValue={14}
          step={0.1}
          thumbStyle={{ height: 15, width: 15, backgroundColor: '#2ecc71' }}
          thumbTintColor="#2ecc71"
        />
        <Input
          label="Food Level"
          value={`${foodLevel}%`}
          disabled
          inputStyle={{ color: '#333' }}
        />
        <Slider
          value={foodLevel}
          onValueChange={(value) => setFoodLevel(value)}
          minimumValue={0}
          maximumValue={100}
          step={1}
          thumbStyle={{ height: 15, width: 15, backgroundColor: 'yellow' }}
          thumbTintColor="yellow"
        />
        <Input
          label="Water Level"
          value={`${waterLevel}%`}
          disabled
          inputStyle={{ color: '#333' }}
        />
        <Slider
          value={waterLevel}
          onValueChange={(value) => setWaterLevel(value)}
          minimumValue={0}
          maximumValue={100}
          step={1}
          thumbStyle={{ height: 15, width: 15, backgroundColor: '#e74c3c' }}
          thumbTintColor="#e74c3c"
        />
        <Button
          title="Feed Fish"
          onPress={handleFeeding}
          buttonStyle={{ backgroundColor: '#3498db', marginTop: 20 }}
        />
      </View>
    </ImageBackground>
  );
}

export default FishDetailScreen;
