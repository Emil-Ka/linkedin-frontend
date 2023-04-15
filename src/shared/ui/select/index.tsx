import SelectComponent from 'react-select';

import { SelectType } from './types';

export const Select: SelectType = ({ ...props }) => {
  return (
    <SelectComponent
      {...props}
      styles={{
        control: (styles) => ({
          ...styles,
          backgroundColor: '#F4F4F4',
          borderColor: '#CCCCCC',
        }),
        option: (styles, { isSelected, isFocused }) => ({
          ...styles,
          backgroundColor: isSelected || isFocused ? '#CCCCCC' : '#F4F4F4',
          color: '#000000',
        }),
        input: (styles) => ({
          ...styles,
          borderColor: '#F4F4F4',
        }),
      }}
    />
  );
};
