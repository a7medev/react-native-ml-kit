import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ListTile from './ListTile';
import type {ParamList} from '../App';

const HomeScreen = ({navigation}: NativeStackScreenProps<ParamList>) => {
  return (
    <View>
      <Text style={styles.title}>React Native ML Kit</Text>

      <ListTile
        title="Text Recognition"
        onPress={() => navigation.navigate('TextRecognition')}
      />
      <ListTile
        title="Barcode Scanning"
        onPress={() => navigation.navigate('BarcodeScanning')}
      />
      <ListTile
        title="Face Detection"
        onPress={() => navigation.navigate('FaceDetection')}
      />
      <ListTile
        title="Image Labeling"
        onPress={() => navigation.navigate('ImageLabeling')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    margin: 20,
  },
});

export default HomeScreen;
