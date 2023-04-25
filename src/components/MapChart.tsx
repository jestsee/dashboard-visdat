import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear, csv, DSVRowArray } from "d3";
const geoUrl = "/features.json";

const colorScale = scaleLinear<string, string>()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState<DSVRowArray<string>>();

  useEffect(() => {
    csv(`/data.csv`).then((data) => {
      setData(data);
    });
  }, []);

  // TODO handle loading state
  if (!data) return <>Data isn't loaded</>;

  return (
    <ComposableMap
      style={{ height: "100vh" }}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} id="1" fill="transparent" /> */}
      {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
      {data.length > 0 && (
        <Geographies geography={geoUrl} id="map-chart">
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.id);
              if (!d) return;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    d["2017"] ? colorScale(parseFloat(d["2017"])) : "#F5F4F6"
                  }
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
