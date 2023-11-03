import { InputSchemeType, InputValuesType } from '@/types';

// Receives an object with a predefined structure and returns another
// object in the format key: value
function reduceInputs(inputs: InputSchemeType) {
  const keys = Object.keys(inputs);

  return keys.reduce((inputValues, key) => {
    inputValues[key] = inputs[key].value;

    return inputValues;
  }, {} as InputValuesType);
}

export default reduceInputs;
