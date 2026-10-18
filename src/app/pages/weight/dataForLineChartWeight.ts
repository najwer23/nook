export const dataForLineChartWeight = (arr: { date: string; weight: string }[], title: string) => {
  if (arr == null) {
    return null;
  }

  let labelX = arr.map((x) =>
    new Date(x.date).toLocaleString('en-EN', {
      day: '2-digit',
      month: 'short',
    }),
  );
  let labelY = arr.map((x) => Number(x.weight));

  return {
    labels: labelX,
    datasets: [
      {
        label: title,
        data: labelY,
        borderColor: '#525050',
        backgroundColor: '#525050',
        pointBackgroundColor: '#525050',
        lineTension: 0.25,
      },
    ],
  };
};
