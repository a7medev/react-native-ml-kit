import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import BarcodeScanning, {Barcode} from '@react-native-ml-kit/barcode-scanning';
import ChooseImageButton, {ImageDetails} from '../core/ChooseImageButton';
import Label from '../core/Label';
import PreviewImage from '../core/PreviewImage';

const BarcodeScanningScreen = () => {
  const [image, setImage] = useState<ImageDetails>();
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);

  const handleChoose = async (currentImage: ImageDetails) => {
    setImage(currentImage);

    const result = await BarcodeScanning.scan(currentImage.path);

    setBarcodes(result);
  };

  return (
    <View style={styles.container}>
      <ChooseImageButton onChoose={handleChoose} />

      {image && <PreviewImage source={image.path} />}

      {barcodes.length > 0 && (
        <>
          <Text style={styles.heading}>Barcodes</Text>

          <FlatList
            data={barcodes}
            style={styles.list}
            keyExtractor={barcode => `${barcode.format}-${barcode.value}`}
            renderItem={({item}) => (
              <Label key={item.value}>
                {item.value} - {item.format}
              </Label>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  list: {
    width: '100%',
    padding: 10,
  },
});

export default BarcodeScanningScreen;
