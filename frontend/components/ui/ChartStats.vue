<template>
  <Line :data="{ ...data, datasets }" :options="options" />
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const props = defineProps({
  labels: {
    type: Array,
    requried: true,
  },
  datasets: {
    type: Array,
    requried: true,
  },
});

const data = ref({
  labels: props.labels,
});

const colorDefault = "#1d1b20";
const colorOpacityDefault = "#1d1b2033";

const options = {
  lineTension: 0.35,
  elements: {
    point: {
      backgroundColor: 'transparent',
      radius: 2.75,
      // radius: 0,
      // hoverRadius: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: colorDefault,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: colorDefault,
      },
      grid: {
        display: false,
        color: colorOpacityDefault,
      },
    },
    y: {
      beginAtZero: true,
      scaleStepWidth: 1,
      ticks: {
        color: colorDefault,
        stepSize: 1,
      },
      grid: {
        display: false,
        color: colorOpacityDefault,
      },
    },
  },
};
</script>
