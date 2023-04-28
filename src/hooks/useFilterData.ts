import { Country, IData } from "@/types/data";
import { MapMode } from "@/types/map";
import { csv } from "d3";
import { useEffect, useState } from "react";

export const useFilterData = () => {
  const [rawData, setRawData] = useState<IData[]>([]);
  const [mapMode, setMapMode] = useState<MapMode>('all');
  const [mapData, setMapData] = useState<IData[]>([]);
  const [lineData, setLineData] = useState<IData[]>([]);
  const [country, setCountry] = useState('IDN');
  const [year, setYear] = useState("2020");

  const countryList: Country[] = [...new Map(rawData.map(item =>
    [item['Code'], item])).values()].map((item) => ({ code: item.Code, entity: item.Entity }));

  useEffect(() => {
    csv("/df_categorized.csv").then((tempData) => {
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

  return { mapData, year, lineData, mapMode, countryList, country, setMapMode, setYear, setCountry }
}