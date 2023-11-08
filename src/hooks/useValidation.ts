import { useEffect, useState } from 'react';

import type { InputSchemeType } from '@/types';

function useValidation(inputs: { [key: string]: InputSchemeType }) {
  const [validation, setValidation] = useState<boolean | string>(false);

  useEffect(() => {
    const runValidations = () => {
      if (Object.values(inputs).every((input) => input.value === '')) {
        return false;
      }

      for (let key in inputs) {
        const { value, isRequired } = inputs[key];

        if (value === '' && isRequired) {
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

      return true;
    };

    setValidation(runValidations());
  }, [inputs]);

  return validation;
}

export default useValidation;
