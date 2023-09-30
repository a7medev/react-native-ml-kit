import {Face, Point} from '@react-native-ml-kit/face-detection';
import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

interface FaceMapProps {
  face: Face;
  width: number;
  height: number;
  showLandmarks: boolean;
  showContours: boolean;
  showFrame: boolean;
}

const FaceMap = ({
  face,
  width,
  height,
  showLandmarks,
  showContours,
  showFrame,
}: FaceMapProps) => {
  const {frame, landmarks, contours} = face;

  return (
    <Svg style={styles.container} width={width} height={height}>
      {showFrame && (
        <Rect
          stroke="white"
          fill="transparent"
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
        Object.entries(landmarks).map(([key, landmark]) => (
          <Circle
            key={key}
            r={3}
            fill="yellow"
            x={landmark.position.x}
            y={landmark.position.y}
          />
        ))}

      {showContours &&
        contours &&
        Object.entries(contours).map(([key, contour]) => {
          const points = contour.points;
          return (
            <React.Fragment key={key}>
              {points.map(({x, y}, pointId) => (
                <Circle
                  key={`${pointId}-${x}-${y}`}
                  x={x}
                  y={y}
                  r={2}
                  fill="skyblue"
                  opacity={0.5}
                />
              ))}

              <Path
                d={pointsToPath(points)}
                fill="transparent"
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

function pointsToPath(points: Point[]) {
  return points
    .map(({x, y}, i) => `${i === 0 ? 'M' : 'L'} ${x} ${y} `)
    .join(' ');
}

export default FaceMap;
