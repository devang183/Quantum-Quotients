// HomeScreen.js
import React, {useEffect} from 'react';
import { View, Text, Button, ImageBackground, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import {fetchData, putData} from '../awsfunctions'

// import backgroundImage from '../assets/background.jpg';
// import fishImage from '../assets/fish.png';

const features = [
  {
    title: 'Temperature Control',
    subtitle: 'Monitor and control the temperature of your aquarium.',
    icon: 'thermometer',
  },
  {
    title: 'pH Control',
    subtitle: 'Maintain the optimal pH level for your fish.',
    icon: 'flask-outline',
  },
  {
    title: 'Food Feeding',
    subtitle: 'Set up feeding schedules for your fish.',
    icon: 'fast-food', // Different icon for food
  },
  {
    title: 'Water Level Control',
    subtitle: 'Keep track of and control the water level in your aquarium.',
    icon: 'water-outline', // Different icon for water
  },
];

// const addDataToDynamoDB = () => {
//   const timestamp = Date.now();
//   const userData = {
//     timestamp :  timestamp,
//     message_id : "ph",
//     value : "12"
//   }
  
//   // putData('IoT_Dynamo_DB' , userData)
//   responsedata =  fetchData('IoT_Dynamo_DB')
// }


function HomeScreen({ navigation }) {
    useEffect(() => {
      fetchData('IoT_Dynamo_DB')
    .then(data => {
        // Process the data
        console.log("ouput",data);
    })
    .catch(error => {
        // Handle errors
        console.error(error);
    });
        // const result = fetchData('IoT_Dynamo_DB')
        // console.log("output",result)
      },[])
  return (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/1600x900/?aquarium' }}
      style={{ flex: 1, justifyContent: 'center' }}
    >
    <ScrollView style={{ marginTop: 20 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Welcome to Aqua Culture!
        </Text>
        <ImageBackground source={{ uri: 'https://source.unsplash.com/1600x900/?aquarium' }} style={{ height: 200, marginBottom: 20 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>Your Beautiful Aquarium</Text>
          </View>
        </ImageBackground>
        <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
          Aqua Culture is your all-in-one solution for monitoring and caring for your aquarium.
        </Text>
        <Button
          title="View live data"
          onPress={() => navigation.navigate('Live Data')}
          buttonStyle={{ backgroundColor: '#3498db' }}
        />
        <Button
          title="View Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
          buttonStyle={{ backgroundColor: '#3498db' }}
        />
        {/* <Button
          title="Fetch Details"
          onPress={() => addDataToDynamoDB()}
          buttonStyle={{ backgroundColor: '#3498db' }}
        /> */}
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Key Features:</Text>
          {features.map((feature, index) => (
            <Card key={index} containerStyle={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={feature.icon} type="ionicon" color="#3498db" />
                <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{feature.title}</Text>
              </View>
              <Text style={{ marginTop: 10 }}>{feature.subtitle}</Text>
            </Card>
          ))}
       
      </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default HomeScreen;
