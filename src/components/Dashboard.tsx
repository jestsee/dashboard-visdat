import { LineChart, MapChart, Slider } from "@/components";
import { useFilterData } from "@/hooks/useFilterData";
import { MapMode } from "@/types/map";
import MapLegend from "./MapLegend";
import Select from "react-select";

function Dashboard() {
  const {
    lineData,
    mapData,
    year,
    mapMode,
    countryList,
    setMapMode,
    setCountry,
    setYear,
  } = useFilterData();

  return (
    <>
      <div className="h-screen flex flex-col mx-8 xl:mx-[80px] pt-8 items-center">
        <div className="flex-none items-center mb-4" style={{ textAlign: "center" }}>
          <h1 className="text-xl font-bold mb-1">
            Under-Five Mortality vs. Gross Domestic Product (GDP)
          </h1>
          <p>
            <small>
              The data visualization aims to shed light on the correlation
              between child mortality rates under the age of five and the
              economic growth of each country.
            </small>
          </p>
        </div>
        <div className="flex-grow flex flex-col xl:flex-row xl:space-x-4 gap-4 w-full">
          <div className="xl:flex-grow">
            <div className="relative bg-white rounded-2xl p-4 pt-3 h-full">
              <div className="flex gap-3 items-center mb-3 justify-between">
                <p className="text-xs font-semibold">
                  Scroll or pinch to zoom in and out in map. Drag map to pan.
                  Hover and click a country to view details.
                </p>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => setMapMode(e.target.value as MapMode)}
                >
                  <option value="all">Mortality Rate & GDP</option>
                  <option value="rate">Mortality Rate</option>
                  <option value="gdp">GDP</option>
                </select>
              </div>
              <MapChart
                mode={mapMode}
                data={mapData}
                onCountryChange={setCountry}
                className="bg-gray-100 rounded-xl"
              />
              <MapLegend />
              <Slider
                className="mt-5"
                onChange={setYear}
                value={year}
                years={Array.from({ length: 11 }, (_, i) =>
                  (2010 + i).toString()
                )}
              />
            </div>
          </div>
          <div className="xl:flex-none xl:w-1/3 flex flex-col gap-4 justify-between w-full">
            <Select
              placeholder="Search country"
              onChange={(newValue) => setCountry(newValue?.value ?? "IDN")}
              options={countryList.map((item) => ({
                label: item.entity,
                value: item.code,
              }))}
            />
            <div className="bg-white p-4 rounded-xl w-full h-full relative">
              <LineChart
                data={lineData}
                mode="Rate"
                className="h-full w-full"
              />
            </div>
            <div className="bg-white p-4 rounded-xl w-full h-full relative">
              <LineChart data={lineData} mode="GDP" className="h-full w-full" />
            </div>
          </div>
        </div>
        <p className="flex-none mt-4" style={{ textAlign: "center" }}>
          <small>
            13519011 Jesica - 13519063 Melita - 13519101 Stefanus - 13519213
            Clarisa Natalia Edelin <br></br>
            Data source :{" "}
            <a
              href="https://ourworldindata.org/explorers/global-health?tab=table"
              style={{ color: "blue" }}
            >
              ourworldindata.org
            </a>{" "}
            and{" "}
            <a
              href="https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?end=2021&start=1960&view=chart&year=1990"
              style={{ color: "blue" }}
            >
              data.worldbank.org
            </a>
          </small>
        </p>
      </div>
    </>
  );
}

export default Dashboard;
