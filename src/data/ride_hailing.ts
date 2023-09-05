import { namedColor, transparentize } from '../utils/GraphUtils';
// export const Data = [
//   {
//     label: 'Dataset 1',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     borderColor: 'rgb(255, 99, 132)',
//     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//   },
//   {
//     label: 'Dataset 2',
//     data: [15, 29, 80, 21, 96, 55, 40],
//     borderColor: 'rgb(53, 162, 235)',
//     backgroundColor: 'rgba(53, 162, 235, 0.5)',
//   },
// ];

export const RideHailingLabels = [2020, 2021, 2021];

const RideHailingData = [
  {
    label: 'Waymo',
    data: [10000, 30000, 40000],
  },
  {
    label: 'Uber (manual)',
    data: [4900000000, 6300000000, 7600000000],
  },
  {
    label: 'Lift (manual)',
    data: [250000000, 267000000, 320400000],
  },
  {
    label: 'Cruise',
    data: [undefined, undefined, 2783],
  },
];

export const RideHailingDataSets = RideHailingData.map(
  (dataset: any, index: number) => {
    const dsColor = namedColor(index);
    return {
      ...dataset,
      backgroundColor: transparentize(dsColor, 0.5),
      borderColor: dsColor,
    };
  },
);
