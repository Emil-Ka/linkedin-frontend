import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Main = () => {
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      Главная
    </div>
  );
};
