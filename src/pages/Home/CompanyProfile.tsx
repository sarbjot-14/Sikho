import React, { useEffect, useState } from 'react';
import { getArticles, mockData } from '../../utils/newsAPI';

const CompanyProfile = ({ companyProfiles }: any) => {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [articles, setArticles] = useState<any>([]);
  useEffect(() => {
    setCurrentProfile(0);
  }, [companyProfiles]);

  useEffect(() => {
    const makeCall = async () => {
      return await getArticles(companyProfiles.unitData[currentProfile]?.label);
    };
    makeCall().then((articleData: any) => {
      setArticles(articleData.data);
    });
  }, [currentProfile]);
  console.log(
    'company profiles are ',
    companyProfiles.unitData[currentProfile]?.videoLink,
  );
  return (
    <div className="flex  flex-col items-center mt-10 ">
      <div className="max-w-sm lg:max-w-xl mx-auto ">
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
      <div className="p-5   bg-gray-100 rounded-xl min-w-full">
        <iframe
          title="Sikho Automation"
          className=" mx-auto min-w-full min-h-[250px] lg:min-h-[500px]"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          src={`${companyProfiles.unitData[currentProfile]?.videoLink}  `}
        ></iframe>
        <div className="m-5">
          {articles?.map((article: any) => {
            return (
              <a href={article.url} target="_blank">
                <div className="flex flex-col lg:flex-row p-8">
                  <img className="p-2 lg:w-[40%]" src={article.image_url}></img>
                  <div className="px-2">
                    <h2 className="text-primary ">{article.title} </h2>{' '}
                    <p>{article.snippet}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
