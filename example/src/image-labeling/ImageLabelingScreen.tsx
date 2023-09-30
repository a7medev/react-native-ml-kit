import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ImageLabeling, {Label} from '@react-native-ml-kit/image-labeling';
import ChooseImageButton, {ImageDetails} from '../core/ChooseImageButton';

const App = () => {
  const [labels, setLabels] = useState<Label[]>([]);

  const handleChoose = async (image: ImageDetails) => {
    const result = await ImageLabeling.label(image.path);

    setLabels(result);
  };

  return (
    <View style={styles.container}>
      <ChooseImageButton onChoose={handleChoose} />

      {labels.length > 0 && <Text style={styles.heading}>Labels</Text>}

      {labels.map(label => (
        <View style={styles.label} key={label.text}>
          <Text>
            {label.text} - {(100 * label.confidence).toFixed(2)}%
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
