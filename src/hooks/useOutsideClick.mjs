import React from 'react';

const useOutsideClick = (ref, callback) => {
  const handleClick = (event) => {
    if (ref && ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    // Unsubscribe on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useOutsideClick;
