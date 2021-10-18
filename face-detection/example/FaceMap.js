import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const FaceMap = ({
  face,
  width,
  height,
  showLandmarks,
  showContours,
  hideFrame,
}) => {
  const { frame, landmarks, contours } = face;

  return (
    <Svg style={styles.container} width={width} height={height}>
      {!hideFrame && (
        <Rect
          stroke="white"
          strokeWidth={2}
          strokeOpacity={0.75}
          width={frame.width}
          height={frame.height}
          x={frame.left}
          y={frame.top}
        />
      )}

      {showLandmarks &&
        landmarks &&
        Object.keys(landmarks).map(key => (
          <Circle
            key={key}
            r={3}
            fill="yellow"
            x={landmarks[key].position.x}
            y={landmarks[key].position.y}
          />
        ))}

      {showContours &&
        contours &&
        Object.keys(contours).map(key => {
          const { points } = contours[key];
          return (
            <React.Fragment key={key}>
              {points.map(({ x, y }) => (
                <Circle
                  key={Math.random()}
                  x={x}
                  y={y}
                  r={2}
                  fill="skyblue"
                  opacity={0.5}
                />
              ))}

              <Path
                d={points
                  .map(({ x, y }, i) => `${i === 0 ? 'M' : 'L'} ${x} ${y} `)
                  .join(' ')}
                strokeWidth={2}
                stroke="white"
                strokeOpacity={0.5}
              />
            </React.Fragment>
          );
        })}
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default FaceMap;
