import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TextRecognitionScreen from './text-recognition/TextRecognitionScreen';
import FaceDetectionScreen from './face-detection/FaceDetectionScreen';
import ImageLabelingScreen from './image-labeling/ImageLabelingScreen';
import HomeScreen from './core/HomeScreen';
import BarcodeScanningScreen from './barcode-scanning/BarcodeScanningScreen';

export type ParamList = {
  Home: undefined;
  TextRecognition: undefined;
  BarcodeScanning: undefined;
  FaceDetection: undefined;
  ImageLabeling: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="TextRecognition"
          component={TextRecognitionScreen}
          options={{title: 'Text Recognition'}}
        />
        <Stack.Screen
          name="BarcodeScanning"
          component={BarcodeScanningScreen}
          options={{title: 'Barcode Scanning'}}
        />
        <Stack.Screen
          name="FaceDetection"
          component={FaceDetectionScreen}
          options={{title: 'Face Detection'}}
        />
        <Stack.Screen
          name="ImageLabeling"
          component={ImageLabelingScreen}
          options={{title: 'Image Labeling'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
