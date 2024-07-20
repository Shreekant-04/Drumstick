import { useState } from "react";
import "./App.css";
import DrumPad from "./components/DrumPad";
import Controls from "./components/Controls";

const drumPads = [
  {
    id: "Heater-1",
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    id: "Heater-2",
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    id: "Heater-3",
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    id: "Heater-4",
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    id: "Clap",
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    id: "Open-HH",
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    id: "Kick-n'-Hat",
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    id: "Kick",
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    id: "Closed-HH",
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const presetBeats = {
  preset1: ["X", "S", "D", "X"],
  preset2: ["X", "S", "C", "W"],
  preset3: ["Q", "X", "D", "S"],
  preset4: ["X", "E", "D", "C"],
  preset5: ["A", "S", "X", "D"],
};

const App = () => {
  const [display, setDisplay] = useState("Play");
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const handlePlay = (id) => {
    setDisplay(id);
  };

  const playPreset = (preset) => {
    if (power) {
      const beat = presetBeats[preset];
      let index = 0;

      const playNext = () => {
        if (index < beat.length) {
          const key = beat[index];
          const audio = document.getElementById(key);
          audio.currentTime = 0;
          audio.volume = volume;
          audio.play();
          handlePlay(audio.parentElement.id);
          index++;
          setTimeout(playNext, 500); // adjust the interval as needed
        }
      };

      playNext();
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Drum Sticks</h1>

      <div id="drum-machine">
        <div>
          <div id="display">{power ? display : "Power Off"}</div>
          <Controls
            power={power}
            setPower={setPower}
            volume={volume}
            setVolume={setVolume}
          />
          <Beats playPreset={playPreset} />
        </div>

        <div id="pad-container">
          {drumPads.map((pad) => (
            <DrumPad
              key={pad.id}
              id={pad.id}
              keyTrigger={pad.keyTrigger}
              url={pad.url}
              handlePlay={handlePlay}
              power={power}
              volume={volume}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

function Beats({ playPreset }) {
  return (
    <div className="presets">
      <button className="preset-button" onClick={() => playPreset("preset1")}>
        Preset 1
      </button>
      <button className="preset-button" onClick={() => playPreset("preset2")}>
        Preset 2
      </button>
      <button className="preset-button" onClick={() => playPreset("preset3")}>
        Preset 3
      </button>
      <button className="preset-button" onClick={() => playPreset("preset4")}>
        Preset 4
      </button>
      <button className="preset-button" onClick={() => playPreset("preset5")}>
        Preset 5
      </button>
    </div>
  );
}
