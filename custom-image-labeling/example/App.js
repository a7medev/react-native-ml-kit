import React, { useState } from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CustomImageLabeling from '@react-native-ml-kit/custom-image-labeling';

const App = () => {
  const [labels, setLabels] = useState([]);

  const handlePress = async () => {
    setLabels([]);
    const image = await ImagePicker.openPicker({ mediaType: 'photo' });
    console.log(image.path);
    const result = await CustomImageLabeling.label({
      url: image.path,
      confidence: 0.8,
      localModelFilename: 'mobilenet_v1_1.0_224_quant.tflite',
      localLabelsFilename: 'labels_mobilenet_quant_v1_224.txt',
      withFilePrefix: 'yes'
    });
    console.log(result);
    setLabels(result);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />

      {labels.length > 0 && <Text style={styles.heading}>Labels</Text>}
      {labels.map(label => (
        <View style={styles.label} key={label}>
          <Text>
            {label.text} - {label.confidence.toFixed(2)}%
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    backgroundColor: '#ffff55',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default App;
