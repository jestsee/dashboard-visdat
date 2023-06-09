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
  Filler,
} from "chart.js";
import { IData } from "@/types/data";
import { LineMode } from "@/types/map";
import { BaseProps } from "@/types/props";
import { converter } from "@/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props extends BaseProps {
  data: IData[];
  mode: LineMode;
}

const LineChart = ({ data, mode, className }: Props) => {
  return (
    <Line
      id="line-chart"
      options={{
        plugins: {
          title: {
            display: true,
            text: data[0]
              ? `    ${data[0].Entity}'s ${
                  mode === "GDP" ? "GDP" : "Mortality Rate"
                }`
              : "Loading..",
            align: "start",
            font: { size: 16, weight: "600", family: "Inter" },
            padding: { bottom: 12, top: 12 },
          },
          legend: {
            display: false,
          },
          tooltip: {
            padding: { x: 12, y: 10 },
            titleFont: { family: "Inter", size: 14 },
            bodyFont: { family: "Inter" },
            callbacks: {
              label: function (tooltipItem) {
                return `  ${tooltipItem.dataset.label}: ${converter(
                  tooltipItem.parsed.y
                )} ${mode === "Rate" ? "%" : ""}`;
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              display: false,
              autoSkip: true,
              maxTicksLimit: 8,
              callback(tickValue) {
                return converter(tickValue as number);
              },
            },
          },
        },
      }}
      className={className}
      datasetIdKey="id"
      data={{
        labels: data.map((item) => item.Year),
        datasets: [
          {
            label: data[0] ? data[0].Code : "Loading",
            data: data.map((item) => item[mode as keyof typeof item]),
            borderColor: mode === "GDP" ? "#88BB96" : "#DE6E6E",
            borderWidth: 3.6,
            pointBackgroundColor: mode === "GDP" ? "#88BB96" : "#DE6E6E",
            pointRadius: 3.6,
            fill: "start",
            tension: 0.5, // atur kelengkungan
            backgroundColor: ({ chart: { ctx } }) => {
              const tempGradient = ctx.createLinearGradient(0, 0, 0, 240);
              tempGradient.addColorStop(
                0,
                mode === "GDP"
                  ? "rgba(136,187,150, 1)"
                  : "rgba(222, 110, 110, 1)"
              );
              tempGradient.addColorStop(1, "rgba(255,255,255, 0)");
              return tempGradient;
            },
          },
        ],
      }}
    />
  );
};

export default LineChart;
