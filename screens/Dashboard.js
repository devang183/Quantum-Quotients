import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Table, Row, Rows } from 'react-native-table-component';
import { fetchData, putData } from '../awsfunctions';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1',
  secretAccessKey: '4QlDlQRa1RARe/3Fbx8hVD9HtI5D60s0RbQkQn33',
  accessKeyId: 'AKIAVRUVWLO6VMCVEZWN',
});

// const docClient = new AWS.DynamoDB.DocumentClient({
//     region: 'eu-west-1',
//     secretAccessKey: '4QlDlQRa1RARe/3Fbx8hVD9HtI5D60s0RbQkQn33',
//     accessKeyId: 'AKIAVRUVWLO6VMCVEZWN',
// });
const docClient = new AWS.DynamoDB.DocumentClient();


const DashboardScreen = () => {
    const [thisData, setThisData] = useState([]);
    const [tableHead, setTableHead] = useState(['Date', 'Temperature (°C)', 'pH', 'Water Level']);
    const [tableData, setTableData] = useState([]);

    const data1 = {
        "Items": [
            {
                "value": "{\"date\":\"2024-02-24T04:23:31.818Z\",\"temperature\":63.514567857852654,\"ph\":11.355601771672614,\"food level\":75.27191255064484,\"water level\":67.581339277443}",
                "message_id": "be050",
                "timestamp": 1709051011845
            },
            {
                "value": "{\"date\":\"2024-02-23T04:23:31.818Z\",\"temperature\":1.0416900588084976,\"ph\":13.862503205015859,\"food level\":60.739281439665426,\"water level\":44.34919410459808}",
                "message_id": "gt1s6",
                "timestamp": 1709051011849
            },
            {
                "value": "{\"date\":\"2024-02-26T22:23:31.817Z\",\"temperature\":90.2598373587076,\"ph\":12.830298734990963,\"food level\":75.05296234420105,\"water level\":5.068792695093305}",
                "message_id": "07g2z",
                "timestamp": 1709051011831
            },
            {
                "value": "{\"date\":\"2024-02-25T22:23:31.817Z\",\"temperature\":18.14598212659122,\"ph\":8.31028295870005,\"food level\":47.24162525701616,\"water level\":61.460190374624666}",
                "message_id": "l15a3",
                "timestamp": 1709051011836
            },
            {
                "value": "{\"date\":\"2024-02-24T16:23:31.818Z\",\"temperature\":19.956739751331874,\"ph\":2.7340606526026456,\"food level\":94.74737571544871,\"water level\":93.76603604646851}",
                "message_id": "0ztun",
                "timestamp": 1709051011842
            },
            {
                "value": "{\"date\":\"2024-02-24T22:23:31.817Z\",\"temperature\":50.3975224903243,\"ph\":7.828222914292615,\"food level\":24.443366411050228,\"water level\":65.35768615553579}",
                "message_id": "bicn3",
                "timestamp": 1709051011841
            },
            {
                "value": "{\"date\":\"2024-02-22T22:23:31.818Z\",\"temperature\":64.95066046205523,\"ph\":12.168199123054752,\"food level\":79.36095837190445,\"water level\":12.832465276190398}",
                "message_id": "ysz73",
                "timestamp": 1709051011850
            },
            {
                "value": "{\"date\":\"2024-02-27T16:23:31.817Z\",\"temperature\":31.363202024280312,\"ph\":7.333730346905541,\"food level\":16.38622282238884,\"water level\":27.09470888157497}",
                "message_id": "7g2nt",
                "timestamp": 1709051011818
            },
            {
                "value": "{\"date\":\"2024-02-27T04:23:31.817Z\",\"temperature\":7.794788869333202,\"ph\":1.5159700224721195,\"food level\":5.584214406975607,\"water level\":2.597576429834514}",
                "message_id": "ax08m",
                "timestamp": 1709051011829
            },
            {
                "value": "{\"date\":\"2024-02-25T10:23:31.817Z\",\"temperature\":60.74276123125628,\"ph\":5.260866769786489,\"food level\":67.75185273783772,\"water level\":35.852594233297076}",
                "message_id": "d7nap",
                "timestamp": 1709051011839
            },
            {
                "value": "{\"date\":\"2024-02-25T04:23:31.817Z\",\"temperature\":37.9923056802638,\"ph\":0.897649329294683,\"food level\":85.37653292164629,\"water level\":75.75495294676837}",
                "message_id": "4qf6u",
                "timestamp": 1709051011840
            },
            {
                "value": "{\"date\":\"2024-02-26T10:23:31.817Z\",\"temperature\":90.02386417420809,\"ph\":10.89795654774157,\"food level\":46.20676448010816,\"water level\":75.85108816300084}",
                "message_id": "ndrwo",
                "timestamp": 1709051011833
            },
            {
                "value": "{\"date\":\"2024-02-26T16:23:31.817Z\",\"temperature\":10.261903266300054,\"ph\":12.506699709564051,\"food level\":80.52814234143526,\"water level\":22.706247154491766}",
                "message_id": "qnnv5",
                "timestamp": 1709051011832
            },
            {
                "value": "{\"date\":\"2024-02-27T10:23:31.817Z\",\"temperature\":78.54675826279669,\"ph\":5.5456524792010295,\"food level\":13.102430755864436,\"water level\":47.711101118854614}",
                "message_id": "t8sqo",
                "timestamp": 1709051011828
            },
            {
                "value": "{\"date\":\"2024-02-23T16:23:31.818Z\",\"temperature\":95.09052597603456,\"ph\":0.6025733024654776,\"food level\":30.677112512567085,\"water level\":30.103874607622295}",
                "message_id": "uz33e",
                "timestamp": 1709051011847
            },
            {
                "value": "{\"date\":\"2024-02-26T04:23:31.817Z\",\"temperature\":84.74294452874784,\"ph\":5.021385378541099,\"food level\":30.200061874228545,\"water level\":17.88938321802518}",
                "message_id": "vi8rj",
                "timestamp": 1709051011835
            },
            {
                "value": "{\"date\":\"2024-02-25T16:23:31.817Z\",\"temperature\":16.880509935518283,\"ph\":12.70753111289029,\"food level\":47.20164219570211,\"water level\":76.41427903822743}",
                "message_id": "vo0f3",
                "timestamp": 1709051011837
            },
            {
                "value": "{\"date\":\"2024-02-23T10:23:31.818Z\",\"temperature\":13.705636586801173,\"ph\":10.16543767538014,\"food level\":47.09017139297449,\"water level\":19.353436720809558}",
                "message_id": "ft2fi",
                "timestamp": 1709051011848
            },
            {
                "value": "{\"date\":\"2024-02-23T22:23:31.818Z\",\"temperature\":9.015112865786602,\"ph\":5.161865293235395,\"food level\":85.7785293309893,\"water level\":31.581113728317355}",
                "message_id": "t8897",
                "timestamp": 1709051011846
            },
            {
                "value": "{\"date\":\"2024-02-24T10:23:31.818Z\",\"temperature\":54.071742711555196,\"ph\":8.062414019662011,\"food level\":3.7118323383085183,\"water level\":70.99648933760167}",
                "message_id": "81kkk",
                "timestamp": 1709051011844
            }
        ],
        "Count": 21,
        "ScannedCount": 21
    }
    const fetchDataFromDynamoDB = (tableName) => {
        var params = {
            TableName: tableName,
        };

        docClient.get(params, (err, result) => {
          if (err) {
            console.error('Error reading item:', err);
          } else {
            console.log('GetItem succeeded:', result);
                setThisData(items);
      }
        });
        // docClient.scan(params, function (err, data) {
        //     if (!err) {
        //         const items = data1.Items.map((item) => parseDataToJson(item));
        //         setThisData(items);

        //         console.log("items>>>", items)
        //         updateTableData(items);
        //     }
        // });
    };

    const getTabledata = (items) => {
        const data = items.map((item) => [
          formatDateString(item.date),
          item.temperature.toFixed(1),
          item.ph.toFixed(1),
          item['water level'].toFixed(1),
        ]);
        return data;
      };
    
      const renderTemperatureChart = () => {
        const validData = data1.Items.map((item) => {
          try {
            const parsedValue = JSON.parse(item.value);
            return { ...parsedValue, timestamp: item.timestamp, message_id: item.message_id };
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
          }
        }).filter((item) => item && typeof item.temperature === 'number');
    
        if (validData.length === 0) {
          console.warn('No valid temperature data available. Data:', data1.Items);
          return (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>No valid temperature data available.</Text>
            </View>
          );
        }
    
        const data = {
            labels: validData.map((item, index) => {
                const formattedDate = formatDateString(item.date);
                if (!formattedDate) {
                    console.warn('Invalid date format:', item.date);
                }
    
                // Display every 4th label to reduce clutter
                if (index % 4 === 0) {
                    return formattedDate;
                } else {
                    return '';
                }
            }),
            datasets: [
                {
                    data: validData.map((item) => {
                        const parsedTemperature = parseFloat(item.temperature);
                        if (isNaN(parsedTemperature)) {
                            console.warn('Invalid temperature value:', item.temperature);
                            return 0; // Set an alternative value or handle as needed
                        }
                        return parsedTemperature;
                    }),
                },
            ],
        };
    
        return (
            <ScrollView horizontal={true}>
                <LineChart
                    data={data}
                    width={screenWidth * 2}
                    height={220}
                    yAxisSuffix="°C"
                    chartConfig={chartConfigTemperature}
                    bezier
                    xLabelsOffset={-10} // Adjust the offset if needed
                    onDataPointClick={({ index }) => console.log(index)} // Handle click events if needed
                />
            </ScrollView>
        );
      };
    
      const renderPhChart = () => {
        const validData = data1.Items.map((item) => {
          try {
            const parsedValue = JSON.parse(item.value);
            return { ...parsedValue, timestamp: item.timestamp, message_id: item.message_id };
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
          }
        }).filter((item) => item && typeof item.ph === 'number');
      
        if (validData.length === 0) {
          console.warn('No valid pH level data available. Data:', data1.Items);
          return (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>No valid pH level data available.</Text>
            </View>
          );
        }
      
        const data = {
            labels: validData.map((item, index) => {
                const formattedDate = formatDateString(item.date);
                if (!formattedDate) {
                    console.warn('Invalid date format:', item.date);
                }
    
                // Display every 4th label to reduce clutter
                if (index % 4 === 0) {
                    return formattedDate;
                } else {
                    return '';
                }
            }),
            datasets: [
                {
                    data: validData.map((item) => {
                        const parsedPh = parseFloat(item.ph);
                        if (isNaN(parsedPh)) {
                            console.warn('Invalid pH value:', item.ph);
                            return 0; // Set an alternative value or handle as needed
                        }
                        return parsedPh;
                    }),
                },
            ],
        };
    
        return (
            <ScrollView horizontal={true}>
                <LineChart
                    data={data}
                    width={screenWidth*2}
                    height={220}
                    yAxisSuffix="pH"
                    chartConfig={chartConfigPh}
                    bezier
                    xLabelsOffset={-10} // Adjust the offset if needed
                    onDataPointClick={({ index }) => console.log(index)} // Handle click events if needed
                />
            </ScrollView>
        );
      };
      
      const renderWaterChart = () => {
        const validData = data1.Items.map((item) => {
          try {
            const parsedValue = JSON.parse(item.value);
            return { ...parsedValue, timestamp: item.timestamp, message_id: item.message_id };
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
          }
        }).filter((item) => item && typeof item['water level'] === 'number');
      
        if (validData.length === 0) {
          console.warn('No valid water level data available. Data:', data1.Items);
          return (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>No valid water level data available.</Text>
            </View>
          );
        }
      
        const data = {
            labels: validData.map((item, index) => {
                const formattedDate = formatDateString(item.date);
                if (!formattedDate) {
                    console.warn('Invalid date format:', item.date);
                }
    
                // Display every 4th label to reduce clutter
                if (index % 4 === 0) {
                    return formattedDate;
                } else {
                    return '';
                }
            }),
            datasets: [
                {
                    data: validData.map((item) => {
                        const parsedWaterLevel = parseFloat(item['water level']);
                        if (isNaN(parsedWaterLevel)) {
                            console.warn('Invalid water level value:', item['water level']);
                            return 0; // Set an alternative value or handle as needed
                        }
                        return parsedWaterLevel;
                    }),
                },
            ],
        };
    
        return (
            <ScrollView horizontal={true}>
                <LineChart
                    data={data}
                    width={screenWidth*2}
                    height={220}
                    yAxisSuffix="%"
                    chartConfig={chartConfigWater}
                    bezier
                    xLabelsOffset={-10} // Adjust the offset if needed
                    onDataPointClick={({ index }) => console.log(index)} // Handle click events if needed
                />
            </ScrollView>
        );
      };
      
      useEffect(() => {
        fetchDataFromDynamoDB('IoT_Dynamo_DB');
      }, []);
    
      const parseDataToJson = (item) => {
        try {
          const parsedValue = JSON.parse(item.value);
          return { ...parsedValue, timestamp: item.timestamp, message_id: item.message_id };
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return null;
        }
      };
    
      const formatDateString = (dateString) => {
        try {
          const date = new Date(dateString);
          return date.toLocaleString(); // Adjust the format according to your needs
        } catch (error) {
          console.error('Error formatting date:', error);
          return '';
        }
      };
    
      const renderItem = ({ item }) => {
        const parsedData = parseDataToJson(item);
    
        if (!parsedData) {
          return null; // Skip rendering if JSON parsing fails
        }
    
        return (
          <View style={styles.card}>
            <Text style={styles.cardText}>{parsedData.date}</Text>
            <Text style={styles.cardText}>Temperature: {parsedData.temperature.toFixed(1)} °C</Text>
            <Text style={styles.cardText}>pH: {parsedData.ph.toFixed(1)}</Text>
            <Text style={styles.cardText}>Food Level: {parsedData['food level'].toFixed(1)}</Text>
            <Text style={styles.cardText}>Water Level: {parsedData['water level'].toFixed(1)}</Text>
          </View>
        );
      };
    
      return (
        <ScrollView>
        <View style={styles.container}>
          {data1 && (
            <>
              <Text style={styles.header}>Fish Monitoring Dashboard</Text>

              <Text style={styles.chartTitle}>Temperature Chart</Text>
              {renderTemperatureChart()}

              <Text style={styles.chartTitle}>pH Level Chart</Text>
              {renderPhChart()}

              <Text style={styles.chartTitle}>Water Level Chart</Text>
              {renderWaterChart()}
            <ScrollView>
              <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                  <Rows data={getTabledata(data1.Items.map((item) => parseDataToJson(item)))} textStyle={styles.text} />
                </Table>
              </View>
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>
      );
    };
    
    const screenWidth = Dimensions.get('window').width;
    
    const chartConfigTemperature = {
        backgroundGradientFrom: '#FF6347', // Tomato color
        backgroundGradientTo: '#FF6347', // Tomato color
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text color
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White label color
        style: {
            borderRadius: 16,
        },
    };

    const chartConfigPh = {
        backgroundGradientFrom: '#66CDAA', // MediumAquamarine color
        backgroundGradientTo: '#66CDAA', // MediumAquamarine color
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text color
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White label color
        style: {
            borderRadius: 16,
        },
    };

    const chartConfigWater = {
        backgroundGradientFrom: '#87CEEB', // Sky blue color
        backgroundGradientTo: '#87CEEB', // Sky blue color
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text color
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White label color
        style: {
            borderRadius: 16,
        },
    };
    
      const styles = StyleSheet.create({
        background: {
          flex: 1,
        },
        backgroundImage: {
          flex: 1,
          resizeMode: 'cover', // or 'stretch' or 'contain'
        },
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          borderRadius: 16,
          margin: 16,
          marginTop: 32,
        },
        header: {
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#3498db', // Dodger blue text color
//   textAlign: 'center', // Center align the text
//   textTransform: 'uppercase', // Uppercase text
  letterSpacing: 1, // Add a slight letter spacing
  shadowColor: '#555',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
},

        chartPlaceholder: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 32,
        },
        chartPlaceholderText: {
          fontSize: 18,
          color: '#555', // Medium gray text color
        },
        card: {
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        cardText: {
          fontSize: 16,
          marginBottom: 8,
          color: '#333', // Dark text color
        },
        head: {
          height: 40,
          backgroundColor: '#87CEEB', // Sky blue header color
        },
        text: {
          margin: 6,
          color: '#333', // Dark text color
        },
         chartSeparator: {
        marginVertical: 20, // Adjust the space between charts as needed
    },

    tableContainer: {
        marginTop: 20, // Add space between charts and the table
        marginBottom: 20, // Add space between charts and the table
        maxHeight: 300, // Set a max height for better responsiveness
    },
      });
      
      
      export default DashboardScreen;