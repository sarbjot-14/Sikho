import { namedColor, transparentize } from '../utils/GraphUtils';

export const Labels = [2020, 2021, 2022];

const RideHailingTripData = [
  {
    label: 'Waymo',
    data: [10000, 30000, 40000],
    imageLink:
      'https://lh3.googleusercontent.com/J0ugh3MHXa6tgOeXoP0aS27NCHNURCHOl-bTqgLW2R8ACZFn2FxwTJWn9DGHA4tG7h6zvxiZrndU_HKwzXpJDbDvSrqQJWR3ItKz5fud=rw-w2880-e365',
    videoLink: 'https://www.youtube.com/embed/uKfAJDEkstg',
  },
  //   {
  //     label: 'Uber (manual)',
  //     data: [4900000000, 6300000000, 7600000000],
  //   },
  //   {
  //     label: 'Lift (manual)',
  //     data: [250000000, 267000000, 320400000],
  //   },
  {
    label: 'Cruise',
    data: [undefined, undefined, 2783],
    imageLink:
      'https://images.ctfassets.net/95kuvdv8zn1v/5o4wKdIkXUT7V2WZQciD9b/9007ad36565c4b0f4600a42f96b0adc5/brand_assets_icon_f3f5f8_bg.png?fit=fill&f=center&fm=jpg',
    videoLink: 'https://www.youtube.com/embed/HfcAsfmYbUA',
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
  //   {
  //     label: 'Lift (manual)',
  //     data: [25, 35, 35],
  //   },
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
