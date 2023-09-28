import {Frame, TextBlock} from '@react-native-ml-kit/text-recognition';
import React from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

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

  return blocks.map((block, blockId) => (
    <React.Fragment key={blockId}>
      {showBlocks && (
        <TouchableOpacity
          onPress={() => Alert.alert(block.text)}
          style={[styles.text, scaledFrame(block.frame)]}
        />
      )}

      {showWords &&
        block.lines.map((line, lineId) =>
          line.elements.map((element, elementId) => {
            const key = [blockId, lineId, elementId, element.text].join('-');

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
  ));
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    backgroundColor: 'rgba(27, 114, 232, 0.25)',
    borderRadius: 2,
  },
});

function rotateFrame(frame: Frame): Frame {
  return {
    top: frame.left,
    left: frame.top,
    width: frame.height,
    height: frame.width,
  };
}

function scaleFramePortrait(
  screenWidth: number,
  imageWidth: number,
  imageHeight: number,
  frame: Frame,
): Frame {
  const shownHeight = screenWidth;
  const shownWidth = (imageWidth / imageHeight) * screenWidth;
  const leftOffset = (screenWidth - shownWidth) / 2;

  return {
    left: (shownWidth / imageWidth) * frame.left + leftOffset,
    top: (shownHeight / imageHeight) * frame.top,
    width: (shownWidth / imageWidth) * frame.width,
    height: (shownHeight / imageHeight) * frame.height,
  };
}

function scaleFrame(
  imageWidth: number,
  imageHeight: number,
  screenWidth: number,
) {
  return function scaledFrame(frame?: Frame): Frame | undefined {
    if (!frame) {
      return;
    }

    const portrait = imageHeight > imageWidth;
    if (portrait) {
      return scaleFramePortrait(screenWidth, imageWidth, imageHeight, frame);
    } else {
      return rotateFrame(
        scaleFramePortrait(
          screenWidth,
          imageHeight,
          imageWidth,
          rotateFrame(frame),
        ),
      );
    }
  };
}

export default TextMap;
