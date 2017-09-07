export const TOGGLE_HELP = 'TOGGLE_HELP';
export const RESIZE_MAZEBOARD = 'RESIZE_MAZEBOARD';

export const toggleHelp = () => ({ type: TOGGLE_HELP });

export const resizeMazeBoard = (xDimension, yDimension) => {
  return {
    type: RESIZE_MAZEBOARD,
    dimensions: {
      xDimension,
      yDimension
    }
  }
};