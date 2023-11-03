export const screenSizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 480,
  tablet: 820,
  laptopS: 1024,
  laptopM: 1280,
  laptopL: 1440,
  desktop: 1920,
};

const devices = {
  mobileS: `(max-width: ${screenSizes.mobileS}px)`,
  mobileM: `(max-width: ${screenSizes.mobileM}px)`,
  mobileL: `(max-width: ${screenSizes.mobileL}px)`,
  tablet: `(max-width: ${screenSizes.tablet}px)`,
  laptopS: `(max-width: ${screenSizes.laptopS}px)`,
  laptopM: `(max-width: ${screenSizes.laptopM}px)`,
  laptopL: `(max-width: ${screenSizes.laptopL}px)`,
  desktop: `(max-width: ${screenSizes.desktop}px)`,
};

export default devices;
