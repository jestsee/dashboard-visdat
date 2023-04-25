import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IData } from "@/types/data";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: IData[];
}

const LineChart = ({ data }: Props) => {
  const [type, setType] = useState<"GDP" | "Rate">("Rate");

  const handleTypeChange = () => {
    if (type === "GDP") return setType("Rate");
    setType("GDP");
  };

  return (
    <>
      <div>
        <label className="label cursor-pointer">
          <span className="label-text">{type}</span>
          <input
            type="checkbox"
            className="toggle"
            onChange={handleTypeChange}
          />
        </label>
      </div>
      <Line
        datasetIdKey="id"
        data={{
          labels: data.map((item) => item.Year),
          datasets: [
            {
              // label: data[0].Code,
              data: data.map((item) => item[type as keyof typeof item]),
              tension: 0.4, // atur kelengkungan
            },
          ],
        }}
      />
    </>
  );
};

export default LineChart;
