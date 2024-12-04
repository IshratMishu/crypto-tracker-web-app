import React from 'react';
import Trend from './Trend';
export const metadata = {
    title: "Trending Coins",
    description: "A crypto tracker web app by nextJS",
  };
  

const page = () => {
    return (
        <div>
            <Trend></Trend>
        </div>
    );
};

export default page;