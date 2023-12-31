import React from 'react'
import { useState } from 'react';
import ResourceFiles from './ResourceFiles';
import ResourceLinks from './ResourceLinks';

const RscSubcollectionRenderer = ({ rscSubcollection }) => {

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleResourceFilesClick = () => {
    setSelectedComponent('ResourceFiles'); // Set state for ResourceFiles component
  };

  const handleResourceLinksClick = () => {
    setSelectedComponent('ResourceLinks'); // Set state for ResourceLinks component
  };
  return (
    <div
      className='h-auto bg-white rounded-md w-full '
    >
      <div className="px-4 py-2 mx-auto flex justify-around lg:w-2/3 items-center">
        <button
          onClick={handleResourceFilesClick}
          className="px-2 py-1 lg:px-4 lg:py-2 focus:bg-green-500 focus:text-white border-2 transition-all ease-in-out duration-300 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg"
        >
          RESOURCE FILES
        </button>
        <button
          onClick={handleResourceLinksClick}
          className="px-2 py-1 lg:px-4 lg:py-2   focus:bg-red-500 focus:text-white border-2 transition-all ease-in-out duration-300 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
        >
          RESOURCE LINKS
        </button>
      </div>

      <div className="dd">
        {
          selectedComponent === 'ResourceFiles' && <ResourceFiles rscSubcollection={rscSubcollection}  /> // Render ResourceFiles component
        }
        {
          selectedComponent === 'ResourceLinks' && <ResourceLinks rscSubcollection={rscSubcollection} /> // Render ResourceLinks component
        }
      </div>


    </div>
  )
}

export default RscSubcollectionRenderer