import { useState } from "react";
import axios from "axios";
import { BsTrash3, BsEyeFill, BsEmojiFrown } from "react-icons/bs";

const ResourceFiles = ({ rscSubcollection }) => {

  const [ files, setFiles ] = useState(rscSubcollection.files);

  const handleDeletePdfFile = async (subcollectionName, filename) => {

    console.log("Deleting PDF file:", filename);
    console.log("Subcollection name:", subcollectionName);

    try {
      const response = await axios.delete(`https://engfluencers-final-backend.vercel.app/admin/resources/files/pdfs/del?subcollectionName=${subcollectionName}&fileName=${filename}`);
      if (response.status === 200) {
        const updatedFiles = files.filter((file) => file.filename !== filename);
        setFiles(updatedFiles);
        console.log("PDF file deleted successfully");
      }
    }
    catch (error) {
      console.error("Error deleting PDF file:", error);
    }
  };

  return (
    <div className="px-2">
      <div className="dd">
        <h1 className="font-bold md:text-lg lg:text-xl mb-4 mt-2 ">Resource  Files</h1>
        <div className='w-full text-center max-h-60 overflow-y-scroll'>

          {files.map((file) => (
            <div key={file._id} className="w-full">
              <div className="mx-auto lg:w-10/12 px-2 pe-4 lg:pe-0 mb-2 flex justify-between items-center align-middle">
                <p className='inline-flex items-center text-lg lg:text-xl w-full font-semibold ps-4 cursor-pointer transition-all ease-in-out duration-300 text-black hover:shadow-md hover:scale-105 hover:bg-white hover:text-blue-700 border-2 h-10 rounded-lg'>
                  {file.filename}
                </p>
                <div className="ms-5   flex justify-center items-center align-middle">
                  <a
                    href={file.fileurl}
                    className="md:text-lg lg:text-xl p-2 border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsEyeFill />
                  </a>
                  <button
                    className="ml-4 lg:ml-6 md:text-lg lg:text-xl p-2 border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
                  onClick={() => handleDeletePdfFile( rscSubcollection.name , file.filename)}
                  >
                    <BsTrash3 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      

    </div>
  );
};

export default ResourceFiles;
