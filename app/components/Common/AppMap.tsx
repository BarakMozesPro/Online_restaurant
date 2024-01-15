"use client";
import Map, { Layer, LineLayer, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState
} from "react";
import Image from "next/image";
import type { Feature, LineString } from "geojson";

type MapProps = {
width: number;
height: number;
};

const AppMap = ({ width, height }: MapProps) => {
const [viewState, setViewState] = useState({
latitude: 31.788469, // Starting latitude in Israel
longitude: 34.761259, // Starting longitude in Israel
zoom: 14,
});
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

// Update this GeoJSON data with coordinates in Israel
const geojson: Feature<LineString> = {
type: "Feature",
properties: {},
geometry: {
type: "LineString",
coordinates: [
// Example coordinates in Israel
[34.761259, 31.788469],
[34.762, 31.789],
// Add more coordinates as needed
],
},
};

const routeLayer: LineLayer = {
id: "route",
type: "line",
source: "route",
layout: {
"line-join": "round",
"line-cap": "round",
},
paint: {
"line-color": "#0ea5e9",
"line-width": 5,
},
};

return (
<Map
mapboxAccessToken={token}
{...viewState}
onMove={(evt) => setViewState(evt.viewState)}
style={{ width, height }}
mapStyle="mapbox://styles/mapbox/streets-v9"
>
<Marker longitude={34.761259} latitude={31.788469} anchor="bottom">
<Image src="/img/loc.png" alt="mappin" width={30} height={30} />
</Marker>

bash
Copy code
  <Source id="route" type
="geojson" data={geojson}>
<Layer {...routeLayer} />
</Source>
</Map>
);
};

export default AppMap;