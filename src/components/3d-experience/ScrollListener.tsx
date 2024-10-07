import { useScroll } from '@react-three/drei';
import { useEffect } from 'react';
import { useThreeStore } from '@/stores/ThreeStore';

export default function ScrollListener() {
  const scrollContainer = useScroll().el;

  useEffect(() => {
    const listener = () => {
      useThreeStore.setState({
        currentScrollProgress:
          scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight),
      });
    };
    scrollContainer.addEventListener('scroll', listener);

    return () => {
      scrollContainer.removeEventListener('scroll', listener);
    };
  }, [scrollContainer]);

  return null;
}
