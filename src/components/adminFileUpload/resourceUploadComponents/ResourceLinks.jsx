import { BsTrash3 } from 'react-icons/bs'
import { useState } from 'react'
import axios from 'axios'

const ResourceLinks = ({ rscSubcollection }) => {

  const [videoUrls, setVideoUrls] = useState(rscSubcollection.videoUrl);

  const handleDeleteVideoUrl = async (id) => {


    try {
      const response = await axios.delete(`https://engfluencers-final-backend.vercel.app/admin/resources/links/videoUrl`, {
        params: {
          subcollectionName: rscSubcollection.name,
          videoUrlId: id,
        }
      }); 

      if (response.status === 200) {
        const updatedVideoUrls = videoUrls.filter((video) => video._id !== id);
        setVideoUrls(updatedVideoUrls);
        console.log("Video URL deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting video URL:", error);
    }
  };


  return (
    <div className='dd py-1 px-5  overflow-hidden'>
      <h2 className='text-md lg:text-xl font-bold mb-4 mt-2'>Video URLs:</h2>
      <div className='w-full text-center max-h-60 overflow-y-scroll'>
        {videoUrls?.map((video) => (
          <div key={video._id} className="w-full ">
            <div className="mx-auto lg:w-10/12 pe-3 mb-2 space-x-4 flex justify-between items-center align-middle">
              <p className='inline-flex items-center w-full cursor-pointer lg:me-2 transition-all ease-in-out duration-300 text-black hover:shadow-md hover:scale-105 hover:bg-white hover:text-blue-700 border-2 py-1 rounded-lg'>
                <a href={video.link} className='ms-3 text-lg lg:text-xl w-full  font-semibold ' target="_blank" rel="noopener noreferrer">
                  {video.linkName}
                </a>
              </p>
              <button
                onClick={() => handleDeleteVideoUrl(video._id)}
                className="md:text-lg lg:text-xl text-sm ms-2 p-2  border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
              >
                <BsTrash3 />

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourceLinks