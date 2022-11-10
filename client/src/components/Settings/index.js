import React, { useContext, useState, useEffect } from "react";
import styles from "./styles.css";
import { AppContext } from "~/AppContext";
import { CSSTransition } from "react-transition-group";
import { InlineIcon } from "@iconify/react";
import closeFilled from "@iconify/icons-carbon/close-filled";
import roundSaveAlt from "@iconify/icons-ic/round-save-alt";
import undoIcon from "@iconify/icons-dashicons/undo";
import closeSharp from "@iconify/icons-ion/close-sharp";
import PropTypes from "prop-types";
import "!style-loader!css-loader!./animations.css";

/**
 * Settings page
 *
 * @returns {JSX.Element} Settings page
 */
const Settings = () => {
  const {
    settingsMenuOpen,
    weatherApiKey,
    mapApiKey,
    // reverseGeoApiKey,
    customLat,
    customLon,
    customWP1,
    customWP2,
    customWP3,
    customWP4,
    customWP5,
    customWP6,
    setSettingsMenuOpen,
    mouseHide,
    saveMouseHide,
  } = useContext(AppContext);

  const [mapsKey, setMapsKey] = useState(null);
  const [weatherKey, setWeatherKey] = useState(null);
  // const [geoKey, setGeoKey] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [wp1, setWP1] = useState(null);
  const [wp2, setWP2] = useState(null);
  const [wp3, setWP3] = useState(null);
  const [wp4, setWP4] = useState(null);
  const [wp5, setWP5] = useState(null);
  const [wp6, setWP6] = useState(null);

  const [currentMapsKey, setCurrentMapsKey] = useState(null);
  const [currentWeatherKey, setCurrentWeatherKey] = useState(null);
  // const [currentGeoKey, setCurrentGeoKey] = useState(null);
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLon, setCurrentLon] = useState(null);
  const [currentWP1, setCurrentWP1] = useState(null);
  const [currentWP2, setCurrentWP2] = useState(null);
  const [currentWP3, setCurrentWP3] = useState(null);
  const [currentWP4, setCurrentWP4] = useState(null);
  const [currentWP5, setCurrentWP5] = useState(null);
  const [currentWP6, setCurrentWP6] = useState(null);

  useEffect(() => {
    setCurrentMapsKey(mapApiKey);
    setCurrentWeatherKey(weatherApiKey);
    // setCurrentGeoKey(reverseGeoApiKey);
    setCurrentLat(customLat);
    setCurrentLon(customLon);
    setCurrentWP1(customWP1);
    setCurrentWP2(customWP2);
    setCurrentWP3(customWP3);
    setCurrentWP4(customWP4);
    setCurrentWP5(customWP5);
    setCurrentWP6(customWP6);
  }, [
    mapApiKey,
    weatherApiKey,
    // reverseGeoApiKey,
    customLat,
    customLon,
    customWP1,
    customWP2,
    customWP3,
    customWP4,
    customWP5,
    customWP6,
    // currentGeoKey,
    mouseHide,
    saveMouseHide,
  ]);

  useEffect(() => {
    if (mapApiKey) {
      setMapsKey(mapApiKey);
    }
    if (weatherApiKey) {
      setWeatherKey(weatherApiKey);
    }
    // if (reverseGeoApiKey) {
    //   setGeoKey(reverseGeoApiKey);
    // }
    if (customLat) {
      setLat(customLat);
    }
    if (customLon) {
      setLon(customLon);
    }
    if (customWP1) {
      setWP1(customWP1);
    }
    if (customWP2) {
      setWP2(customWP2);
    }
    if (customWP3) {
      setWP3(customWP3);
    }
    if (customWP4) {
      setWP4(customWP4);
    }
    if (customWP5) {
      setWP5(customWP5);
    }
    if (customWP6) {
      setWP6(customWP6);
    }
  }, [mapApiKey, weatherApiKey, customLon, customLat, 
    customWP1, customWP2, customWP3, customWP4, customWP5, customWP6]);

  return (
    <CSSTransition
      in={settingsMenuOpen}
      unmountOnExit
      timeout={300}
      classNames="animate"
    >
      <div className={styles.container}>
        <div className={styles.header}>SETTINGS</div>
        <div
          className={styles.closeButton}
          onClick={() => {
            setSettingsMenuOpen(false);
          }}
        >
          <InlineIcon icon={closeSharp} />
        </div>
        <div className={styles.settingsContainer}>
          <ToggleButtons />
          <Input
            label={"MAPS API KEY"}
            val={mapsKey}
            current={currentMapsKey}
            cb={setMapsKey}
            required={true}
          />
          <Input
            label={"WEATHER API KEY"}
            val={weatherKey}
            current={currentWeatherKey}
            cb={setWeatherKey}
            required={true}
          />
          {/* <Input
            label={"GEOLOCATION API KEY"}
            val={geoKey}
            current={currentGeoKey}
            cb={setGeoKey}
          /> */}
          <Input
            label={"CUSTOM STARTING LATITUDE"}
            val={lat}
            cb={setLat}
            current={currentLat}
          />
          <Input
            label={"CUSTOM STARTING LONGITUDE"}
            val={lon}
            cb={setLon}
            current={currentLon}
          />
        <Input
            label={"WAYPOINT 1"}
            val={wp1}
            cb={setWP1}
            current={currentWP1}
          />
            <Input
            label={"WAYPOINT 2"}
            val={wp2}
            cb={setWP2}
            current={currentWP2}
          />
            <Input
            label={"WAYPOINT 3"}
            val={wp3}
            cb={setWP3}
            current={currentWP3}
          />
            <Input
            label={"WAYPOINT 4"}
            val={wp4}
            cb={setWP4}
            current={currentWP4}
          />
            <Input
            label={"WAYPOINT 5"}
            val={wp5}
            cb={setWP5}
            current={currentWP5}
          />
            <Input
            label={"WAYPOINT 6"}
            val={wp6}
            cb={setWP6}
            current={currentWP6}
          />
          <div className={styles.bottomButtonContainer}>
            <div>
              <div className={styles.label}>HIDE MOUSE</div>
              <ToggleButton
                button1Label={"ON"}
                button2Label={"OFF"}
                val={mouseHide}
                button1Val={true}
                button2Val={false}
                cb={saveMouseHide}
              />
            </div>
            <div className={styles.saveButtonContainer}>
              <SaveButton
                mapsKey={mapsKey}
                weatherKey={weatherKey}
                lat={lat}
                lon={lon}
                wp1={wp1}
                wp2={wp2}
                wp3={wp3}
                wp4={wp4}
                wp5={wp5}
                wp6={wp6}
              />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Settings;

/**
 * Save button
 *
 * @param {Object} props
 * @param {String} [props.mapsKey]
 * @param {String} [props.weatherKey]
//  * @param {String} [props.geoKey]
 * @param {String} [props.lat]
 * @param {String} [props.lon]
 * @param {String} [props.wp1]
 * @param {String} [props.wp2]
 * @param {String} [props.wp3]
 * @param {String} [props.wp4]
 * @param {String} [props.wp5]
 * @param {String} [props.wp6]
 * @returns {JSX.Element} Save button
 */
const SaveButton = ({ mapsKey, weatherKey, lat, lon, wp1, wp2, wp3, wp4, wp5, wp6}) => {
  const { saveSettingsToJson, setSettingsMenuOpen, mouseHide } = useContext(
    AppContext
  );
  return (
    <div
      className={`${styles.button} ${styles.saveButton} ${
        !mouseHide ? styles.showMouse : ""
      }`}
      onClick={() => {
        saveSettingsToJson({ mapsKey, weatherKey, lat, lon, wp1, wp2, wp3, wp4, wp5, wp6})
          .then(() => {
            setSettingsMenuOpen(false);
          })
          .catch((err) => {
            console.log("err!", err);
          });
      }}
    >
      <div className={styles.label}>SAVE</div>
      <div>
        <InlineIcon icon={roundSaveAlt} />
      </div>
    </div>
  );
};

SaveButton.propTypes = {
  mapsKey: PropTypes.string,
  weatherKey: PropTypes.string,
  // geoKey: PropTypes.string,
  lat: PropTypes.string,
  lon: PropTypes.string,
  wp1:PropTypes.string,
  wp2:PropTypes.string,
  wp3:PropTypes.string,
  wp4:PropTypes.string,
  wp5:PropTypes.string,
  wp6:PropTypes.string,
};

/**
 * Toggle Buttons Group
 *
 * @returns {JSX.Element} A grouping of toggle buttons
 */
const ToggleButtons = () => {
  const {
    tempUnit,
    saveTempUnit,
    speedUnit,
    saveSpeedUnit,
    lengthUnit,
    saveLengthUnit,
    clockTime,
    saveClockTime,
  } = useContext(AppContext);

  return (
    <div>
      <div className={styles.label}>UNITS</div>
      <div className={styles.toggleButtons}>
        <div>
          <ToggleButton
            button1Label={"F"}
            button2Label={"C"}
            val={tempUnit}
            button1Val={"f"}
            button2Val={"c"}
            cb={saveTempUnit}
          />
        </div>
        <div>
          <ToggleButton
            button1Label={"mph"}
            button2Label={"m/s"}
            val={speedUnit}
            button1Val={"mph"}
            button2Val={"ms"}
            cb={saveSpeedUnit}
          />
        </div>
        <div>
          <ToggleButton
            button1Label={"in"}
            button2Label={"mm"}
            val={lengthUnit}
            button1Val={"in"}
            button2Val={"mm"}
            cb={saveLengthUnit}
          />
        </div>
        <div>
          <ToggleButton
            button1Label={"12h"}
            button2Label={"24h"}
            val={clockTime}
            button1Val={"12"}
            button2Val={"24"}
            cb={saveClockTime}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Toggle buttons
 *
 * @param {Object} props
 * @param {String} props.button1Label PropTypes.string.isRequired,
 * @param {String} props.button2Label PropTypes.string.isRequired,
 * @param {*} props.val PropTypes.string.isRequired,
 * @param {*} props.button1Val PropTypes.string.isRequired,
 * @param {*} props.button2Val PropTypes.string.isRequired,
 * @param {Function} props.cb PropTypes.func.isRequired,
 * @returns {JSX.Element} Toggle buttons
 */
const ToggleButton = ({
  button1Label,
  button2Label,
  val,
  button1Val,
  button2Val,
  cb,
}) => {
  return (
    <div className={styles.toggleContainer}>
      <div
        className={` ${styles.button} ${button1Val === val ? styles.down : ""}`}
        onClick={() => {
          cb(button1Val);
        }}
      >
        {button1Label}
      </div>
      <div
        className={` ${styles.button} ${button2Val === val ? styles.down : ""}`}
        onClick={() => {
          cb(button2Val);
        }}
      >
        {button2Label}
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  button1Label: PropTypes.string.isRequired,
  button2Label: PropTypes.string.isRequired,
  val: PropTypes.any.isRequired,
  button1Val: PropTypes.any.isRequired,
  button2Val: PropTypes.any.isRequired,
  cb: PropTypes.func.isRequired,
};

/**
 * Delete button
 *
 * @param {Object} props
 * @param {Function} props.cb callback
 * @returns {JSX.Element} Delete button
 */
const DeleteButton = ({ cb }) => {
  return (
    <div className={styles.button} onClick={cb}>
      <InlineIcon icon={closeFilled} />
    </div>
  );
};

DeleteButton.propTypes = {
  cb: PropTypes.func.isRequired,
};

/**
 * Undo button, restores input to default value
 *
 * @param {Object} props
 * @param {Function} props.cb callback
 * @returns {JSX.Element} Undo button
 */
const UndoButton = ({ cb }) => {
  return (
    <div className={styles.button} onClick={cb}>
      <InlineIcon icon={undoIcon} />
    </div>
  );
};

UndoButton.propTypes = {
  cb: PropTypes.func.isRequired,
};

/**
 * Settings input
 *
 * @param {Object} props
 * @param {String} props.label Label
 * @param {String} props.val value
 * @param {Function} props.cb change callback
 * @param {String} props.current current default value
 * @param {Boolean} [props.required] If input is required
 * @returns {JSX.Element} Input
 */
const Input = ({ label, val, cb, required, current }) => {
  const [inputValue, setInputValue] = useState(val);
  const [defaultValue, setDefaultValue] = useState(null);

  useEffect(() => {
    if ((val || val === "") && (!defaultValue || defaultValue === "")) {
      setDefaultValue(val);
    }
    setInputValue(val);
  }, [val, defaultValue]);
  return (
    <div className={styles.settingsItem}>
      <div className={styles.label}>{label}</div>
      <div
        className={`${styles.inputContainer} ${
          required && !val ? styles.invalid : ""
        }`}
      >
        <input
          type="text"
          placeholder={"None"}
          value={inputValue || ""}
          onChange={(e) => {
            const { value } = e.target;
            setInputValue(value);
            cb(value);
          }}
        />

        <div className={styles.buttonContainer}>
          <DeleteButton
            cb={() => {
              setInputValue("");
              cb("");
            }}
          />
          <UndoButton
            cb={() => {
              setInputValue(current);
              cb(current);
            }}
          />
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  val: PropTypes.string,
  cb: PropTypes.func.isRequired,
  required: PropTypes.bool,
  current: PropTypes.string,
};
