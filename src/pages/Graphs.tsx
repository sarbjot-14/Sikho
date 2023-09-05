import React, { useRef } from 'react';
import Chart from 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScaleOptionsByType,
} from 'chart.js';
import { Line, getElementAtEvent } from 'react-chartjs-2';
import { RideHailingDataSets, RideHailingLabels } from '../data/ride_hailing';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Ride Hailing Trips',
    },

    tooltip: {
      enabled: false,
      external: (context: any) => {
        // Tooltip Element
        let tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem: any) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = '<thead>';

          titleLines.forEach(function (title: any) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function (body: any, i: any) {
            const colors = tooltipModel.labelColors[i];
            let style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            const span = '<span style="' + style + '">' + body + '</span>';
            innerHtml += '<tr><td >' + span + '</td></tr>';
          });
          innerHtml +=
            '<tr><td style="font-size:15px;">' +
            'Click for more info' +
            '</td></tr>';
          innerHtml += '</tbody>';

          let tableRoot = tooltipEl.querySelector('table');
          tableRoot!.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();

        //const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

        // Display, position, and set styles for font
        tooltipEl.style.opacity = '1';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top =
          position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        // tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding =
          tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      },
    },
  },
};

const Graphs = () => {
  const chartRef = useRef();
  const onClick = (event: any) => {
    console.log('woooo');
    console.log(getElementAtEvent(chartRef.current!, event));
  };
  const data = {
    labels: RideHailingLabels,
    datasets: RideHailingDataSets,
  };

  return (
    <div className="p-20">
      <Line ref={chartRef} options={options} data={data} onClick={onClick} />
    </div>
  );
};

export default Graphs;
