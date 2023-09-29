import React, { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { getOccupations } from '../../services/sikhoAPI';

const ProjectionSlides = ({ industry }: any) => {
  const [occupations, setOccupations] = useState<any[]>([]);

  useEffect(() => {
    console.log('wwwwiiiiiii', industry);
    const fetchData = async () => {
      const updatedIndustries = [];
      let response = await getOccupations((industry + 1).toString());

      //   for (let k = 0; k < response.length; k++) {
      //     let companies = await fetchCompanies(response[k].id);
      //     response[k].companies = companies;
      //   }

      setOccupations(response);
      console.log('occupations are ', response);
    };
    fetchData();
  }, [industry]);
  return (
    <div className="w-full md:w-6/7 max-w-[700px] mx-auto h-[400px] ">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper ">
        {occupations.map((occupation: any) => {
          return (
            <SwiperSlide className="h-full">
              <div className="flex flex-col bg-slate-100 rounded-xl">
                <h2 className="bg-primary text-white rounded-t-xl text-center p-2">
                  {occupation.title}
                </h2>
                <div className="flex flex-row justify-around p-6">
                  <div className="bg-white flex flex-col gap-3 items-center p-5 m-5 rounded-xl">
                    <h3 className=" text-center text-md">User Poll</h3>
                    <div className="flex flex-col items-center">
                      <span
                        className={`${
                          occupation.decade_change_percentage <= 0
                            ? 'text-red-500'
                            : 'text-emerald-500 '
                        } font-raleway text-4xl font-bold mr-2`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={4}
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
                      <p className="font-bold text-slate-500 text-center w-[70%]">
                        {`${
                          occupation.decade_change_percentage <= 0
                            ? 'Shrinkage of'
                            : 'Growth of'
                        }
                        ${Math.abs(
                          Math.round(
                            occupation.currently_employed *
                              1000 *
                              (occupation.decade_change_percentage / 100),
                          ),
                        )} jobs 
                        in the workforce by 2023`}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex flex-col gap-3 items-center p-5 m-5 rounded-xl">
                    <h3 className=" text-center text-md">
                      U.S. BUREAU OF LABOR STATISTICS
                    </h3>
                    <div className="flex flex-col items-center">
                      <span
                        className={`${
                          occupation.decade_change_percentage <= 0
                            ? 'text-red-500'
                            : 'text-emerald-500 '
                        } font-raleway text-4xl font-bold mr-2`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={4}
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
                      <p className="font-bold text-slate-500 text-center w-[70%]">
                        {`${
                          occupation.decade_change_percentage <= 0
                            ? 'Shrinkage of'
                            : 'Growth of'
                        }
                        ${Math.abs(
                          Math.round(
                            occupation.currently_employed *
                              1000 *
                              (occupation.decade_change_percentage / 100),
                          ),
                        )} jobs 
                        in the workforce by 2023`}
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
