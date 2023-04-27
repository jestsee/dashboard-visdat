import { LineChart, MapChart, Slider } from "@/components";
import { useFilterData } from "@/hooks/useFilterData";
import { MapMode } from "@/types/map";

function Dashboard() {
  const { lineData, mapData, year, mapMode, setMapMode, setCountry, setYear } =
    useFilterData();

  return (
    <>
      <div className="mx-[80px] pt-8">
        <h1 className="text-2xl font-bold mb-1">
          Under-Five Mortality vs. Gross Domestic Product (GDP)
        </h1>
        <h3 className="text-xs mb-8">
          13519011 Jesica - 13519063 Melita - 13519101 Stefanus - 13519213
          Clarisa Natalia Edelin
        </h3>
        <div className="w-full grid grid-cols-7 gap-4">
          <div className="col-span-5">
            <div className="bg-white rounded-2xl p-4 pt-3">
              <div className="flex gap-3 items-center mb-3 justify-between">
                <p className="font-semibold">Bivariate Choropleth Map</p>
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
              <Slider
                className="mt-5"
                onChange={setYear}
                value={year}
                years={Array.from({ length: 10 }, (_, i) =>
                  (2010 + i).toString()
                )}
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-4 justify-between w-full">
            <div className="bg-white p-4 rounded-xl w-full h-full relative">
              <LineChart
                data={lineData}
                mode="Rate"
                className="h-full w-full"
              />
            </div>
            <div className="bg-white p-4 rounded-xl w-full h-full">
              <LineChart data={lineData} mode="GDP" className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
