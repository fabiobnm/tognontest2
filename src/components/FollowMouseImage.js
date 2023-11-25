import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  position: absolute;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

const FollowMouseImage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Assicurati che useEffect abbia il secondo argomento, che è un array vuoto per eseguire l'effetto solo al mount e unmount del componente

  return (
    <Image
      src="/next.png"
      style={{ left: position.x, top: position.y }}
      isVisible={isVisible}
    />
  );
};

export default FollowMouseImage;