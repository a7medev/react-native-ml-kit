import {TextBlock} from '@react-native-ml-kit/text-recognition';
import React from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {scaleFrame} from '../core/scaling';

interface TextMapProps {
  blocks: TextBlock[];
  showWords: boolean;
  showBlocks: boolean;
  width: number;
  height: number;
}

const TextMap = ({
  width,
  height,
  blocks,
  showWords,
  showBlocks,
}: TextMapProps) => {
  const screen = useWindowDimensions();

  const scaledFrame = scaleFrame(width, height, screen.width);

  return (
    <>
      {blocks.map((block, blockId) => (
        <React.Fragment key={blockId}>
          {showBlocks && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  block.text,
                  "Confidence score and rotation degree of 1st line\n\n" +
                  `Confidence score: ${getConfidenceScore(block)}\n\n` +
                  `Rotation degree: ${getRotationDegree(block)}`,
                )
              }
              style={[styles.text, scaledFrame(block.frame)]}
            />
          )}

          {showWords &&
            block.lines.map((line, lineId) =>
              line.elements.map((element, elementId) => {
                const key = [blockId, lineId, elementId, element.text].join(
                  '-',
                );

                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => Alert.alert(element.text)}
                    style={[styles.text, scaledFrame(element.frame)]}
                  />
                );
              }),
            )}
        </React.Fragment>
      ))}
    </>
  );

  function getRotationDegree(block: TextBlock) {
    return block.lines[0]?.rotationDegree?.toFixed(2) ?? 0;
  }

  function getConfidenceScore(block: TextBlock) {
    return block.lines[0]?.confidenceScore?.toFixed(2) ?? 0;
  }
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    backgroundColor: 'rgba(27, 114, 232, 0.25)',
    borderRadius: 2,
  },
});

export default TextMap;
