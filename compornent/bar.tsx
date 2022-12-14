import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
  );

// レンダリング
export default function BarGraph(props): JSX.Element | null {
  const { A, B, C, D } = props;

  const data = {
    // x 軸のラベル
    labels: ["みんなの回答"],
    datasets: [
      {
        label: "【A】",
        // データの値
        data: [A],
        // グラフの背景色
        backgroundColor: "pink",
      },
      {
        label: "【B】",
        // データの値
        data: [B],
        // グラフの背景色
        backgroundColor: "lightgreen",
      },
      {
        label: "【C】",
        // データの値
        data: [C],
        // グラフの背景色
        backgroundColor: "yellow",
      },
      {
        label: "【D】",
        // データの値
        data: [D],
        // グラフの背景色
        backgroundColor: "blue",
      },
    ],
  };

  const options: any = {
    scale: {
      ticks: {
        min: 0,
        max: 100,
        stepSize: 10,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
