import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TextRecognitionScreen from './text-recognition/TextRecognitionScreen';
import FaceDetectionScreen from './face-detection/FaceDetectionScreen';
import HomeScreen from './core/HomeScreen';

export type ParamList = {
  Home: undefined;
  TextRecognition: undefined;
  FaceDetection: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="FaceDetection"
          component={FaceDetectionScreen}
          options={{title: 'Face Detection'}}
        />
        <Stack.Screen
          name="TextRecognition"
          component={TextRecognitionScreen}
          options={{title: 'Text Recognition'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
