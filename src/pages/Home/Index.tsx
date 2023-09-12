import React, { useState } from 'react';
import Graphs from './Graphs';
import Layout from '../../components/Layout';
import {
  RideHailingTripDataSets,
  RideHailingCostDataSets,
  Labels,
} from '../../data/ride_hailing';
import {
  BeverageServiceCostDataSets,
  BeverageServiceLocationDataSets,
} from '../../data/beverage_service';
import CompanyProfile from './CompanyProfile';

const Index = () => {
  const [industry, setIndustry] = useState(0);
  const industries = [
    {
      name: 'Ride Hailing',
      unitData: RideHailingTripDataSets,
      costData: RideHailingCostDataSets,
      unitTitle: 'Number of Trips',
      costTitle: 'Average Cost per Trip',
      salesTitle: 'Estimated Sales Revenue',
    },
    {
      name: 'Beverage Service',
      unitData: BeverageServiceLocationDataSets,
      costData: BeverageServiceCostDataSets,
      unitTitle: 'Number of Locations',
      costTitle: 'Average Revenue per Location',
      salesTitle: 'Estimated Sales Revenue',
    },
  ];

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
                  {indus.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Graphs industryData={industries[industry]}></Graphs>
        <CompanyProfile companyProfiles={industries[industry]}></CompanyProfile>
      </Layout>
    </div>
  );
};

export default Index;
