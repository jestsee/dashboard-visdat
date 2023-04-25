import { useEffect, useState } from "react";
import "./App.css";
import MapChart from "@/components/MapChart";
import { csv } from "d3";
import { IData } from "./types/data";
import LineChart from "@/components/LineChart";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const [rawData, setRawData] = useState<IData[]>([]);
  const [mapData, setMapData] = useState<IData[]>([]);
  const [lineData, setLineData] = useState<IData[]>([]);
  const [country, setCountry] = useState("IDN");

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

  return (
    <>
      <div>
        <MapChart data={mapData} onCountryChange={setCountry} />
        <div className="" style={{ height: "50vh" }}>
          <LineChart data={lineData} />
        </div>
      </div>
    </>
  );
}

export default App;
