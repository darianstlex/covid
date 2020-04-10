export const chartData = {
  theme: 'light',
  type: 'line',
  plot: {
    aspect: 'spline',
    tooltip: {
      text: '%t: %kt - %vt',
    },
  },
  legend: {
    x: '60px',
    y: '70px',
  },
  preview: {
    'background-color': '#d7d7d8',
    'border-width': 1,
    height: 50,
    'preserve-zoom': false,
    mask: {
      backgroundColor: 'white',
      alpha: 0.8,
    },
    handle: {
      'border-width': 2,
      height: '50px',
    },
    y: '85%',
  },
  zoom: {
    active: true,
    'preserve-zoom': false,
  },
  series: [{}],
};

export const scaleX = {
  zooming: true,
  zoomToValues: [30, 100],
  guide: {
    visible: true,
  },
};

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
