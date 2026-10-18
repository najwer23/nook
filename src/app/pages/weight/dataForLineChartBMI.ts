export const dataForLineChartBMI = (arr: { date: string; weight: string }[], title: string) => {
  if (arr == null) {
    return null;
  }

  let labelX = arr.map((x) =>
    new Date(x.date).toLocaleString('en-EN', {
      day: '2-digit',
      month: 'short',
    }),
  );
  let labelY = arr.map((x) => Number(x.weight) / 4);

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
        pointRadius: 5,
        zIndex: 10,
      },
      // Obesity III°: BMI ≥ 40
      // Obesity III°: BMI ≥ 40 — deep purple
      {
        label: 'Obesity III°',
        data: Array(labelY.length).fill(60),
        borderColor: 'rgb(226, 66, 0)',
        borderDash: [6, 4],
        borderWidth: 1.5,
        backgroundColor: 'rgba(226, 66, 0, 0.4)',
        tension: 0,
        fill: '+1',
        pointRadius: 0,
      },
      {
        label: '_ob3_bottom',
        data: Array(labelY.length).fill(40),
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'rgba(226, 66, 0, 0.4)',
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
      // Obesity II°: 35–39.9 — cyan
      {
        label: 'Obesity II°',
        data: Array(labelY.length).fill(39.9),
        borderColor: 'rgb(245, 159, 2)',
        borderDash: [6, 4],
        borderWidth: 2,
        backgroundColor: 'rgba(245, 159, 2, 0.5)',
        tension: 0,
        fill: '+1',
        pointRadius: 0,
      },
      {
        label: '_ob2_bottom',
        data: Array(labelY.length).fill(35),
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'rgba(245, 159, 2, 0.5)',
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
      // Obesity I°: 30–34.9 — lime
      {
        label: 'Obesity I°',
        data: Array(labelY.length).fill(34.9),
        borderColor: 'rgb(251, 185, 2)',
        borderDash: [6, 4],
        borderWidth: 2,
        backgroundColor: 'rgba(251, 185, 2, 0.4)',
        tension: 0,
        fill: '+1',
        pointRadius: 0,
      },
      {
        label: '_ob1_bottom',
        data: Array(labelY.length).fill(29.9),
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'rgba(251, 185, 2, 0.4)',
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
      // Overweight: 25–29.9 — amber
      {
        label: 'Overweight',
        data: Array(labelY.length).fill(29.9),
        borderColor: 'rgb(134, 195, 40)',
        borderDash: [6, 4],
        borderWidth: 1.5,
        backgroundColor: 'rgba(134, 195, 40, 0.4)',
        tension: 0,
        fill: '+1',
        pointRadius: 0,
      },
      {
        label: '_overweight_bottom',
        data: Array(labelY.length).fill(25),
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'rgba(134, 195, 40, 0.4)',
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
      // Normal weight: 18.5–24.9
      {
        label: 'Normal weight',
        data: Array(labelY.length).fill(24.9),
        borderColor: 'rgb(0, 197, 103)',
        borderDash: [6, 4],
        borderWidth: 1.5,
        backgroundColor: 'rgba(0, 197, 103, 0.4)',
        tension: 0,
        fill: '+1',
        pointRadius: 0,
      },
      {
        label: '_normal_bottom',
        data: Array(labelY.length).fill(18.5),
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'rgba(0, 197, 103, 0.4)',
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
      // Underweight: < 18.5
      {
        label: 'Underweight',
        data: Array(labelY.length).fill(18.5),
        borderColor: 'rgb(0, 185, 207)',
        borderDash: [6, 4],
        borderWidth: 1.5,
        backgroundColor: 'rgba(0, 185, 207, 0.4)',
        tension: 0,
        fill: '+1',
        pointRadius: 0,
      },
      {
        label: '_underweight_bottom',
        data: Array(labelY.length).fill(0),
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'rgba(0, 185, 207, 0.4)',
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
    ],
  };
};
