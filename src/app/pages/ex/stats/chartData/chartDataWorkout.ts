export const chartDataWorkout = (arr: { reps: string; date: string; kind: string }[], title: string) => {
  if (arr == null) {
    return null;
  }

  let labelX = arr.map(
    (x) =>
      (x.kind == 'test' ? 'T ' : '') +
      new Date(x.date).toLocaleString('en-EN', {
        day: '2-digit',
        month: 'short',
      }),
  );
  let labelY = arr.map((x) => Number(x.reps));

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
