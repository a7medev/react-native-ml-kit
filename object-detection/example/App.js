import React, { useState } from 'react';
import { Text, Button, StyleSheet, View, ImageBackground, ScrollView, Dimensions, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ObjectDetection from '@react-native-ml-kit/object-detection';

const App = () => {
  const [labels, setLabels] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [imageHeightWidth, setImageHeightWidth] = useState(null);

  const handlePress = async () => {
    setLabels([]);

    const image = await ImagePicker.openPicker({ mediaType: 'photo' });

    setImageHeightWidth({
      height: image.height,
      width: image.width
    })

    setImagePath(image.path);

    const result = await ObjectDetection.detectSingleImage({
      url: (Platform.OS === 'ios' ? 'file:' : '') + image.path,
      confidence: 0.8,
      shouldEnableMultipleObjects: true,
      shouldEnableClassification: true
    });

    setLabels(result);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true} vertical={true} style={styles.imageContainer}>
        <ScrollView showsHorizontalScrollIndicator={true} horizontal={true}>
          {imageHeightWidth && <ImageBackground style={{ width: imageHeightWidth.width, height: imageHeightWidth.height }} source={{ uri: imagePath }} resizeMode="cover">

            {labels.map(label => (<View key={label.index} style={{
              zIndex: 20,
              borderWidth: 1,
              borderColor: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              width: label.frameWidth,
              height: label.frameHeight,
              left: label.frameX,
              top: label.frameY
            }} />))
            }

          </ImageBackground>}
        </ScrollView>
      </ScrollView>

      <View style={styles.controlContainer}>
        <Button title="Choose an Image" onPress={handlePress} />

        {labels.length > 0 && <Text style={styles.heading}>Labels</Text>}
        {labels.map(label => (
          <View style={styles.label} key={label}>
            <Text>
              {label.text} - {label.confidence.toFixed(2)}%
              w={label.frameWidth} h={label.frameHeight} x={label.frameX} y={label.frameY}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  controlContainer: {
    alignItems: 'center',
    justifyContent: 'center'
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
  imageContainer: {
    height: Dimensions.get('window').height / 1.5,
    width: Dimensions.get('window').width,
    backgroundColor: 'black'
  }
});

export default App;
