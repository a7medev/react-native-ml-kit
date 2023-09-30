import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TextRecognitionScreen from './text-recognition/TextRecognitionScreen';
import FaceDetectionScreen from './face-detection/FaceDetectionScreen';

const HomeScreen: React.FC = () => {
  return (
    <View>
      <Text>Hello React Native ML Kit</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FaceDetection" component={FaceDetectionScreen} />
        <Stack.Screen
          name="TextRecognition"
          component={TextRecognitionScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
