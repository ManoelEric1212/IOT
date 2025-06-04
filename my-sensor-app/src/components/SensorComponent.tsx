/* eslint-disable @typescript-eslint/no-explicit-any */
// ** MUI Imports
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// ** Icon Imports

// ** Third Party Imports
// ** Icon Imports
// ** Third Party Imports
import type { ApexOptions } from "apexcharts";

// ** Custom Components Imports
import ReactApexChart from "react-apexcharts";

// const series = [
//   {
//     data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50]
//   }
// ]

interface dataOptions {
  data: any;
}

const transformData = (
  data: { name: string; data: { x: number; y: number }[] }[]
) => {
  return data.map((series) => ({
    data: series.data.map((point) => point.y),
  }));
};

const ApexLineChart = ({ data }: dataOptions) => {
  // ** Hook

  const theme = useTheme();

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ["#ff9f43"],
    stroke: { curve: "straight" },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ["#ff9f43"],
      strokeColors: ["#fff"],
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
        </div>`;
      },
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider },
      },
      labels: {
        style: { colors: theme.palette.text.disabled },
      },
      categories: [
        "7/12",
        "8/12",
        "9/12",
        "10/12",
        "11/12",
        "12/12",
        "13/12",
        "14/12",
        "15/12",
        "16/12",
        "17/12",
        "18/12",
        "19/12",
        "20/12",
        "21/12",
      ],
    },
  };

  return (
    <Card>
      <CardHeader
        title="Gráfico temperatura"
        subheader="Gráfico para elucidar a variação de temperatura em um ambiente"
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["flex-start", "center"],
          "& .MuiCardHeader-action": { mb: 0 },
          "& .MuiCardHeader-content": { mb: [2, 0] },
        }}
      />
      <CardContent>
        <ReactApexChart
          type="line"
          height={250}
          options={options}
          series={transformData(data)}
        />
      </CardContent>
    </Card>
  );
};

export default ApexLineChart;
