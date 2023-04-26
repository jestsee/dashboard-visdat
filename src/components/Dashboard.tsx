import { LineChart, MapChart, Slider } from "@/components";
import { useFilterData } from "@/hooks/useFilterData";

function Dashboard() {
  const { lineData, mapData, year, setCountry, setYear } = useFilterData();

  return (
    <>
      <div>
        <MapChart
          data={mapData}
          onCountryChange={setCountry}
          className="w-[80vw] bg-slate-50"
        />
        <Slider
          onChange={setYear}
          value={year}
          years={Array.from({ length: 31 }, (_, i) => (1990 + i).toString())}
        />
        <div className="h-[50vh]">
          <LineChart data={lineData} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
