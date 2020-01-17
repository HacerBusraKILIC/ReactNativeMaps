/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'


const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0922;
const ASPECT_RATIO = width / height;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
      },
    };
  }



  async  componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log("Location Permission Granted")
        //alert("Location Permission Granted");
        Geolocation.getCurrentPosition(
          position => {
            this.setState({
              region: {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
              }
            });
          },
          (error) => Alert.alert('Error', JSON.stringify(error)),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = Geolocation.watchPosition(
          position => {
            this.setState({
              region: {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
              }
            });
          }
        );

      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      region: region,
      // If there are no new values set the current ones
      /*lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong*/
    });
  }

  onMapPress(e) {
    alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
    this.setState({
      marker: [{ coordinate: e.nativeEvent.coordinate }]
    })
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.00922 * ASPECT_RATIO,
      longitudeDelta: 0.00421 * ASPECT_RATIO,
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  render() {
    return (

        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            //initialRegion={this.state.region}
            showsUserLocation={true}
            /*onRegionChange={this.onRegionChange}
            onRegionChangeComplete={region => this.setState({ region })}*/
            onPress={this.onMapPress.bind(this)}
            loadingEnabled
            loadingIndicatorColor="#666666"
            loadingBackgroundColor="#eeeeee"
          >

            <MapView.Marker
              coordinate={this.state.region}
            />
          </MapView>

        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

/*const App: () => React$Node = () => {
  return (
    <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Header />
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Step One</Text>
                  <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}>App.js</Text> to change this
                    screen and then come back to see your edits.
              </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>See Your Changes</Text>
                  <Text style={styles.sectionDescription}>
                    <ReloadInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Debug</Text>
                  <Text style={styles.sectionDescription}>
                    <DebugInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Learn More</Text>
                  <Text style={styles.sectionDescription}>
                    Read the docs to discover what to do next:
              </Text>
                </View>
                <LearnMoreLinks />
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
        );
      };

const styles = StyleSheet.create({
          scrollView: {
          backgroundColor: Colors.lighter,
      },
  engine: {
          position: 'absolute',
        right: 0,
      },
  body: {
          backgroundColor: Colors.white,
      },
  sectionContainer: {
          marginTop: 32,
        paddingHorizontal: 24,
      },
  sectionTitle: {
          fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
      },
  sectionDescription: {
          marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
      },
  highlight: {
          fontWeight: '700',
      },
  footer: {
          color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
      },
    });

    export default App;*/
