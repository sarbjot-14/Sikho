import React, { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import {
  getJobGrowthPoll,
  getOccupations,
  postJobGrowthPoll,
} from '../../services/sikhoAPI';
import { getIPAddress } from '../../services/ipService';

const ProjectionSlides = ({ industry, atRisk }: any) => {
  const [occupations, setOccupations] = useState<any[]>([]);
  const [pollValue, setPollValue] = useState<number>(0);
  const [polls, setPolls] = useState<any[]>([]);
  const [ip_address, setIp_address] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      let response = await getOccupations((industry + 1).toString());

      setOccupations(response.filter((occu: any) => occu.at_risk === atRisk));

      const address = await getIPAddress();
      setIp_address(address);
    };
    const fetchPolls = async () => {
      const pollResponse = await getJobGrowthPoll();
      setPolls(pollResponse);
    };
    fetchData();
    fetchPolls();
  }, [industry, atRisk]);

  const changePoll = (sign: string) => {
    if (sign === 'increment') {
      setPollValue((prevState) => prevState + 10);
    } else {
      setPollValue((prevState) => prevState - 10);
    }
  };
  const submitPoll = async (occupationId: number) => {
    console.log('submitting ', pollValue);
    const iPAddress = await getIPAddress();
    const response = await postJobGrowthPoll({
      percent_change: pollValue,
      ip_address: iPAddress,
      occupation_id: occupationId,
    });

    console.log('response', response);

    const pollResponse = await getJobGrowthPoll();

    setPolls(pollResponse);
    setPollValue(0);
  };
  const calculatePollPercentage = (occupationId: number) => {
    return (
      polls
        .filter((filterPoll: any) => filterPoll.occupation_id === occupationId)
        .reduce((total: number, poll: any) => total + poll.percent_change, 0) /
      polls.filter(
        (filterPoll: any) => filterPoll.occupation_id === occupationId,
      ).length
    );
  };
  return (
    <div className="w-full md:w-6/7 max-w-[700px] mx-auto h-[400px] ">
      <Swiper
        onActiveIndexChange={() => setPollValue(0)}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper "
      >
        {occupations.map((occupation: any) => {
          return (
            <SwiperSlide className="h-full">
              <div className="flex flex-col bg-slate-100 rounded-xl">
                <h2 className="bg-primary text-white rounded-t-xl text-center p-2">
                  {occupation.title.split('*')[0]},{' '}
                  {occupation.title.split('*')[1]}
                </h2>
                <div className="flex flex-col md:flex-row justify-around p-6">
                  <div className="bg-white flex flex-col gap-3 items-center p-4 m-2 md:p-8 md:m-5 rounded-xl">
                    <h3 className=" text-center text-sm md:textmd">
                      USER POLL
                    </h3>
                    {polls
                      .filter(
                        (filterPoll: any) =>
                          filterPoll.occupation_id === occupation.id,
                      )
                      .map((poll: any) => poll.ip_address)
                      .includes(ip_address) ? (
                      <div className="flex flex-col items-center">
                        <span
                          className={`${
                            calculatePollPercentage(occupation.id) <= 0
                              ? 'text-red-500'
                              : 'text-emerald-500 '
                          } font-raleway text-2xl md:text-4xl font-bold mr-2`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3.5}
                            stroke="currentColor"
                            className="w-8 h-8 inline text-3xl"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={`${
                                calculatePollPercentage(occupation.id) <= 0
                                  ? 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                                  : 'M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
                              } `}
                            />
                          </svg>
                          {calculatePollPercentage(occupation.id)}%
                        </span>
                        <p className="font-bold text-slate-400 text-center w-[70%] text-sm md:text-md">
                          {`${
                            calculatePollPercentage(occupation.id) <= 0
                              ? 'shrinkage of'
                              : 'growth of'
                          }
                        ${Math.abs(
                          Math.round(
                            occupation.currently_employed *
                              1000 *
                              (calculatePollPercentage(occupation.id) / 100),
                          ),
                        ).toLocaleString(undefined)} jobs 
                        by 2023`}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items center gap-5">
                        <div className="flex flex-row justify-center h-16 w-full rounded-lg relative bg-transparent mt-1">
                          <button
                            disabled={pollValue <= -300}
                            onClick={() => changePoll('decrement')}
                            data-action="decrement"
                            className=" bg-[#bffff8] text-gray-600 hover:text-gray-700 hover:bg-accent h-16 w-16 cursor-pointer outline-none rounded-full flex items-center justify-center"
                          >
                            <span className="m-auto text-2xl font-bold">−</span>
                          </button>
                          <div className="flex flex-col items-center">
                            <div className="flex">
                              <input
                                type="number"
                                className="outline-none focus:outline-none text-right  font-semibold  hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none font-raleway text-2xl md:text-3xl font-bold mr-2 w-14"
                                name="custom-input-number"
                                value={pollValue}
                              ></input>
                              <h2 className="my-auto m-1 font-raleway text-2xl md:text-3xl font-bold mr-2">
                                %
                              </h2>
                            </div>
                            <h2 className="my-auto ml-3 text-sm font-bold text-slate-400  ">
                              change by 2033
                            </h2>
                          </div>

                          <button
                            disabled={pollValue >= 300}
                            onClick={() => changePoll('increment')}
                            data-action="increment"
                            className="bg-[#bffff8] text-gray-600 hover:text-gray-700 hover:bg-accent h-16 w-16 cursor-pointer outline-none rounded-full flex items-center justify-center"
                          >
                            <span className="m-auto text-2xl font-bold">+</span>
                          </button>
                        </div>
                        <button
                          onClick={() => submitPoll(occupation.id)}
                          className="w-2/3 mx-auto bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="bg-white flex flex-col gap-3 items-center p-2 m-2 md:p-5 md:m-5 rounded-xl">
                    <h3 className=" text-center text-sm md:textmd">
                      U.S. BUREAU OF LABOR STATISTICS
                    </h3>
                    <div className="flex flex-col items-center">
                      <span
                        className={`${
                          occupation.decade_change_percentage <= 0
                            ? 'text-red-500'
                            : 'text-emerald-500 '
                        } font-raleway text-2xl md:text-4xl font-bold mr-2`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3.5}
                          stroke="currentColor"
                          className="w-8 h-8 inline text-3xl"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={`${
                              occupation.decade_change_percentage <= 0
                                ? 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                                : 'M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
                            } `}
                          />
                        </svg>
                        {occupation.decade_change_percentage}%
                      </span>
                      <p className="font-bold text-slate-400 text-center w-[70%] text-sm md:text-md">
                        {`${
                          occupation.decade_change_percentage <= 0
                            ? 'shrinkage of'
                            : 'growth of'
                        }
                        ${Math.abs(
                          Math.round(
                            occupation.currently_employed *
                              1000 *
                              (occupation.decade_change_percentage / 100),
                          ),
                        ).toLocaleString(undefined)} jobs 
                        by 2023`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProjectionSlides;
