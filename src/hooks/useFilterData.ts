import { IData } from "@/types/data";
import { csv } from "d3";
import { useEffect, useState } from "react";

export const useFilterData = () => {
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

  return { mapData, year, lineData, setYear, setCountry }
}