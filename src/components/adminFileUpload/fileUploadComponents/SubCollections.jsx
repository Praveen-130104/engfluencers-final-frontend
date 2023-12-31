import { useState, useEffect } from 'react';
import axios from 'axios';


import { BsTrash3, BsUpload, BsEmojiFrown } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDone } from 'react-icons/md';

import { FileUpload } from './FileUpload';
import SubcollectionFilesRenderer from './SubcollectionFilesRenderer';
import { AiOutlineClose } from 'react-icons/ai';
import Loading from '../../user/Loading';

const SubCollections = ({ collectionName, handleModelClose }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);




  const [subCollections, setSubCollections] = useState([]);

  const [SubCollectionTitle, setSubCollectionTitle] = useState("");

  const [selectedSubcollections, setSelectedSubcollections] = useState([]);
  const [currentSelectedSubcollection, setCurrentSelectedSubcollection] = useState(null);

  const [editingIndex, setEditingIndex] = useState(-1);

  const [newSubName, setNewSubName] = useState('');





  const fetchSubCollections = async () => {
    try {
      const response = await axios.get(`https://engfluencers-final-backend.vercel.app/admin/subcollections/${collectionName}`);

      if (response.status === 200) {
        const { subCollections } = response.data;
        setSubCollections(subCollections);
      } else {
        console.error("Error fetching subcollections");
      }
    } catch (error) {
      console.error("Error fetching subcollections:", error);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleSubcollectionTitleChange = (event) => {
    setSubCollectionTitle(event.target.value);
  };

  const handleCreateSubCollection = async () => {
    if (!SubCollectionTitle) {
      return; // If the new collection name is empty, do nothing
    }
    try {
      const response = await axios.post(
        `https://engfluencers-final-backend.vercel.app/admin/subcollections/${collectionName}`,
        {
          name: SubCollectionTitle,
        }
      );

      if (response.status === 201) {
        console.log("SubCollection created successfully");
        fetchSubCollections();
      } else {
        console.log("Failed to create SubCollection");
      }
    } catch (error) {
      if (error.response) {
        console.log("SubCollection already exists");
      } else {
        console.error("Error creating SubCollection:", error);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSubCollections();
  }, [collectionName]);



  const onDeletePdfFile = async (subcollectionName, fileName) => {

    try {

      // Make an API request to delete the file
      const response = await axios.delete(`https://engfluencers-final-backend.vercel.app/admin/fileupload?subcollectionName=${subcollectionName}&fileName=${fileName}`, {
      });

      if (response.status === 200) {
        console.log(`File "${fileName}" deleted successfully`);
      } else {
        console.error(`Failed to delete file "${fileName}"`);
      }
      //maintain the toggled state here

      fetchSubCollections();

    } catch (error) {
      console.error("Error deleting PDF file:", error);
    }
  };

  const handleDeleteSubcollection = async (subcollectionName) => {
    try {
      const response = await axios.delete(`https://engfluencers-final-backend.vercel.app/admin/subcollections/${subcollectionName}`);

      if (response.status === 200) {
        // Handle successful deletion, such as updating the UI
        console.log(`Subcollection "${subcollectionName}" deleted successfully`);
        // Refresh the subcollections list or perform any necessary updates
        fetchSubCollections();
      } else {
        // Handle deletion failure
        console.error(`Failed to delete subcollection "${subcollectionName}"`);
      }
    } catch (error) {
      console.error('Error deleting subcollection:', error);
    }
  };

  const handleReNameSub = async (newsubname) => {
    console.log("inside rename");
    try {
      const response = await axios.put(`https://engfluencers-final-backend.vercel.app/admin/worksheets/subcollections/${collectionName}`,
        {
          currentSelectedSubcollection,
          newsubname,
        });

      if (response.status === 200) {
        console.log("inside rename success");
        setCurrentSelectedSubcollection(null);
        alert("Collection updated successfully.");
        fetchSubCollections();
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      }
      else {
        console.error("Error updating collection:", error);
      }
    }
  }


  const toggleSelectedSubcollection = subcollection => {
    setSelectedSubcollections(prevSelected => {
      if (prevSelected.some(selected => selected.name === subcollection.name)) {
        return prevSelected.filter(selected => selected.name !== subcollection.name);
      } else {
        return [...prevSelected, subcollection];
      }
    });
  };


  const handleInputChange = (e) => {
    setNewSubName(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchSubCollections();
  };


  return (
    <>
      <div className="w-full h-full ">

        <div className="w-full bg-blue-950 py-6 text-center truncate relative">
          <h1 className="font-bold xl:text-3xl w-full text-xl tracking-widest mx-auto text-white ">{collectionName}
          <span className="md:hidden absolute top-6 right-4 w-6 h-6 bg-white rounded-md"
              onClick={handleModelClose}
            >
              <AiOutlineClose className=" text-xl w-full h-full text-red-600 " />
            </span>
          </h1>
        </div>

        <div className="h-full md:h-[65vh] md:max-h-[65vh] bg-slate-100">
          <div className="px-2 h-full  py-1 overflow-y-scroll overflow-x-hidden ">
            {
              subCollections.length === 0 ?
                (
                  <>
                    {isLoading ? (
                      <div className="w-full h-full flex justify-center items-center">
                        <Loading />
                      </div>
                    ) : (
                      <div className="h-full w-full flex flex-col space-y-4 justify-center items-center animate__animated animate__flipInX">
                        <p className="text-center font-semibold text-xl ">No content found on <span className='mx-1 px-2 inline-flex items-center bg-orange-500 rounded-lg text-white'>{collectionName} !</span></p>
                        <BsEmojiFrown className='text-2xl text-orange-500' />
                      </div>
                    )}
                  </>
                )
                :
                (
                  <>
                    {isLoading ? (
                      <div className="w-full h-full flex justify-center items-center">
                        <Loading />
                      </div>
                    ) : (
                      <ul className="space-y-2 pt-4">
                        {
                          subCollections.map((subcollection, index) => (
                            <div key={index} className="w-full group  my-2 hover:shadow-md text-blue-800 align-middle animate__animated animate__slideInLeft ">
                              <div className='flex justify-between items-center hover:bg-white'>
                                <div
                                  className="w-full truncate py-2 cursor-pointer"
                                  onClick={() => {
                                    if (editingIndex === -1) {
                                      toggleSelectedSubcollection(subcollection);
                                    }
                                  }}
                                >
                                  {editingIndex === index ? (
                                    // Render input field during editing
                                    <input
                                      type="text"
                                      value={newSubName}
                                      onChange={handleInputChange}
                                      className="text-blue-800 h-full px-3 py-2 font-semibold text-lg md:text-xl rounded-md border-2 border-red-500 w-full"
                                    />
                                  ) : (
                                    <h2 className="text-blue-800 transition-all ease-in-out group-hover:scale-105 group-hover:translate-x-4 h-full py-2 hover:underline  hover:text-red-500 px-4 flex items-center justify-between font-semibold  text-lg md:text-md lg:text-xl">
                                      {subcollection.name.toUpperCase()}
                                    </h2>
                                  )}
                                </div>


                                {/* buttons */}

                                <div>
                                  <div className="flex space-x-3 lg:space-x-6 me-4">

                                    <button
                                      className="ml-1 sm:ml-4 lg:ml-6 md:text-lg xl:text-xl text-sm p-2 border border-orange-400 text-orange-500 hover:text-white hover:bg-orange-500 rounded-lg transition-all duration-300 ease-in-out "
                                      onClick={() => {
                                        setCurrentSelectedSubcollection(subcollection.name);
                                        openModal();
                                      }
                                      }
                                    >
                                      <BsUpload />
                                    </button>

                                    <button
                                      className="ml-1 sm:ml-4 lg:ml-6 md:text-lg xl:text-xl text-sm p-2 border border-green-400 text-green-500 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-300 ease-in-out "
                                      onClick={() => {
                                        if (editingIndex === index) {
                                          // Handle the logic for saving the new name (e.g., making a backend API call)
                                          console.log('Save the new name:', newSubName);
                                          // Exit editing mode
                                          setEditingIndex(-1);
                                          handleReNameSub(newSubName);
                                        } else {
                                          setCurrentSelectedSubcollection(subcollection.name);
                                          // Enter editing mode for the current item
                                          setEditingIndex(index);
                                          console.log("index", index)
                                          setNewSubName(subcollection.name); // Set the current name as the initial value
                                        }
                                      }}                                                    >
                                      {
                                        editingIndex === index ? (
                                          <MdDone />
                                        ) : (
                                          <RiEdit2Fill />
                                        )
                                      }
                                    </button>

                                    <button
                                      className="ml-1 sm:ml-4 lg:ml-6 md:text-lg xl:text-xl text-sm p-2 border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
                                      onClick={() => handleDeleteSubcollection(subcollection.name)}
                                    >
                                      <BsTrash3 />
                                    </button>

                                  </div>
                                </div>
                              </div>

                              {selectedSubcollections.includes(subcollection) && (
                                <div className="w-full rounded-md bg-gray-400 mt-1">
                                  <div className="p-2 mx-auto rounded lg:w-11/12 flex flex-col space-y-4">
                                    <SubcollectionFilesRenderer
                                      subcollection={subcollection}
                                      onDeletePdfFile={onDeletePdfFile} />
                                  </div>
                                </div>
                              )}

                            </div>

                          ))}
                      </ul>
                    )}
                  </>
                )}

          </div>
        </div>

        {/* create sub */}

        <div className=" h-36 w-full">
          <div className="h-full w-full bg-blue-950 ">
            <div className="py-4 flex flex-col space-y-4 mx-auto justify-center items-center space-x-4">
              <input
                className=" border-2 border-blue-500 rounded-md w-2/3 py-2"
                type="text"
                value={SubCollectionTitle}
                onChange={handleSubcollectionTitleChange}
                placeholder="Enter SubCollection title"
              />
              <button
                className="bg-blue-700 hover:bg-white hover:text-blue-800 hover:border-blue-600 border-2 text-white py-2 px-4 rounded-md"
                onClick={handleCreateSubCollection}
              >
                Create SubCollection
              </button>
            </div>
          </div>
        </div>



      </div>


      {isModalOpen && <FileUpload currentSelectedSubcollection={currentSelectedSubcollection} isOpen={isModalOpen} onClose={closeModal} />}


    </>
  );
};

export default SubCollections;
