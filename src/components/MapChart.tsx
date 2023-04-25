import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3";
import { IData } from "@/types/data";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

const geoUrl = "/features.json";

interface Props {
  data: IData[];
}

const MapChart = ({ data }: Props) => {
  // color scale
  const rateColorScale = scaleQuantile<string, string>()
    .domain(data.map((d) => parseFloat(d.Rate)))
    .range(["#F3CFB4", "#ED9E8C", "#DE6E6E"]); // change color here

  const gdpColorScale = scaleQuantile<string, string>()
    .domain(data.map((d) => parseFloat(d.GDP)))
    .range(["#E0F1BC", "#A1D99C", "#88BB96"]); // change color here

  const combinedColorScale = (rate?: string, gdp?: string): string => {
    const rateColor = (
      rate ? colord(rateColorScale(parseFloat(rate))) : colord("#00000000")
    ).toRgb();
    const gdpColor = (
      gdp ? colord(gdpColorScale(parseFloat(gdp))) : colord("#00000000")
    ).toRgb();

    // blend mode: darken
    const blendedColor = [
      Math.min(rateColor.r, gdpColor.r),
      Math.min(rateColor.g, gdpColor.g),
      Math.min(rateColor.b, gdpColor.b),
    ];

    const rgbColor = `rgb(${blendedColor[0]},${blendedColor[1]}, ${blendedColor[2]})`;
    return colord(rgbColor).toHex();
  };

  return (
    <ComposableMap
      style={{ height: "100vh" }}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      {data.length > 0 && (
        <Geographies geography={geoUrl} id="map-chart">
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.Code === geo.id);
              if (!d) return;
              return (
                <Geography
                  onClick={() => console.log("alo", geo.id)}
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    d.Rate && d.GDP
                      ? combinedColorScale(d.Rate, d.GDP)
                      : // rateColorScale(parseFloat(d.Rate))
                        // gdpColorScale(parseFloat(d.GDP))
                        "#F5F4F6"
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
