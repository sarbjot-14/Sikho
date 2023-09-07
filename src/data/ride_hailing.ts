import { namedColor, transparentize } from '../utils/GraphUtils';

export const RideHailingLabels = [2020, 2021, 2021];

const RideHailingTripData = [
  {
    label: 'Waymo',
    data: [10000, 30000, 40000],
  },
  //   {
  //     label: 'Uber (manual)',
  //     data: [4900000000, 6300000000, 7600000000],
  //   },
  {
    label: 'Lift (manual)',
    data: [250000000, 267000000, 320400000],
  },
  {
    label: 'Cruise',
    data: [undefined, undefined, 2783],
  },
];

const RideHailingCostData = [
  {
    label: 'Waymo',
    data: [undefined, undefined, 30],
  },
  //   {
  //     label: 'Uber (manual)',
  //     data: [22, 22, 22],
  //   },
  {
    label: 'Lift (manual)',
    data: [25, 35, 35],
  },
  {
    label: 'Cruise',
    data: [undefined, undefined, 20],
  },
];

export const RideHailingTripDataSets = RideHailingTripData.map(
  (dataset: any, index: number) => {
    const dsColor = namedColor(index);
    return {
      ...dataset,
      backgroundColor: transparentize(dsColor, 0.5),
      borderColor: dsColor,
    };
  },
);

export const RideHailingCostDataSets = RideHailingCostData.map(
  (dataset: any, index: number) => {
    const dsColor = namedColor(index);
    return {
      ...dataset,
      backgroundColor: transparentize(dsColor, 0.5),
      borderColor: dsColor,
    };
  },
);
