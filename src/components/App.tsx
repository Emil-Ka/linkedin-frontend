import React from 'react';

export function App() {
  const [count, setCount] = React.useState<number>(0);

  const setValue = React.useCallback((value: number) => {
    setCount(value);
  }, []);

  React.useEffect(() => {
    setValue(8);
  }, [setValue]);

  return (
    <>
      <h1>{count}</h1>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>+</button>
    </>
  );
}
