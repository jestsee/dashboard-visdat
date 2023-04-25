import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleQuantile } from "d3";
import { IData } from "@/types/data";
import { Tooltip } from "react-tooltip";
import { Colord, colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

const geoUrl = "/features.json";

interface Props {
  data: IData[];
  onCountryChange: (country: string) => void;
}

const MapChart = ({ data, onCountryChange }: Props) => {
  // color scale
  const rateColorScale = scaleQuantile<string, string>()
    .domain(data.map((d) => parseFloat(d.Rate)))
    .range(["#F3CFB4", "#ED9E8C", "#DE6E6E"]); // change color here

  const gdpColorScale = scaleQuantile<string, string>()
    .domain(data.map((d) => parseFloat(d.GDP)))
    .range(["#E0F1BC", "#A1D99C", "#88BB96"]); // change color here

  const combinedColorScale = (rate?: string, gdp?: string): Colord => {
    const rateColor = (
      rate ? colord(rateColorScale(parseFloat(rate))) : colord("#F5F4F6")
    ).toRgb();
    const gdpColor = (
      gdp ? colord(gdpColorScale(parseFloat(gdp))) : colord("#F5F4F6")
    ).toRgb();

    // blend mode: darken
    const blendedColor = [
      Math.min(rateColor.r, gdpColor.r),
      Math.min(rateColor.g, gdpColor.g),
      Math.min(rateColor.b, gdpColor.b),
    ];

    const rgbColor = `rgb(${blendedColor[0]},${blendedColor[1]}, ${blendedColor[2]})`;
    return colord(rgbColor);
  };

  return (
    <>
      <ComposableMap
        style={{ height: "80vh" }}
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <ZoomableGroup center={[0, 0]}>
          {data.length > 0 && (
            <Geographies geography={geoUrl} id="map-chart">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.Code === geo.id);
                  if (!d) return;
                  return (
                    <Geography
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={d.Entity}
                      data-tooltip-place="top"
                      onClick={() => onCountryChange(geo.id)}
                      key={geo.rsmKey}
                      geography={geo}
                      fill={combinedColorScale(d.Rate, d.GDP).toHex()}
                      style={{
                        hover: {
                          fill: combinedColorScale(d.Rate, d.GDP)
                            .darken(0.15)
                            .toHex(),
                        },
                      }}
                      // rateColorScale(parseFloat(d.Rate))
                      // gdpColorScale(parseFloat(d.GDP))
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default MapChart;
