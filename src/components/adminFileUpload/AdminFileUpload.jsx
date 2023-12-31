
import { useState } from 'react';
import { auth } from '../../../firebaseConfig';

import Collections from './fileUploadComponents/Collections'
import SubCollections from './fileUploadComponents/SubCollections';
import { useEffect } from 'react';



const AdminFileUpload = () => {


  const [selectedCollection, setSelectedCollection] = useState(null);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      console.log("user", user);
      if (user) {
        setIsAuth(true);
        console.log("User is signed in");
      } else {

        console.log("User is not signed in")
        window.location.href = '/admin';
      }
    });
    return () => subscribe();
  }
    , []);

  const timeout = () => {
    setTimeout(() => {
      auth.signOut();
    }, 600000);
  };

  useEffect(() => {
    timeout();
  }, []);




  // Function to update selectedCollection in Layout component
  const updateSelectedCollection = (collection) => {
    setSelectedCollection(collection);
  };

  const sizeFunc = () => {
    const modalElement = document.getElementById('defaultModal');
    modalElement.classList.remove('hidden');
  }

  const handleModelClose = () => {
    const modalElement = document.getElementById('defaultModal');
    modalElement.classList.add('hidden');
  }


  return (


    <>
      {
        isAuth && (
          <div className="w-full h-auto">

            <div className='lg:container mx-auto h-full w-full overflow-hidden '>
              <div className="md:grid grid-cols-5 h-full lg:gap-4 ">


                <div className="mx-5 md:w-full md:mx-auto md:col-span-2 flex justify-center items-center p-2">
                  <div className=" w-full h-full">
                    <Collections
                      selectedCollection={selectedCollection}
                      updateSelectedCollection={updateSelectedCollection}
                      sizeFunc={sizeFunc} />
                  </div>
                </div>

                <div className="hidden col-span-3 md:flex justify-center items-center p-2">
                  <div className=" w-full h-full ">

                    <div className="h-full w-full animate__animated animate__slideInRight">
                      {
                        selectedCollection ? (
                          <SubCollections collectionName={selectedCollection} />
                        ) : (
                          <div className="text-center sm:block bg-slate-100 opacity-90 w-full h-full flex justify-center items-center">
                            <div className="w-full h-full flex flex-col justify-center items-center">
                              <p className="text-gray-600 text-xl pb-4">
                                No Collections Selected
                              </p>
                              <img
                                className="w-72 h-72 mx-auto mb-4 "
                                src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1692278450/2829247-removebg-preview_lmrvlg.png"
                                alt=""
                              />
                            </div>
                          </div>
                        )}
                    </div>

                  </div>
                </div>


              </div>
            </div >


            {/* small screen */}

            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className=" md:hidden hidden fixed top-0  w-full h-full ">
              <div className="bg-slate-950 px-6 bg-opacity-40 backdrop-blur-sm h-full flex justify-center pt-24 w-full "

              >
                <div className="mx-auto w-full h-auto md:hidden  animate__animated animate__zoomIn">
                  <div className=" w-full h-[60vh]">
                    {
                      selectedCollection ? (
                        <SubCollections collectionName={selectedCollection} handleModelClose={handleModelClose} />
                      ) : (
                        <div className="text-center sm:block bg-slate-100 opacity-90 w-full h-full flex justify-center items-center">
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <p className="text-gray-600 text-xl pb-4">
                              No Collections Selected
                            </p>
                            <img
                              className="w-72 h-72 mx-auto mb-4 "
                              src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1692278450/2829247-removebg-preview_lmrvlg.png"
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>

              </div>

            </div>

          </div >
        )}
    </>





  )
}

export default AdminFileUpload







