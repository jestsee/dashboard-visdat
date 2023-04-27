import { LineChart, MapChart, Slider } from "@/components";
import { useFilterData } from "@/hooks/useFilterData";
import { MapMode } from "@/types/map";

function Dashboard() {
  const { lineData, mapData, year, mapMode, setMapMode, setCountry, setYear } =
    useFilterData();

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-1">
          Under-Five Mortality vs. Gross Domestic Product (GDP)
        </h1>
        <h3 className="text-xs mb-8">
          13519011 Jesica - 13519063 Melita - 13519101 Stefanus - 13519213
          Clarisa Natalia Edelin
        </h3>
        <div className="bg-white w-[800px] rounded-2xl p-4 pt-3">
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
            years={Array.from({ length: 10 }, (_, i) => (2010 + i).toString())}
          />
        </div>
        <div className="bg-white p-4 rounded-xl w-fit">
          <LineChart data={lineData} mode="Rate" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
