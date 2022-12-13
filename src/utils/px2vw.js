const NUMBER_WIDTH = 3840;
const NUMBER_HEIGTH = 2160;

export const px1vw = (size, height = NUMBER_HEIGTH) => `${(size / height) * 100}vw`;

export const px2vw = (size, width = NUMBER_WIDTH) => `${(size / width) * 100}vw`;
