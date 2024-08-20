import { ReactNode, useEffect, useState } from "react";

interface ProgressProviderProps {
  valueStart: number;
  valueEnd: number;
  children: (value: number) => ReactNode;
}

const ProgressProvider = ({
  valueStart,
  valueEnd,
  children,
}: ProgressProviderProps) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};

export default ProgressProvider;
