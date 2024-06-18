import { useEffect, useState } from 'react';

import { InputScheme } from '@/utils/definitions';

function useValidation(inputs: { [key: string]: InputScheme }): boolean | string {
  const [validation, setValidation] = useState<boolean | string>(false);

  useEffect(() => {
    const runValidations = () => {
      // If all inputs are empty, return false
      if (Object.values(inputs).every((input) => input.value === '')) {
        return false;
      }

      // For each input, check whether it is valid. If not, return a message
      for (let key in inputs) {
        const { isRequired, value } = inputs[key];

        if (isRequired && value === '') {
          return `O campo '${inputs[key].label.toLowerCase()}' é obrigatório.`;
        }

        switch (key) {
          case 'email':
            const REGEX = /\S+@\S+\.\S+/;
            if (!REGEX.test(value)) return 'Formato de e-mail inválido.';
            break;
          case 'name':
            if (value.length < 3) return 'O nome deve conter no mínimo 3 caracteres.';
            break;
          case 'password':
            if (value.length < 6) return 'A senha deve conter no mínimo 6 caracteres.';
            break;
          case 'confirmation':
            const password = inputs.password.value;
            if (value !== password) return 'Confirmação inválida.';
            break;
          default:
            break;
        }
      }

      // All inputs are valid
      return true;
    };

    setValidation(runValidations());
  }, [inputs]);

  return validation;
}

export default useValidation;
