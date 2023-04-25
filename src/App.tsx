import { useEffect, useState } from "react";
import "./App.css";
import MapChart from "@/components/MapChart";
import { csv } from "d3";
import { IData } from "./types/data";
import LineChart from "@/components/LineChart";
import "react-tooltip/dist/react-tooltip.css";
import Slider from "./components/Slider";

function App() {
  const [rawData, setRawData] = useState<IData[]>([]);
  const [mapData, setMapData] = useState<IData[]>([]);
  const [lineData, setLineData] = useState<IData[]>([]);
  const [country, setCountry] = useState("IDN");
  const [year, setYear] = useState("2020");

  useEffect(() => {
    csv("/df_countries_gdp.csv").then((tempData) => {
      const data = tempData as unknown as IData[];
      setRawData(data);
      setMapData(data.filter((item) => item.Year === "2020"));
      setLineData(data.filter((item) => item.Code === "IDN"));
    });
  }, []);

  useEffect(() => {
    setLineData(rawData.filter((item) => item.Code === country));
  }, [country, rawData]);

  useEffect(() => {
    setMapData(rawData.filter((item) => item.Year === year));
  }, [year, rawData]);

  return (
    <>
      <div>
        <MapChart data={mapData} onCountryChange={setCountry} />
        <Slider
          onChange={setYear}
          value={year}
          years={Array.from({ length: 31 }, (_, i) => (1990 + i).toString())}
        />
        <div className="" style={{ height: "50vh" }}>
          <LineChart data={lineData} />
        </div>
      </div>
    </>
  );
}

export default App;
