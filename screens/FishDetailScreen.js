// FishDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';
import { Input, Slider, Icon } from 'react-native-elements';

function FishDetailScreen() {
  const [temperature, setTemperature] = useState(25);
  const [phLevel, setPhLevel] = useState(7);
  const [foodLevel, setFoodLevel] = useState(50);
  const [waterLevel, setWaterLevel] = useState(70);

  const handleFeeding = () => {
    // Implement feeding logic here
    setFoodLevel(foodLevel + 10);
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
          value={waterLevel}
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
