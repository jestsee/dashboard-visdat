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
import { useState } from "react";
import { BaseProps } from "@/types/props";

extend([mixPlugin]);

const geoUrl = "/features.json";
const blankColor = "#F5F4F6";
interface Props extends BaseProps {
  data: IData[];
  onCountryChange: (country: string) => void;
}

type Mode = "all" | "rate" | "gdp";

const MapChart = ({ data, onCountryChange, className }: Props) => {
  const [mode, setMode] = useState<Mode>("all");

  // color scale
  const rateColorScale = scaleQuantile<string, string>()
    .domain(data.map((d) => parseFloat(d.Rate)))
    .range(["#F3CFB4", "#ED9E8C", "#DE6E6E"]); // change color here

  const gdpColorScale = scaleQuantile<string, string>()
    .domain(data.map((d) => parseFloat(d.GDP)))
    .range(["#E0F1BC", "#A1D99C", "#88BB96"]); // change color here

  const combinedColorScale = (rate?: string, gdp?: string): Colord => {
    const rateColor = (
      rate ? colord(rateColorScale(parseFloat(rate))) : colord(blankColor)
    ).toRgb();
    const gdpColor = (
      gdp ? colord(gdpColorScale(parseFloat(gdp))) : colord(blankColor)
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

  const getColor = (rate?: string, gdp?: string): Colord => {
    switch (mode) {
      case "all":
        return combinedColorScale(rate, gdp);
      case "gdp":
        return colord(gdp ? gdpColorScale(parseFloat(gdp)) : blankColor);
      default:
        return colord(rate ? rateColorScale(parseFloat(rate)) : blankColor);
    }
  };

  return (
    <div className={className}>
      <select
        className="select w-full max-w-xs absolute"
        onChange={(e) => setMode(e.target.value as Mode)}
      >
        <option value="all">Mortality Rate & GDP</option>
        <option value="rate">Mortality Rate</option>
        <option value="gdp">GDP</option>
      </select>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 157,
        }}
      >
        <ZoomableGroup center={[20, 0]}>
          {data.length > 0 && (
            <Geographies geography={geoUrl} id="map-chart">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.Code === geo.id);
                  if (!d) return;
                  const color = getColor(d.Rate, d.GDP);
                  return (
                    <Geography
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={d.Entity}
                      data-tooltip-place="top"
                      onClick={() => onCountryChange(geo.id)}
                      key={geo.rsmKey}
                      geography={geo}
                      fill={color.toHex()}
                      style={{
                        hover: {
                          fill: color.darken(0.15).toHex(),
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default MapChart;
