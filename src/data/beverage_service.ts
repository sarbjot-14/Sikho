import { namedColor, transparentize } from '../utils/GraphUtils';

export const Labels = [2020, 2021, 2021];

const BeverageServiceLocationData = [
  {
    label: 'Blendid',
    data: [3, 3, 9],
    imageLink:
      'data:image/png;base64,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',
    videoLink: 'https://www.youtube.com/embed/-ZxkN-Ikb9Q',
  },

  {
    label: 'Cafe X',
    data: [0, 2, 3],
    imageLink:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEX///8gGzEbFS0dGC/8/P0ZEywcFi6vrrZFQ1IAAB/5+foVDimysbgbFi3z8vYYESthX2uNi5X09PU1MULn5+lWU2BAPUw6NkYRCSZwbnkuKjzb295QTVspJTm/vsR5d4HQz9SYlqDFxMqFg42lpKtcWmcNACTk4+hpZ3PNy9LW1dqgn6d8e4UAABYkHzRKSFUAAAAAAAtGAaxdAAAHXUlEQVR4nO2ca3eqOhCGgQS0EVHkKgoqogh26zn//88dsNbtJdMi0hLOmmft/amaldeZzCRhBklCEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARpCtr2BC5Q+vG/6TFZs0O+gjGLdD2eNTQjVg6oFwOmohjRiNcbz7KsjbmcNDEemyVTpxjPG6+WQmg03t3BSCOEjNT5qgkz5rvQV4vxtIF2jBoY71Xs6UCVz2iHsfHSYAaTWNQn5HNAxY0bmmZ92NS/zEeWiX98TaJkRMHo73iyGrQuMQ6uBBZsx7Y0qemr1JBo5Kk34w12zc73aYzFrUCZWFP7heH0o3I3XttGXPZvf3JZHgbrWfGHWlGVRfM7gTIJk4an/CS6dWfDMtws7JoK4/nwfjSZvLeb+JPwQaF8kM1ajmpEzr0Fyx9s+mLsehGeQpnIpiE9P6/cvff4EmXRrg1j99GvConb9fMC44AnUJbNdhXOHP60/phPSjQyb8QbiAQtb2uMNVdgkcfKtVh1V1kcJJZH/k+lHGc/KuD7ud1n/E+0QyGxqh3pZAn4grxd/ej8K8AWPn9qw3BlV84Zyw0g0N+0G0lLUm/An5wSmpMKbmoUnwEtOAqyn1fwLXYASBweqoSbQmAOrMFCYOv77hNL0IpWpYiaOsD3R5YQAo0vbKCEFfJiHgArWT0dDttfhyVL3nbrJDH4egNHKcvG0HePukBXURkkkVirr+IpNWZTDbBgX/+16VchOnJ3JKWr7UErFtpnO5mfT0eeSBaUGGPLPhAu5CCBlhKT8ikgUA1ikQSerm8jC7DiyO3x0mJ51ZGOCSDQ6pWfMYRSKS0twIpE6/G/YWxUwEWtnljazkRQ0tBkrkTjuOV/XnV1IW6CH6CRA8RFJbyfMpUm6RjIg8RLmEiPZa6J53yvk1Xv1u3oREqngMXPnxUj09/DojlkRfcu+M+mQJBR3ETINXiGRSGQ+rX+tURmQwKJL1QefIQufcBRh5fwUfhfOtWAg7OfUEEd9ESZv3Qf2md6521YIWEMpAniixtk/hKFUAg5nJOGcQSiqHZIRFd3Qvegw5SsS5RJ9gbIg5q1EthBr6C6CzhqkQhSe7kDfgAS7MUOMn+hiQUdpoL5HIy2YWnBjmic6KBEBYgxsqaeziAdUShJCZDuQLSh2Ykgc4GuhsDuBrDt0GykjuMXofsDEFB4KIfOCSzDjadU9dSP25xuealUHqbGYSVPJf7HnrUbufCGfOUevtVI/GAtxMVvHagRrYO30RciiboNp4IfJr6AFTO3lyvH8n1fUZXHf/42cMzY7tz6u/BRkMnSOHlfuP1H3EUSp6cQyjq4BG+hlPHorvEQBEEQ5GkotbMej8xuukvjtymnz+zIdMLwjUfYd1aZzaQOHpzOTCSW7x1/O4Ju8NWRYm32KatXbysCaWLJwJPhi8rBsNDY9kRrwuIddHN4wyDcRV00IjX0fsVrDKK5ZgfNSBPocp+DZq07J9HeH6p46MWM20XHJNL9c/elsvw27ZRE9vSddyHR6ZDESRJAzy0Gigouz/eWS7qrUwQZsOxkapoPnT8X9V1x1EkCPj+0evZkkjtQIU34/kJX2O9hgI/WymfAJakHSZQ7kTTAgpPLc3wphQoZid9yD1AVwFqMkfe3JDZ1oAeloicNSiOonoZY10WYM6jusliLQu9RDR1KE7c1UZKUgxIHa4HDDYMLTVz97o47H0MlGVa99sVfoDhNcDsI5XO94V0MyaA2i0KioGuR6h6UJh7qS8uPp30oaVhrQ8hnNRHQIgnVCEuZC1V/BWsRk8byDdqNQXXehaOCv0kj759oEipFb0CaGLhwa0i2gdai/C7U/RulRvzQmP85V++ruvvM4X+rcFS4E6UFKI35Xbzf9r7QeA5ZMTAn4lwYs9iBdjJfWlAqJYItUy7YbPP7ZFABO9nqlH0TMzJwG+QJU9MO9h+Sf6Aoek22hSKqJUbJsJGDPaR+FYGlFcGi4pUIEnOo30kNexUfuYCBWBvuf3j2FQB7udXyuFQxVsRwy1TrFWFgP75s7auHQs6Lac6MNm0fFzPgnQpKaD7x/JMyqPqdhNXW8s+xOnAVFieg5357Bt1fqeN2j1KzDX9e/z5fta0r3KGUfrsrcTbnhQjy1quxHelxU3/bL4riKlRks9ZgOndzq7abMLgKg1X1F7dcQ3se751MLSt83Der9buXioj6kFyJ1e6bB+zFw4wOq7oHu2KT3ntIGsRZNjnh50nusgVR6t8FFvnTeHTU95bPUPTuBPvnxctOqv97cxJTrbyhmdYmvn5XpfZW4zVmtxi962Yb1RJg6x0Hn++2GJJQf92ljF7weeFPlFCIlsR8FwwG6mAw8KaNvNXJyHbB6DRisBHhHbQFM309ne92ZtRUTEh1c7ebT9e6OLf7zM7TZi//7DS3RXDQn+V/rdCgEjVEuKNBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEOT3+Q9mmXHvkK4GYAAAAABJRU5ErkJggg==',
    videoLink: 'https://www.youtube.com/embed/E-b1GiQZ7jM',
  },
  {
    label: 'Artly The Barista Bot ',
    data: [0, 3, 9],
    imageLink:
      'data:image/png;base64,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',
    videoLink: 'https://www.youtube.com/embed/D8LSqdaORH4',
  },
  {
    label: 'Makr Shakr',
    data: [undefined, 12, 14],
    imageLink:
      'data:image/png;base64,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',
    videoLink: 'https://www.youtube.com/embed/fcScX-pFMkU',
  },
  {
    label: 'RC Coffee',
    data: [undefined, 1, 10],
    imageLink:
      'data:image/png;base64,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',
    videoLink: 'https://www.youtube.com/embed/JEQambkCuVw',
  },
];

const BeverageServiceCostData = [
  {
    label: 'Blendid',
    data: [undefined, undefined, undefined],
  },

  {
    label: 'Cafe X',
    data: [undefined, undefined, undefined],
  },
  {
    label: 'Artly The Barista Bot ',
    data: [0, 10000, 101000],
  },
  {
    label: 'Makr Shakr',
    data: [undefined, undefined, undefined],
  },
  {
    label: 'RC Coffee',
    data: [undefined, undefined, undefined],
  },
];

export const BeverageServiceLocationDataSets = BeverageServiceLocationData.map(
  (dataset: any, index: number) => {
    const dsColor = namedColor(index);
    return {
      ...dataset,
      backgroundColor: transparentize(dsColor, 0.5),
      borderColor: dsColor,
    };
  },
);

export const BeverageServiceCostDataSets = BeverageServiceCostData.map(
  (dataset: any, index: number) => {
    const dsColor = namedColor(index);
    return {
      ...dataset,
      backgroundColor: transparentize(dsColor, 0.5),
      borderColor: dsColor,
    };
  },
);
