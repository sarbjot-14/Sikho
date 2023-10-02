import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getCompanies, getIndustries } from '../../services/sikhoAPI';
import { industryTypes } from '../../data/constants';
import ProjectionSlides from './ProjectionSlides';

const Employment = () => {
  const [industry, setIndustry] = useState(0);
  const [industries, setIndustries] = useState<any[]>([]);
  const fetchCompanies = async (currIndustryId: number) => {
    let response = await getCompanies();

    response = response.filter(
      (comp: any) => comp.industryId == currIndustryId,
    );

    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const updatedIndustries = [];
      let response = await getIndustries();

      for (let k = 0; k < response.length; k++) {
        let companies = await fetchCompanies(response[k].id);
        response[k].companies = companies;
      }

      setIndustries(response);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <p className="p-5 lg:py-10">
        View employment projects in key occupations
      </p>
      <div className="max-w-md lg:max-w-lg mx-auto ">
        <ul className=" flex justify-center  lg:flex-row text-md gap-2  lg:text-xl font-medium text-center  lg:overflow-x-auto font-raleway ">
          {industries.map((indus: any, index: number) => (
            <li>
              <button
                onClick={() => setIndustry(index)}
                type="button"
                className={`text-xl inline-flex items-center px-2 lg:px-5 py-2.5 lg:py-1 text-center whitespace-nowrap text-primary  rounded-lg hover:bg-accent ${
                  industry === index ? 'bg-accent' : 'bg-[#bffff8]'
                } `}
              >
                {industryTypes[indus.type as keyof typeof industryTypes]}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-28 my-10">
        <div>
          <h1 className="text-lg md:text-2xl text-center p-5">
            Occupations at risk - Projections 2022-2033
          </h1>
          <ProjectionSlides industry={industry} atRisk={1}></ProjectionSlides>
        </div>
        <div className="">
          <h1 className="text-lg md:text-2xl text-center p-5">
            Promising Occupations - Projections 2022-2033
          </h1>

          <ProjectionSlides industry={industry} atRisk={0}></ProjectionSlides>
        </div>
      </div>
    </Layout>
  );
};

export default Employment;
