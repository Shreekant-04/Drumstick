import React from "react";
import "./Controls.css";

const Controls = ({ power, setPower, volume, setVolume }) => {
  return (
    <div id="controls">
      <button
        id="power-button"
        className={power ? "active" : ""}
        onClick={() => setPower(!power)}
      >
        {power ? "On" : "Off"}
      </button>
      <label htmlFor="volume-control" className="volume-label">
        Volume
        <span className="min">Min</span>
        <input
          type="range"
          id="volume-control"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <span className="max">Max</span>
      </label>
    </div>
  );
};

export default Controls;
