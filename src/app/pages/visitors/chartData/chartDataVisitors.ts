export const chartDataVisitors = (entries: [string, number][]) => ({
  labels: entries.map(([date]) => date),
  datasets: [
    {
      label: 'Visitors',
      data: entries.map(([, value]) => value),
    },
  ],
});
