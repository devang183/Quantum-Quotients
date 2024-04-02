import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchData } from '../awsfunctions'; // Assuming fetchData is imported correctly

const DynamoDBScreen = () => {
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    fetchData('IoT_Dynamo_DB')
      .then(response => {
        const sortedData = response.Items.sort((a, b) => b.message_id - a.message_id);
        setData(sortedData);
      })
      .catch(error => {
        console.error(error);
      });

    const intervalId = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
      fetchDataAndUpdateState();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchDataAndUpdateState = () => {
    fetchData('IoT_Dynamo_DB')
      .then(response => {
        const sortedData = response.Items.sort((a, b) => b.message_id - a.message_id);
        setData(sortedData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleZoomIn = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel + 1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(prevZoomLevel => prevZoomLevel - 1);
    }
  };

  const renderPhChart = () => {
    const validPhData = data && data.slice(0, 30).map(item => {
      if (item.value && typeof item.value === 'object' && item.value.pH) {
        return parseFloat(item.value.pH);
      }
      return null;
    }).filter(item => item !== null);

    if (!validPhData || validPhData.length === 0) {
      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>pH Chart</Text>
          <Text style={styles.noDataText}>No pH data available</Text>
        </View>
      );
    }

    const chartData = {
      labels: Array.from({ length: validPhData.length }, (_, i) => i + 1),
      datasets: [
        {
          data: validPhData,
        },
      ],
    };

    return (
      <ScrollView horizontal>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>pH Chart</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width * zoomLevel}
            height={220}
            chartConfig={chartConfigPh}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    );
  };

  const renderTdsChart = () => {
    const validTdsData = data && data.slice(0, 30).map(item => {
      if (item.value && typeof item.value === 'object' && item.value.TDS) {
        return parseFloat(item.value.TDS);
      }
      return null;
    }).filter(item => item !== null);

    if (!validTdsData || validTdsData.length === 0) {
      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>TDS Chart</Text>
          <Text style={styles.noDataText}>No TDS data available</Text>
        </View>
      );
    }

    const chartData = {
      labels: Array.from({ length: validTdsData.length }, (_, i) => i + 1),
      datasets: [
        {
          data: validTdsData,
        },
      ],
    };

    return (
      <ScrollView horizontal>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>TDS Chart</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width * zoomLevel}
            height={220}
            chartConfig={chartConfigTds}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Aquarium Data</Text>
      <Text style={styles.counter}>Latest Data for pH and TDS</Text>
      {data && data.slice(0, 1).map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {item.value && typeof item.value === 'object' ? (
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>Message ID: {item.message_id}</Text>
              <Text style={styles.valueText}>pH: {item.value.pH}</Text>
              <Text style={styles.valueText}>TDS: {item.value.TDS}</Text>
            </View>
          ) : item.value && typeof item.value === 'string' ? (
            <Text style={styles.valueText}>{item.value}</Text>
          ) : (
            <Text style={styles.valueText}>Value is null</Text>
          )}
        </View>
      ))}
       
      {renderPhChart()}
      {renderTdsChart()}
      <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
        <Text style={styles.zoomText}>Zoom In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
        <Text style={styles.zoomText}>Zoom Out</Text>
      </TouchableOpacity>  
    </ScrollView>
  );
};

const chartConfigPh = {
  backgroundGradientFrom: '#FF6347', // Tomato color
  backgroundGradientTo: '#FF6347', // Tomato color
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text color
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White label color
  style: {
    borderRadius: 16,
  },
};

const chartConfigTds = {
  backgroundGradientFrom: '#87CEEB', // Sky blue color
  backgroundGradientTo: '#87CEEB', // Sky blue color
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text color
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White label color
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray background color
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark text color
  },
  counter: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666', // Medium gray text color
  },
  itemContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  valueContainer: {
    marginBottom: 10,
  },
  valueText: {
    fontSize: 16,
    color: '#333', // Dark text color
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 20,
    // alignItems: 'center',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark text color
  },
  noDataText: {
    fontSize: 16,
    color: '#888', // Gray text color
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  zoomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50', // Green color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  zoomText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DynamoDBScreen;
