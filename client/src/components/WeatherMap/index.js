import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { Map, TileLayer, AttributionControl, Marker } from "react-leaflet";
import PropTypes from "prop-types";
import { AppContext } from "~/AppContext";
// import debounce from "debounce";
import axios from "axios";
import styles from "./styles.css";
import "leaflet/dist/leaflet.css";
// const helixPosition = [1.2864086982755834, 103.86027669621278];
// const wwpPosition = [1.4078599138570396, 103.90326730681771];
// const bishanSPPosition = [1.3461118639398442, 103.8472918001256];
// const nscPosition = [1.4109610716428875, 103.81573680422855];
// const buangsp = [1.382214673463887, 103.87946762487518];
// const stadiumPosition = [1.3063600233940178, 103.87460627334167];


const markerOpacity = 0.6;
// const labelOpacity = 1.0
// const offset = [0,0]
/**
 * Weather map
 *
 * @param {Object} props
 * @param {Number} props.zoom zoom level
 * @param {Boolean} [props.dark] dark mode
 * @returns {JSX.Element} Weather map
 */
const WeatherMap = ({ zoom, dark }) => {
  // const MAP_CLICK_DEBOUNCE_TIME = 200; //ms
  const {
    //setMapPosition,
    panToCoords,
    setPanToCoords,
    browserGeo,
    mapGeo,
    mapApiKey,
    getMapApiKey,
    markerIsVisible,
    animateWeatherMap,
    customWP1,
    customWP2,
    customWP3,
    customWP4,
    customWP5,
    customWP6,
    mapTimestamp,
    setMapTimestamp
  } = useContext(AppContext);
  const mapRef = useRef();

  // const mapClickHandler = useCallback(
  //   debounce((e) => {
  //     const { lat: latitude, lng: longitude } = e.latlng;
  //     const newCoords = { latitude, longitude };
  //     setMapPosition(newCoords);
  //   }, MAP_CLICK_DEBOUNCE_TIME),
  //   [setMapPosition]
  // );

  const [mapTimestamps, setMapTimestamps] = useState(null);

  const [currentMapTimestampIdx, setCurrentMapTimestampIdx] = useState(0);

  const MAP_TIMESTAMP_REFRESH_FREQUENCY = 1000 * 60 * 10; // update every 10 minutes
  let MAP_CYCLE_RATE = 5000; //ms
  let MAP_CYCLE_RATE_LAST = 7000; //ms
  let currentMapCycle = MAP_CYCLE_RATE; //ms

  const getMapApiKeyCallback = useCallback(() => getMapApiKey(), [
    getMapApiKey,
  ]);
  function stringToWaypoint(customWPString)
  {
    let stringArray= customWPString.split(',');
    let numberArray = [0, 0];
    numberArray[0] = parseFloat(stringArray[0]);
    numberArray[1] = parseFloat(stringArray[1]);
    if(isNaN(numberArray[0]) ||isNaN(numberArray[1]))
      return null;
    return numberArray;
  }
  useEffect(() => {
    getMapApiKeyCallback().catch((err) => {
      console.log("err!", err);
    });

    const updateTimeStamps = () => {
      getMapTimestamps()
        .then((res) => {
          setMapTimestamps(res);
          console.log("updated timestamps");
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    const mapTimestampsInterval = setInterval(
      updateTimeStamps,
      MAP_TIMESTAMP_REFRESH_FREQUENCY
    );
    updateTimeStamps(); //initial update
    return () => {
      clearInterval(mapTimestampsInterval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Pan the screen to a a specific location when `panToCoords` is updated with grid coordinates
  useEffect(() => {
    if (panToCoords && mapRef.current) {
      const { leafletElement } = mapRef.current;
      leafletElement.panTo([panToCoords.latitude, panToCoords.longitude]);
      setPanToCoords(null); //reset back to null so we can observe a change next time its fired for the same coords
    }
  }, [panToCoords, mapRef]); // eslint-disable-line react-hooks/exhaustive-deps

  const { latitude, longitude } = browserGeo || {};

  useEffect(() => {
    if (mapTimestamps) {
      setMapTimestamp(mapTimestamps[currentMapTimestampIdx]);
    }
  }, [currentMapTimestampIdx, mapTimestamps, setMapTimestamp]);
  const updateAnimateMap = () =>
  {
    if(!animateWeatherMap)
    return;
    let nextIdx;
    if (currentMapTimestampIdx + 1 >= mapTimestamps.length) {
      nextIdx = 0;
    } else {
      nextIdx = currentMapTimestampIdx + 1;
    }
    console.log("map index: " + nextIdx);
    setCurrentMapTimestampIdx(nextIdx);
  };
  // cycle through weather maps when animated is enabled
  useEffect(() => {
    console.log("Use effect");
    let mapTimestampTimeout = null;
    let mapCycleTime = currentMapCycle;
    if (mapTimestamps) {
      if (animateWeatherMap) {
        if(currentMapTimestampIdx == mapTimestamps.length - 1) // second last frame
        mapCycleTime = MAP_CYCLE_RATE_LAST;
        else
        mapCycleTime = MAP_CYCLE_RATE;
        console.log("set timeout");
        mapTimestampTimeout = setTimeout(updateAnimateMap, mapCycleTime);
      } else {
        setCurrentMapTimestampIdx(mapTimestamps.length - 1);
      }
    }
    return () => {
      if(mapTimestampTimeout)
      {
        console.log("clear timeout");
        clearTimeout(mapTimestampTimeout);
      }
    };
  }, [currentMapTimestampIdx, animateWeatherMap, mapTimestamps, MAP_CYCLE_RATE, MAP_CYCLE_RATE_LAST, currentMapCycle]);

  if (!hasVal(latitude) || !hasVal(longitude) || !zoom || !mapApiKey) {
    return (
      <div className={`${styles.noMap} ${dark ? styles.dark : styles.light}`}>
        <div>Cannot retrieve map data.</div>
        <div>Did you enter an API key?</div>
      </div>
    );
  }
  const markerPosition = mapGeo ? [mapGeo.latitude, mapGeo.longitude] : null;
  return (
    <Map
      ref={mapRef}
      center={[latitude, longitude]}
      zoom={zoom}
      minZoom={zoom}
      maxZoom={zoom}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
      touchZoom={false} // was true
      dragging={false} // was true
      fadeAnimation={false}
      onClick={null} // was mapClickHandler 
      doubleClickZoom={false}
      zoomControl={false}
    >
      <AttributionControl position={"bottomleft"} />
      <TileLayer
        attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/${
          dark ? "dark-v10" : "light-v10"
        }/tiles/{z}/{x}/{y}?access_token={apiKey}`}
        apiKey={mapApiKey}
      />
      {mapTimestamp ? (
        <TileLayer
          attribution='<a href="https://www.rainviewer.com/">RainViewer</a>'
          url={`https://tilecache.rainviewer.com/v2/radar/${mapTimestamp}/{size}/{z}/{x}/{y}/{color}/{smooth}_{snow}.png`}
          opacity={0.3}
          size={256}
          color={6} // https://www.rainviewer.com/api.html#colorSchemes
          smooth={1.0}
          snow={0}
        />
      ) : null}
      {markerIsVisible && markerPosition ? (
        <Marker position={markerPosition} opacity={0.65}></Marker>
      ) : null}
       {customWP1 && stringToWaypoint(customWP1) ?  <Marker position={stringToWaypoint(customWP1)} opacity={markerOpacity}> </Marker>: null}
       {customWP2 && stringToWaypoint(customWP2) ?  <Marker position={stringToWaypoint(customWP2)} opacity={markerOpacity}> </Marker>: null}
       {customWP3 && stringToWaypoint(customWP3) ?  <Marker position={stringToWaypoint(customWP3)} opacity={markerOpacity}> </Marker>: null}
       {customWP4 && stringToWaypoint(customWP4) ?  <Marker position={stringToWaypoint(customWP4)} opacity={markerOpacity}> </Marker>: null}
       {customWP5 && stringToWaypoint(customWP5) ?  <Marker position={stringToWaypoint(customWP5)} opacity={markerOpacity}> </Marker>: null}
       {customWP6 && stringToWaypoint(customWP6) ?  <Marker position={stringToWaypoint(customWP6)} opacity={markerOpacity}> </Marker>: null}
        {/* <Marker position={helixPosition} opacity={markerOpacity}> </Marker>
        <Marker position={wwpPosition} opacity={markerOpacity}> </Marker>
        <Marker position={bishanSPPosition} opacity={markerOpacity}> </Marker>
        <Marker position={buangsp} opacity={markerOpacity}></Marker>
        <Marker position={nscPosition} opacity={markerOpacity} > </Marker>
        <Marker position={stadiumPosition} opacity={markerOpacity} ></Marker> */}
    </Map>
  );
};

{/* <Tooltip className={styles.tooltip} direction="bottom" offset={offset} opacity={labelOpacity} permanent>{"helix"}</Tooltip> */}

WeatherMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  dark: PropTypes.bool,
};

/**
 * Weather layer
 *
 * @param {Object} props
 * @param {String} props.layer
 * @param {String} props.weatherApiKey
 * @returns {JSX.Element} Weather layer
 */
const WeatherLayer = ({ layer, weatherApiKey }) => {
  return (
    <TileLayer
      attribution='&amp;copy <a href="https://openweathermap.org/">OpenWeather</a>'
      url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${weatherApiKey}`}
      apiKey
    />
  );
};

WeatherLayer.propTypes = {
  layer: PropTypes.string.isRequired,
  weatherApiKey: PropTypes.string,
};

/**
 * Determines if truthy, but returns true for 0
 *
 * @param {*} i
 * @returns {Boolean} If truthy or zero
 */
function hasVal(i) {
  return !!(i || i === 0);
}

/**
 * Get timestamps for weather map
 *
 * @returns {Promise} Promise of timestamps
 */
function getMapTimestamps() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://api.rainviewer.com/public/maps.json")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default WeatherMap;
