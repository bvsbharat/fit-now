
import React, { useRef, useEffect, useState } from 'react';
// import { useThemeProvider } from '../utils/ThemeContext';

import {
  Chart, DoughnutController, ArcElement, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
// import { tailwindConfig } from '../utils/Utils';


const hexToRGB = (h) => {
    let r = 0;
    let g = 0;
    let b = 0;
    if (h.length === 4) {
      r = `0x${h[1]}${h[1]}`;
      g = `0x${h[2]}${h[2]}`;
      b = `0x${h[3]}${h[3]}`;
    } else if (h.length === 7) {
      r = `0x${h[1]}${h[2]}`;
      g = `0x${h[3]}${h[4]}`;
      b = `0x${h[5]}${h[6]}`;
    }
    return `${+r},${+g},${+b}`;
};
  
const theme = {
        colors: {
            gray: {
                50: '#F9FAFB',
                100: '#F3F4F6',
                200: '#E5E7EB',
                300: '#BFC4CD',
                400: '#9CA3AF',
                500: '#6B7280',
                600: '#4B5563',
                700: '#374151',
                800: '#1F2937',
                900: '#111827',
                950: '#030712',
            },
            violet: {
                50: '#F1EEFF',
                100: '#E6E1FF',
                200: '#D2CBFF',
                300: '#B7ACFF',
                400: '#9C8CFF',
                500: '#8470FF',
                600: '#755FF8',
                700: '#5D47DE',
                800: '#4634B1',
                900: '#2F227C',
                950: '#1C1357',
            },
            sky: {
                50: '#E3F3FF',
                100: '#D1ECFF',
                200: '#B6E1FF',
                300: '#A0D7FF',
                400: '#7BC8FF',
                500: '#67BFFF',
                600: '#56B1F3',
                700: '#3193DA',
                800: '#1C71AE',
                900: '#124D79',
                950: '#0B324F',
            },
            green: {
                50: '#D2FFE2',
                100: '#B1FDCD',
                200: '#8BF0B0',
                300: '#67E294',
                400: '#4BD37D',
                500: '#3EC972',
                600: '#34BD68',
                700: '#239F52',
                800: '#15773A',
                900: '#0F5429',
                950: '#0A3F1E',
            },
            red: {
                50: '#FFE8E8',
                100: '#FFD1D1',
                200: '#FFB2B2',
                300: '#FF9494',
                400: '#FF7474',
                500: '#FF5656',
                600: '#FA4949',
                700: '#E63939',
                800: '#C52727',
                900: '#941818',
                950: '#600F0F',
            },
            yellow: {
                50: '#FFF2C9',
                100: '#FFE7A0',
                200: '#FFE081',
                300: '#FFD968',
                400: '#F7CD4C',
                500: '#F0BB33',
                600: '#DFAD2B',
                700: '#BC9021',
                800: '#816316',
                900: '#4F3D0E',
                950: '#342809',
            }
        }
};

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);


export const chartColors = {
    textColor: {
      light: theme.colors.gray["400"],
      dark: theme.colors.gray[500],
    },
    gridColor: {
      light: theme.colors.gray[100],
      dark: `rgba(${hexToRGB(theme.colors.gray[700])}, 0.6)`,
    },
    backdropColor: {
      light: theme.colors.white,
      dark: theme.colors.gray[800],
    },
    tooltipTitleColor: {
      light: theme.colors.gray[800],
      dark: theme.colors.gray[100],
    },
    tooltipBodyColor : {
      light: theme.colors.gray[500],
      dark: theme.colors.gray[400]
    },
    tooltipBgColor: {
      light: theme.colors.white,
      dark: theme.colors.gray[700],
    },
    tooltipBorderColor: {
      light: theme.colors.gray[200],
      dark: theme.colors.gray[600],
    },
  };

function DoughnutChart({
  data,
  width,
  height
}) {

  const [chart, setChart] = useState(null)
  const canvas = useRef(null);
  const legend = useRef(null);
//   const { currentTheme } = useThemeProvider();
  const darkMode = 'light';
  const { tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors; 

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        cutout: '80%',
        layout: {
          padding: 24,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleColor: darkMode ? tooltipTitleColor.dark : tooltipTitleColor.light,
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
           // Reuse the built-in legendItems generator
            // const items = c.options?.plugins?.legend?.labels?.generateLabels(c);
            // items.forEach((item) => {
            //   const li = document.createElement('li');
            //   li.style.margin = theme.margin[1];
            //   // Button element
            //   const button = document.createElement('button');
            //   button.classList.add('btn-xs', 'bg-white', 'dark:bg-gray-700', 'text-gray-500', 'dark:text-gray-400', 'shadow-sm', 'shadow-black/[0.08]', 'rounded-full');
            //   button.style.opacity = item.hidden ? '.3' : '';
            //   button.onclick = () => {
            //     c.toggleDataVisibility(item.index);
            //     c.update();
            //   };
            //   // Color box
            //   const box = document.createElement('span');
            //   box.style.display = 'block';
            //   box.style.width = theme.width[2];
            //   box.style.height = theme.height[2];
            //   box.style.backgroundColor = item.fillStyle;
            //   box.style.borderRadius = theme.borderRadius.sm;
            //   box.style.marginRight = theme.margin[1];
            //   box.style.pointerEvents = 'none';
            //   // Label
            //   const label = document.createElement('span');
            //   label.style.display = 'flex';
            //   label.style.alignItems = 'center';
            //   const labelText = document.createTextNode(item.text);
            //   label.appendChild(labelText);
            //   li.appendChild(button);
            //   button.appendChild(box);
            //   button.appendChild(label);
            //   ul.appendChild(li);
            // });
          },
        },
      ],
    });
    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update('none');
  });

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul ref={legend} className="flex flex-wrap justify-center -m-1"></ul>
      </div>
    </div>
  );
}

export default DoughnutChart;