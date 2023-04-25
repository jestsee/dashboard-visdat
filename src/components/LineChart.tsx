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
  return (
    <>
      <Line
        datasetIdKey="id"
        data={{
          labels: data.map((item) => item.Year),
          datasets: [
            {
              // label: data[0].Code,
              data: data.map((item) => item.Rate),
              tension: 0.4, // atur kelengkungan
            },
          ],
        }}
      />
    </>
  );
};

export default LineChart;
