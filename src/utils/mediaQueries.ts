export const screenSizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 480,
  tablet: 768,
  laptopS: 1024,
  laptopM: 1280,
  laptopL: 1440,
  desktop: 1920,
};

export const mediaQueries = {
  mobileS: `@media (max-width: ${screenSizes.mobileS}px)`,
  mobileM: `@media (max-width: ${screenSizes.mobileM}px)`,
  mobileL: `@media (max-width: ${screenSizes.mobileL}px)`,
  tablet: `@media (max-width: ${screenSizes.tablet}px)`,
  laptopS: `@media (max-width: ${screenSizes.laptopS}px)`,
  laptopM: `@media (max-width: ${screenSizes.laptopM}px)`,
  laptopL: `@media (max-width: ${screenSizes.laptopL}px)`,
  desktop: `@media (max-width: ${screenSizes.desktop}px)`,
};
