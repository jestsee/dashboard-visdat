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
import { LineMode } from "@/types/map";
import { BaseProps } from "@/types/props";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props extends BaseProps {
  data: IData[];
  mode: LineMode;
}

const LineChart = ({ data, mode, className }: Props) => {
  return (
    <Line
      options={{ responsive: true, maintainAspectRatio: false }}
      className={className}
      datasetIdKey="id"
      data={{
        labels: data.map((item) => item.Year),
        datasets: [
          {
            label: data[0] ? data[0].Code : "Loading",
            data: data.map((item) => item[mode as keyof typeof item]),
            tension: 0.4, // atur kelengkungan
          },
        ],
      }}
    />
  );
};

export default LineChart;
