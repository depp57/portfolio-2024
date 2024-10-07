import { useState } from 'react';

export function useTransitionDisappear(visible: boolean) {
  const [isDisappearing, setIsDisappearing] = useState(false);

  const startTransition = () => {
    if (!visible) {
      setIsDisappearing(true);
    }
  };

  const endTransition = () => {
    setIsDisappearing(false);
  };

  return {
    render: isDisappearing || visible,
    startTransition,
    endTransition,
  };
}
