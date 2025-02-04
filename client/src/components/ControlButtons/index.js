import React, { useContext } from "react";
import { AppContext } from "~/AppContext";
import styles from "./styles.css";
import { InlineIcon } from "@iconify/react";
// import locationArrow from "@iconify/icons-map/location-arrow";
import contrastIcon from "@iconify/icons-carbon/contrast";
import sharpSettings from "@iconify/icons-ic/sharp-settings";
// import roundLocationOn from "@iconify/icons-ic/round-location-on";
// import roundLocationOff from "@iconify/icons-ic/round-location-off";
import playFilledAlt from "@iconify/icons-carbon/play-filled-alt";
import stopFilledAlt from "@iconify/icons-carbon/stop-filled-alt";

/**
 * Buttons group component
 *
 * @returns {JSX.Element} Control buttons
 */
const ControlButtons = () => {
  const {
    darkMode,
    setDarkMode,
    // resetMapPosition,
    // markerIsVisible,
    // toggleMarker,
    toggleAnimateWeatherMap,
    animateWeatherMap,
    toggleSettingsMenuOpen,
    settingsMenuOpen,
    mouseHide,
  } = useContext(AppContext);

  return (
    <div
      className={`${styles.container} ${
        darkMode ? styles.dark : styles.light
      } ${!mouseHide ? styles.showMouse : ""}`}
    >
      {/* <div onClick={resetMapPosition}>
        <InlineIcon icon={locationArrow} />
      </div> */}
      {/* <div onClick={toggleMarker}>
        <InlineIcon
          icon={markerIsVisible ? roundLocationOff : roundLocationOn}
        />
      </div> */}
      <div
        onMouseDown={toggleAnimateWeatherMap}
        className={`${animateWeatherMap ? styles.buttonDown : ""}`}
      >
        <InlineIcon icon={animateWeatherMap ? stopFilledAlt : playFilledAlt}  width={80} height={80} />
      </div>
      <div onMouseDown={() => setDarkMode(!darkMode)}>
        <InlineIcon icon={contrastIcon}  width={80} height={80} />
      </div>
      <div
        onClick={toggleSettingsMenuOpen}
        className={`${settingsMenuOpen ? styles.buttonDown : ""}`}
      >
        <InlineIcon icon={sharpSettings}  width={60} height={60} />
      </div>
    </div>
  );
};

export default ControlButtons;
