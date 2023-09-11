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
import { Labels } from '../../data/ride_hailing';

import { useState } from 'react';
import { namedColor, transparentize } from '../../utils/GraphUtils';
import { NumberFormat } from '../../utils';
import { Button } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

enum GraphMode {
  UNITS = 'UNITS',
  COST = 'COST',
  REVENUE_SHARE = 'REVENUE_SHARE5',
}

const Graphs = ({ industryData }: any) => {
  const [currentGraphMode, setCurrentGraphMode] = useState(GraphMode.COST);

  const chartRef = useRef();
  const options = {
    elements: {
      point: {
        radius: 10,
      },
    },
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: any, index: any, ticks: any) {
            return (
              (currentGraphMode === GraphMode.UNITS ? '' : '$') +
              NumberFormat(value)
            );
          },
        },
      },
    },
    responsive: true,

    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text:
          currentGraphMode === GraphMode.UNITS
            ? industryData.unitTitle
            : currentGraphMode === GraphMode.COST
            ? industryData.costTitle
            : industryData.salesTitle,
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
            let bodyLines = tooltipModel.body.map(getBody);

            bodyLines = bodyLines.map((line: any) => {
              return (
                line[0].split(':')[0] +
                ': ' +
                (currentGraphMode === GraphMode.UNITS ? '' : '$') +
                NumberFormat(line[0].split(':')[1])
              );
            });

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

  const getGraphData = () => {
    if (currentGraphMode === GraphMode.UNITS) {
      return {
        labels: Labels,
        datasets: industryData.unitData,
      };
    } else if (currentGraphMode === GraphMode.COST) {
      return {
        labels: Labels,
        datasets: industryData.costData,
      };
    } else if (currentGraphMode === GraphMode.REVENUE_SHARE) {
      const revenueShareDataSets: any = [];
      // let revenueShareDataSet: any = [];
      for (let k = 0; k < industryData.unitData.length; k++) {
        let unitsArray = industryData.unitData[k].data;
        let costsArray = industryData.costData[k].data;

        let revenueArray: any = unitsArray.map(function (
          unitNumber: any,
          index: any,
        ) {
          if (unitsArray[index] && costsArray[index]) {
            return unitsArray[index] * costsArray[index];
          } else {
            return undefined;
          }
        });

        const dsColor = namedColor(k);
        revenueShareDataSets.push({
          label: industryData.unitData[k].label,
          data: revenueArray,
          backgroundColor: transparentize(dsColor, 0.5),
          borderColor: dsColor,
        });
      }
      console.log({
        labels: Labels,
        datasets: revenueShareDataSets,
      });
      return {
        labels: Labels,
        datasets: revenueShareDataSets,
      };
    }
  };
  const onClick = (event: any) => {
    console.log(getElementAtEvent(chartRef.current!, event));
  };
  const data = getGraphData();

  return (
    <div className="lg:px-10 lg:py-5 lg:my-10 flex flex-col items-center bg-gray-100 rounded-xl">
      <Line ref={chartRef} options={options} data={data!} onClick={onClick} />

      <ul className="flex flex-col lg:flex-row text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="mr-2">
          <button
            onClick={() => {
              setCurrentGraphMode(GraphMode.UNITS);
            }}
            className={`inline-block px-8 py-3 ${
              currentGraphMode === GraphMode.UNITS
                ? 'text-white bg-primary rounded-lg active text-white'
                : 'rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            }`}
            aria-current="page"
          >
            {industryData.unitTitle}
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => {
              setCurrentGraphMode(GraphMode.COST);
            }}
            className={`inline-block px-8 py-3 ${
              currentGraphMode === GraphMode.COST
                ? 'text-white bg-primary rounded-lg active text-white'
                : 'rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            }`}
          >
            {industryData.costTitle}
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => {
              setCurrentGraphMode(GraphMode.REVENUE_SHARE);
            }}
            className={`inline-block px-8 py-3 ${
              currentGraphMode === GraphMode.REVENUE_SHARE
                ? 'text-white bg-primary rounded-lg active text-white'
                : 'rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            }`}
          >
            {industryData.salesTitle}
          </button>
        </li>
      </ul>
      <div className="flex justify-center m-10 gap-10">
        <p className="w-2/3 ">
          Some data points are estimations due to incomplete data sources. Help
          build our dataset by making a submission
        </p>
        <Button className="max-h-16" color="primary" variant="outlined">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Graphs;