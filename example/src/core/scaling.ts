import {Frame, Point} from '@react-native-ml-kit/text-recognition';

function rotateFrame(frame: Frame): Frame {
  return {
    top: frame.left,
    left: frame.top,
    width: frame.height,
    height: frame.width,
  };
}

function rotatePoint(point: Point): Point {
  return {x: point.y, y: point.x};
}

function shownDimensionsPortrait(
  screenWidth: number,
  imageWidth: number,
  imageHeight: number,
) {
  const shownHeight = screenWidth;
  const shownWidth = (imageWidth / imageHeight) * screenWidth;

  return {
    width: shownWidth,
    height: shownHeight,
  };
}

function scalePointPortrait(
  screenWidth: number,
  imageWidth: number,
  imageHeight: number,
  point: Point,
): Point {
  const shown = shownDimensionsPortrait(screenWidth, imageWidth, imageHeight);
  const xOffset = (screenWidth - shown.width) / 2;

  return {
    x: (shown.width / imageWidth) * point.x + xOffset,
    y: (shown.height / imageHeight) * point.y,
  };
}

export function scalePoint(
  imageWidth: number,
  imageHeight: number,
  screenWidth: number,
) {
  return function scaledPoint(point: Point): Point {
    const portrait = imageHeight > imageWidth;

    if (portrait) {
      return scalePointPortrait(screenWidth, imageWidth, imageHeight, point);
    }

    return rotatePoint(
      scalePointPortrait(
        screenWidth,
        imageHeight,
        imageWidth,
        rotatePoint(point),
      ),
    );
  };
}

function scaleFramePortrait(
  screenWidth: number,
  imageWidth: number,
  imageHeight: number,
  frame: Frame,
): Frame {
  const shown = shownDimensionsPortrait(screenWidth, imageWidth, imageHeight);
  const point = scalePointPortrait(screenWidth, imageWidth, imageHeight, {
    x: frame.left,
    y: frame.top,
  });

  return {
    left: point.x,
    top: point.y,
    width: (shown.width / imageWidth) * frame.width,
    height: (shown.height / imageHeight) * frame.height,
  };
}

export function scaleFrame(
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
    }

    return rotateFrame(
      scaleFramePortrait(
        screenWidth,
        imageHeight,
        imageWidth,
        rotateFrame(frame),
      ),
    );
  };
}
