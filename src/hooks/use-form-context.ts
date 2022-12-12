import { useContext } from 'react';
import { FormContext } from '../components/templates/Form/context';

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('The component must be inside a component <Form>');
  }

  return context;
};
