import React, { useState } from 'react';

const CompanyProfile = ({ companyProfiles }: any) => {
  const [currentProfile, setCurrentProfile] = useState(0);
  console.log(
    'company profiles are ',
    companyProfiles.unitData[currentProfile].videoLink,
  );
  return (
    <div className="flex flex-col items-center ">
      <div className="max-w-xl mx-auto ">
        <ul className="flex  text-sm font-medium text-center text-gray-500  overflow-x-auto no-scrollbar ">
          {companyProfiles.unitData.map((profile: any, index: number) => (
            <li className="mr-2">
              <button
                onClick={() => setCurrentProfile(index)}
                className={`flex gap-2 items-center inline-block p-6 w-56 h-16 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                  currentProfile === index
                    ? ' active text-primary bg-gray-100'
                    : ''
                }`}
              >
                <img
                  className="w-12 h-12 mb-3 rounded-full shadow-lg"
                  src={profile.imageLink}
                  alt={profile.label}
                />
                <h3 className="truncate">{profile.label}</h3>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 bg-gray-100 rounded-xl min-w-full">
        <iframe
          title="Sikho Automation"
          className=" mx-auto min-w-full min-h-[500px]"
          width="560"
          height="315"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          src={`${companyProfiles.unitData[currentProfile].videoLink}  `}
        ></iframe>
      </div>
    </div>
  );
};

export default CompanyProfile;
