import React, { useEffect, useState } from 'react';
import Graphs from './Graphs';
import Layout from '../../components/Layout';

import CompanyProfile from './CompanyProfile';
import { getCompanies, getIndustries } from '../../services/sikhoAPI';
import { industryTypes } from '../../data/constants';

const Home = () => {
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
    <div>
      <Layout>
        <p className="p-5 lg:py-10">
          View the progress of automation across different industries.
        </p>
        <div className="max-w-md lg:max-w-lg mx-auto py-5 ">
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
        {industries.length && (
          <>
            <Graphs industryData={industries[industry]}></Graphs>

            <CompanyProfile
              companyProfiles={industries[industry]}
            ></CompanyProfile>
          </>
        )}
      </Layout>
    </div>
  );
};

export default Home;
