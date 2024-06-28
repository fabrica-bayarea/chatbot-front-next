import { type MutableRefObject, useEffect } from 'react';

function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void,
  all = false
) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && (all || !ref.current.contains(event.target))) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}

export default useOutsideClick;
