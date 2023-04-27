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
import { BaseProps } from "@/types/props";
import { MapMode } from "@/types/map";
import { converter } from "./LineChart";

extend([mixPlugin]);

const geoUrl = "/features.json";
const blankColor = "#F5F4F6";
interface Props extends BaseProps {
  data: IData[];
  mode?: MapMode;
  onCountryChange: (country: string) => void;
}

const MapChart = ({
  data,
  onCountryChange,
  className,
  mode = "all",
}: Props) => {
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

  const getTooltip = (country: string, gdp?: string, rate?: string) => {
    let content = "<div><b>" + country + "</b>";
    content =
      gdp && (mode == "all" || mode == "gdp")
        ? content +
          "<p><small>" +
          gdp.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          " USD</small></p>"
        : content;
    content =
      rate && (mode == "all" || mode == "rate")
        ? content + "<p><small>" + converter(parseFloat(rate)) + "%</small></p>"
        : content;
    content = content + "</div>";
    return content;
  };

  return (
    <div>
      <ComposableMap
        projection="geoMercator"
        className={className}
        height={400}
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 100,
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
                      // data-tooltip-content={d.Entity}
                      data-tooltip-html={getTooltip(d.Entity, d.GDP, d.Rate)}
                      data-tooltip-place="top"
                      data-tooltip-float="true"
                      onClick={() => onCountryChange(geo.id)}
                      key={geo.rsmKey}
                      geography={geo}
                      fill={color.toHex()}
                      style={{
                        hover: {
                          fill: color.darken(0.15).toHex(),
                          outline: "none",
                          stroke: "#46474a",
                          strokeWidth: 0.4,
                        },
                        default: {
                          outline: "none",
                          stroke: "#46474a",
                          strokeWidth: 0.2,
                          transition: "fill 150ms linear",
                        },
                        pressed: {
                          outline: "none",
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
