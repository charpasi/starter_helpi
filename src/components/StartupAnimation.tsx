import React, { useState, useEffect } from 'react';
import './AnimationStyles.css';
import genie from "../assets/pikmin.png";

interface StartupAnimationProps {
    onAnimationComplete: () => void;
  }
  
  const StartupAnimation: React.FC<StartupAnimationProps> = ({ onAnimationComplete }) => {
      useEffect(() => {
          const timer = setTimeout(onAnimationComplete, 4000); // Duration of your animation
          return () => clearTimeout(timer);
      }, [onAnimationComplete]);
  
      return (
          <div className="startup-animation">
              <img src={genie} alt="Logo" className="genie" />
              <div className="loading-bar"></div>
          </div>
      );
  };
  
  export default StartupAnimation;
