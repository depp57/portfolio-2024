import { useEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 600px)').matches) {
      setIsMobile(true);
    }
  }, []);

  return isMobile;
}
