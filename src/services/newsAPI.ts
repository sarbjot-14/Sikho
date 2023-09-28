export const getArticles = async (searchTitle: string) => {
  var requestOptions = {
    method: 'GET',
  };

  var params = {
    api_token: 'ksduvoWB2NmbrrI6iJMXMj2BnavfqEoHJaNC7cIb',
    categories: 'business',
    search: `"${searchTitle}" + (robot | expanding | automation) `,
    language: 'en',
    limit: '50',
  };

  var esc = encodeURIComponent;
  var query = Object.keys(params)
    .map(function (k) {
      return esc(k) + '=' + esc(params[k as keyof typeof params]);
    })
    .join('&');

  const response = await fetch(
    'https://api.thenewsapi.com/v1/news/all?' + query,
    requestOptions,
  );
  const results = await response.json();
  console.log('results is ', results);
  return results;
};

//getArticles();

export const mockData = [
  {
    categories: ['tech', 'entertainment', 'science', 'general'],
    description:
      'The company claims its 180-square mile Arizona territory is now the "largest fully autonomous service area in the world." Its range is expanding in SF too.',
    image_url:
      'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/92342af664211750bb540cac1971527a.jpg',
    keywords:
      'waymo, Waymo, X, Business, Finance, Robotics, Google, Self-driving cars, Technology, Internet, Emerging technologies, Transport, Vehicular automation, software, Robo-Taxi, Alphabet Inc., Sasway Panigrahi, Articles, Technology, GENERAL MOTORS, Gizmodo',
    language: 'en',
    published_at: '2023-05-04T15:42:00.000000Z',
    relevance_score: 34.51954,
    snippet:
      'The robot takeover may not be as exciting as promised, but it is expanding to a wider array of city streets. Waymo’s driverless taxis are coming to more parts...',
    source: 'paleofuture.gizmodo.com',
    title: 'Waymo Doubles Range of Its Self-Driving Taxi Service in Phoenix',
    url: 'https://gizmodo.com/google-waymo-self-driving-taxis-phoenix-sf-range-double-1850403196',
    uuid: 'ba475055-686e-4c77-a9d5-e3e3864c5dcf',
  },
  {
    categories: ['tech', 'business'],
    description:
      'According to Waymo, neither the safety operator nor the autonomous system braked to avoid the collision',
    image_url:
      'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202306/unnamed-sixteen_nine.jpg',
    keywords: 'Alphabet, waymo, google, self driving car, san francisco',
    language: 'en',
    published_at: '2023-06-08T05:54:06.000000Z',
    relevance_score: 33.4307,
    snippet:
      'A tragic incident occurred last month in San Francisco involving a Waymo robotaxi operating in autonomous mode. According to an incident report filed with the C...',
    source: 'businesstoday.in',
    title:
      'Alphabet-backed Waymo self-driving car kills dog in ‘unavoidable’ accident',
    url: 'https://www.businesstoday.in/technology/news/story/alphabet-backed-waymo-self-driving-car-kills-dog-in-unavoidable-accident-384714-2023-06-08',
    uuid: '32022f75-7a7a-4103-8b3e-468d7daa20a7',
  },
  {
    categories: ['tech'],
    description:
      'Automations’ impact on the workforce looms large! This is no longer a futuristic concept — it’s here and it’s transforming industries fast. With robots,...',
    image_url:
      'https://miro.medium.com/v2/resize:fit:1100/1*Ix7uLkHbxcfp8mKQFKBiwQ.jpeg',
    keywords: '',
    language: 'en',
    published_at: '2023-03-27T02:26:53.000000Z',
    relevance_score: 28.70071,
    snippet:
      'Workforce Without Workers: Top 3 Industries Taken Over by Automation\n\nAutomations’ impact on the workforce looms large! This is no longer a futuristic concept...',
    source: 'medium.com',
    title:
      'Workforce Without Workers: Top 3 Industries Taken Over by Automation',
    url: 'https://techtrendtracker.medium.com/workforce-without-workers-top-3-industries-taken-over-by-automation-2d12ee97b5cb',
    uuid: '85262d34-bce5-437e-983e-44139332c4ef',
  },
];
