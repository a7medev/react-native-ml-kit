import React, { useState } from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageLabeling from '@react-native-ml-kit/image-labeling';

const App = () => {
  const [labels, setLabels] = useState([]);

  const handlePress = async () => {
    setLabels([]);
    const image = await ImagePicker.openPicker({ mediaType: 'photo' });
    const result = await ImageLabeling.label(image.sourceURL);
    setLabels(result);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />

      {labels.length > 0 && <Text style={styles.heading}>Labels</Text>}
      {labels.map(label => (
        <View style={styles.label}>
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
