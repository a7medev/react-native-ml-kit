import React from 'react';
import {StyleSheet, Image} from 'react-native';

interface PreviewImageProps {
  source: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({source}) => {
  return <Image source={{uri: source}} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: '100%',
    objectFit: 'contain',
    backgroundColor: 'black',
  },
});

export default PreviewImage;
