import { useEffect, useState } from "react";
import "./App.css";
import MapChart from "@/components/MapChart";
import { csv } from "d3";
import { IData } from "./types/data";

function App() {
  const [rawData, setRawData] = useState<IData[]>([]);
  const [filteredData, setFilteredData] = useState<IData[]>([]);

  useEffect(() => {
    csv("/df_countries_gdp.csv").then((tempData) => {
      const data = tempData as unknown as IData[];
      setRawData(data);
      setFilteredData(data.filter((item) => item.Year === "2020"));
    });
  }, []);
  return (
    <>
      <div>
        <MapChart data={filteredData} />
      </div>
    </>
  );
}

export default App;
