import React, { useEffect, useState } from 'react';
import Graphs from './Graphs';
import Layout from '../../components/Layout';

import CompanyProfile from './CompanyProfile';
import { getCompanies, getIndustries } from '../../services/sikhoAPI';
import { industryTypes } from '../../data/constants';

const Index = () => {
  const [industry, setIndustry] = useState(0);
  const [industries, setIndustries] = useState<any[]>([]);
  const fetchCompanies = async (currIndustryId: number) => {
    let response = await getCompanies();
    console.log('running retirievallllll', response);
    response = response.filter(
      (comp: any) => comp.industryId == currIndustryId,
    );
    console.log('filtered is ', response);
    return response;
    // console.log('retrieved companies are ', response);
  };

  useEffect(() => {
    const fetchData = async () => {
      const updatedIndustries = [];
      let response = await getIndustries();

      // try{

      // }catch(e:any){
      //   console.log("errror is ",e)
      // }
      // response = response.map(async (currIndustry: any) => {
      //   let companies = await fetchCompanies(currIndustry.id);

      //   return { ...currIndustry, companies: companies };
      // });
      for (let k = 0; k < response.length; k++) {
        let companies = await fetchCompanies(response[k].id);
        response[k].companies = companies;
      }
      console.log('setted industreis ', response);

      setIndustries(response);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log('CALLED WITH INDUSTRIES ', industries);
  //   const fetchCompanies = async () => {
  //     console.log('running retirievallllll');
  //     let response = await getCompanies();
  //     return response;
  //     // console.log('retrieved companies are ', response);

  //     // try {
  //     //   response = response.filter(
  //     //     (comp: any) => comp.industryId == industries[industry].id,
  //     //   );
  //     // } catch (e: any) {
  //     //   console.log('error is ', e);
  //     // }

  //     // console.log(' AFTER retrieved companies are ', response);

  //     // industries[industry].companies = response;
  //     // console.log('new industries isss ', industries);
  //     // setIndustries(industries);
  //   };
  //   if (industries.length != 0) {
  //     fetchCompanies();
  //   }
  // }, [industries, industry]);

  // const industries = [
  //   {
  //     name: 'Ride Hailing',
  //     unitData: RideHailingTripDataSets,
  //     costData: RideHailingCostDataSets,
  //     unitTitle: 'Number of Trips',
  //     costTitle: 'Average Cost per Trip',
  //     salesTitle: 'Estimated Sales Revenue',
  //   },
  //   {
  //     name: 'Beverage Service',
  //     unitData: BeverageServiceLocationDataSets,
  //     costData: BeverageServiceCostDataSets,
  //     unitTitle: 'Number of Locations',
  //     costTitle: 'Average Revenue per Location',
  //     salesTitle: 'Estimated Sales Revenue',
  //   },
  // ];
  console.log('industries is ', industries);
  return (
    <div>
      <Layout>
        <p className="p-5 lg:py-10">
          View the progress of automation across different industries.
        </p>
        <div className="max-w-md lg:max-w-lg mx-auto ">
          <ul className=" flex justify-center  lg:flex-row text-md gap-2  lg:text-xl font-medium text-center  lg:overflow-x-auto font-raleway ">
            {industries.map((indus: any, index: number) => (
              <li>
                <button
                  onClick={() => setIndustry(index)}
                  type="button"
                  className={`inline-flex items-center px-2 lg:px-5 py-2.5 lg:py-1 text-center whitespace-nowrap text-primary  rounded-lg hover:bg-accent ${
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
          <Graphs industryData={industries[industry]}></Graphs>
        )}

        <CompanyProfile companyProfiles={industries[industry]}></CompanyProfile>
      </Layout>
    </div>
  );
};

export default Index;
