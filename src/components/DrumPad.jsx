import React, { useEffect } from "react";
import "./DrumPad.css";

const DrumPad = ({ id, keyTrigger, url, handlePlay, power, volume }) => {
  const playSound = () => {
    if (power) {
      const audio = document.getElementById(keyTrigger);
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
      handlePlay(id);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === keyTrigger) {
        playSound();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyTrigger, playSound]);

  return (
    <div className="drum-pad" id={id} onClick={playSound}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </div>
  );
};

export default DrumPad;
