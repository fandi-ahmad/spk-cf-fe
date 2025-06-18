import { ChangeEvent, useState } from 'react';

function useHandleInput<T>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return { formState, handleInput, setFormState };
}

export default useHandleInput;