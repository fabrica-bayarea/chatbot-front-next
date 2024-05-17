import { useEffect, useState } from 'react';

import { InputScheme } from '@/lib/definitions';

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
            const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) return 'Formato de e-mail inválido.';
            break;
          case 'name':
            if (value.length < 3) return 'O nome deve conter no mínimo 3 caracteres.';
            break;
          case 'password':
            const passwordPattern =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(value)) {
              return 'A senha deve conter no mínimo 8 caracteres, sendo 1 carácter especial, 1 maiúsculo, 1 minúsculo, e 1 número.';
            }
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
