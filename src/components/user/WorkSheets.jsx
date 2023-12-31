import { useEffect, useState } from "react";
import axios from "axios";

import { BsEyeFill, BsEmojiFrown } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "./Loading";

const WorkSheets = () => {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);

    const [dataLoaded, setDataLoaded] = useState(false);

    const [loadingFileId, setLoadingFileId] = useState(null);

    const handleFetchWorksheets = async () => {
        try {
            const response = await axios.get("https://engfluencers-final-backend.vercel.app/user/worksheets");
            setCollections(response.data);
            setDataLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        handleFetchWorksheets();
    }, []);

    const toggleSelectedSubcollection = (subcollection) => {
        subcollection.isExpanded = !subcollection.isExpanded;
        setCollections([...collections]); // Trigger re-render
    };

    const handleDownload = async (fileUrl, pdfName, fileId) => {
        try {
            setLoadingFileId(fileId);
            const response = await axios.post(
                `https://engfluencers-final-backend.vercel.app/user/worksheets/download`,
                {
                    url: fileUrl, // Include the file URL in the request body
                },
                {
                    responseType: 'blob', // Set the response type to 'blob'
                }

            );

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${pdfName}.pdf`; // Set the desired filename
            link.style.display = 'none'; // Optionally hide the link
            document.body.appendChild(link);
            link.click();

            // Clean up
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading the file:', error);
        }finally
        {
            setLoadingFileId(null);
        }
        
    };

    const handleCollectionClick = (collection) => {
        setSelectedCollection(collection);

        const subcol = document.getElementById('subcol');

        subcol?.classList.remove('animate__slideInRight');

        void subcol?.offsetWidth;

        subcol?.classList.add('animate__slideInRight');






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
                dataLoaded ?
                    (
                        <div className="h-screen w-full relative work-sans ">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        'url("https://res.cloudinary.com/dfsvudyfv/image/upload/v1699782359/Untitled_design_1_uipqyj.png")',
                                    // backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    filter: "blur(5px)",
                                    zIndex: -1,
                                }}
                            ></div>

                            <div className="lg:container w-full h-full mx-auto">
                                <div className=" py-4 h-full w-full ">

                                    <div className="w-full h-full pb-20">


                                        <div className="md:grid md:grid-cols-5 gap-2 lg:gap-6 h-full w-full overflow-hidden md:px-2 lg:px-12 ">

                                            <div className="mx-5 md:w-full md:mx-auto md:col-span-2 flex justify-center items-center px-1">
                                                {
                                                    collections.length === 0 ? (
                                                        <p className="text-gray-500">No Resources found.</p>
                                                    ) : (
                                                        <div className="w-full flex flex-col justify-center items-center h-full animate__animated animate__slideInLeft animate__delay-0.7s ">

                                                            <div className="w-full bg-blue-950 py-6 text-center">
                                                                <h1 className="font-bold xl:text-3xl text-xl tracking-widest text-white">ALL TOPICS</h1>
                                                            </div>

                                                            <div className="w-full h-[75vh] max-h-[75vh] overflow-y-scroll overflow-x-hidden  bg-slate-100">
                                                                <div className="w-full h-full ">
                                                                    <ul className="py-2">

                                                                        {collections.map((collection, id) => (
                                                                            <div key={id}
                                                                                className="hover:cursor-pointer border-0 border-b-2 border-sky-200 w-full my-2 hover:shadow-lg group text-blue-800 hover:bg-white align-middle "
                                                                            >
                                                                                <li
                                                                                    key={collection._id}
                                                                                    onClick={() => handleCollectionClick(collection)}
                                                                                    className={`py-4 transition-all ease-in-out group-hover:scale-105 group-hover:translate-x-4 duration-300 font-semibold text-xl ${collection === selectedCollection ? "text-blue-900 shadow-md scale-105 underline bg-white translate-x-4" : "text-black"} ${collection.name.length > 20 ? 'marquee' : ''}   hover:bg-white hover:text-blue-600 px-4 flex items-center justify-between`}
                                                                                >
                                                                                    <p className=" truncate ">
                                                                                        {collection.name.toUpperCase()}
                                                                                    </p>
                                                                                </li>
                                                                            </div>
                                                                        ))}

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>



                                            <div className="col-span-3 h-full w-full md:block hidden ">

                                                {
                                                    selectedCollection === null ? (
                                                        <div className="w-full h-full flex justify-center items-center">
                                                            <div className="text-center max-h-[75vh] w-full h-[75vh]  flex flex-col justify-center items-center bg-white animate__animated animate__fadeIn animate__delay-1s ">
                                                                <p className="text-gray-600 text-xl pb-4">
                                                                    No Topics Selected
                                                                </p>
                                                                <img
                                                                    className="w-72 h-72 mx-auto mb-4"
                                                                    src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1692278450/2829247-removebg-preview_lmrvlg.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-center items-center w-full h-full">

                                                            <div id="subcol" className={`  animate__animated animate__backInDown w-full`}  >

                                                                <div className="w-full bg-blue-950 py-6 text-center">
                                                                    <h1 className="font-bold xl:text-3xl text-xl tracking-widest text-white">
                                                                        CONTENTS OF {selectedCollection.name.toUpperCase()}
                                                                    </h1>
                                                                </div>

                                                                <div className=" overflow-y-scroll overflow-x-hidden h-[75vh] max-h-[75vh] bg-slate-200">

                                                                    {selectedCollection.subcollections.length === 0 ? (
                                                                        <div className="text-center h-full sm:block ">
                                                                            <p className="text-gray-600 text-xl pb-4 h-full flex  justify-center items-center">
                                                                                No content available in {selectedCollection.name}
                                                                            </p>
                                                                        </div>
                                                                    ) : (

                                                                        <ul className="space-y-2 py-2 px-3">
                                                                            {selectedCollection.subcollections
                                                                                .slice() // Create a copy of the array to avoid modifying the original array
                                                                                // .reverse()
                                                                                .map((subcollection) => (
                                                                                    <div key={subcollection._id} className="hover:cursor-pointer w-full my-1 py-2 align-middle" >

                                                                                        <li
                                                                                            className=" py-3 px-4 hover:bg-white hover:text-blue-500  hover:scale-105 hover:translate-x-4 transition-all ease-in-out duration-300 hover:border-blue-900 border-b-2 border-white font-semibold hover:shadow-lg w-full text-xl lg:text-2xl text-blue-900"
                                                                                            onClick={() => {
                                                                                                toggleSelectedSubcollection(subcollection);
                                                                                            }
                                                                                            }
                                                                                        >
                                                                                            {subcollection.name.charAt(0).toUpperCase() + subcollection.name.slice(1)}


                                                                                        </li>
                                                                                        {subcollection.isExpanded && (
                                                                                            (
                                                                                                subcollection.files.length > 0 ? (
                                                                                                    <div className="lg:px-2 w-11/12 mx-auto rounded-md py-2 bg-gray-400 mt-2">
                                                                                                        <div className="dd w-full bg-white rounded-md mx-auto py-2">
                                                                                                            <div className='w-full text-center py-2 max-h-64 overflow-y-scroll'>
                                                                                                                {subcollection.files.map((file) => (
                                                                                                                    <div
                                                                                                                        key={file._id}
                                                                                                                        className="flex px-3 w-full justify-center mb-2 hover:bg-slate-50 group items-center pe-2 lg:pe-0 ">
                                                                                                                        <div
                                                                                                                            className="w-full text-xl group-hover:font-semibold border-2 rounded-md group-hover:scale-105 group-hover:text-xl transition-all ease-in-out duration-300 me-2 xl:text-lg py-1 cursor-pointer text-blue-900"
                                                                                                                        >
                                                                                                                            {file.filename}
                                                                                                                        </div>

                                                                                                                        <div className="flex ms-auto px-3 space-x-4 lg:space-x-6 items-end">

                                                                                                                            <button

                                                                                                                                className="text-lg p-2 h-fit border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out"

                                                                                                                            >
                                                                                                                                <a href={file.fileurl}
                                                                                                                                    target="_blank"
                                                                                                                                    rel="noopener noreferrer"
                                                                                                                                    className="text-sm flex tracking-wider gap-4 justify-center items-center"
                                                                                                                                >
                                                                                                                                    <span className="lg:block hidden">PREVIEW</span>
                                                                                                                                    <BsEyeFill className="text-xl" />
                                                                                                                                </a>
                                                                                                                            </button>

                                                                                                                            <button
                                                                                                                                className="ml-6 text-lg p-2 border border-green-400 text-green-500 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-300 ease-in-out "

                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    href="#"
                                                                                                                                    className="text-sm flex tracking-wider gap-4 justify-center items-center"

                                                                                                                                    onClick={(e) => {
                                                                                                                                        e.preventDefault();
                                                                                                                                        handleDownload(file.fileurl, file.filename , file._id);
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                      {loadingFileId === file._id ? (
                                                                                                                                            // Display the loading icon during downloa6
                                                                                                                                            <div className="h-5 lg:w-28 mx-auto ">
                                                                                                                                                <div className="animate-spin rounded-full mx-auto h-full w-4 border-t-2 border-black"></div>    
                                                                                                                                            </div>
                                                                                                                                        ) : (
                                                                                                                                            <>
                                                                                                                                                <span className="lg:block hidden">DOWNLOAD</span>
                                                                                                                                                <HiDownload className="text-xl" />
                                                                                                                                            </>
                                                                                                                                        )}
                                                                                                                                </a>
                                                                                                                            </button>

                                                                                                                

                                                                                                                        </div>

                                                                                                                    </div>

                                                                                                                ))}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <div className="w-11/12 mx-auto py-4 bg-white mt-2 rounded-md flex justify-center items-center space-x-4 font-bold text-xl text-red-500 shadow-lg dd">
                                                                                                        <p>Oops! No files found </p>
                                                                                                        <BsEmojiFrown />
                                                                                                    </div>
                                                                                                )
                                                                                            )
                                                                                        )}

                                                                                    </div>
                                                                                ))}
                                                                        </ul>

                                                                    )}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>




                            {/* small screen modal sub */}


                            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className=" md:hidden hidden fixed top-8 w-full h-full ">
                                <div className="bg-slate-950 p-6 bg-opacity-50 backdrop-blur-md h-full flex justify-center items-center w-full ">
                                    <div className="w-full mx-auto animate__animated animate__zoomIn sm:w-9/12 md:hidden">

                                        {
                                            selectedCollection !== null &&
                                            <div className="">
                                                <div className="w-full bg-blue-950 py-6 text-center rounded-t-xl">
                                                    <div className="flex justify-center items-center px-4">
                                                        <h1 className="w-full font-bold px-4  text-xl tracking-widest text-white">
                                                            {selectedCollection.name.toUpperCase()}
                                                        </h1>
                                                        <span className="w-6 h-6 ms-auto bg-white rounded-md" onClick={handleModelClose}>
                                                            <AiOutlineClose className=" text-xl w-full h-full text-red-600 " />
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className=" overflow-y-scroll overflow-x-hidden h-[75vh] max-h-[75vh] bg-slate-200">

                                                    {selectedCollection.subcollections.length === 0 ? (
                                                        <div className="text-center h-full sm:block ">
                                                            <p className="text-gray-600 text-xl pb-4 h-full flex  justify-center items-center">
                                                                No content available in {selectedCollection.name}
                                                            </p>
                                                        </div>
                                                    ) : (

                                                        <ul className="space-y-2 py-2 px-3">
                                                            {selectedCollection.subcollections
                                                                .slice() // Create a copy of the array to avoid modifying the original array
                                                                .reverse()
                                                                .map((subcollection) => (
                                                                    <div key={subcollection._id} className="hover:cursor-pointer w-full my-1 py-2 align-middle" >

                                                                        <li
                                                                            className=" py-3 px-4 hover:bg-white hover:text-blue-500  hover:scale-105 hover:translate-x-4 transition-all ease-in-out duration-300 hover:border-blue-900 border-b-2 border-white font-semibold hover:shadow-lg w-full text-xl lg:text-2xl text-blue-900"
                                                                            onClick={() => {
                                                                                toggleSelectedSubcollection(subcollection);
                                                                            }
                                                                            }
                                                                        >
                                                                            {subcollection.name.charAt(0).toUpperCase() + subcollection.name.slice(1)}


                                                                        </li>
                                                                        {subcollection.isExpanded && (
                                                                            (
                                                                                subcollection.files.length > 0 ? (
                                                                                    <div className="px-2 w-11/12 mx-auto rounded-md py-2 bg-gray-400 mt-2">
                                                                                        <div className="dd w-full bg-white rounded-md mx-auto py-2">
                                                                                            <div className='w-full text-center py-2 max-h-64 overflow-y-scroll'>
                                                                                                {subcollection.files.map((file) => (
                                                                                                    <div
                                                                                                        key={file._id}
                                                                                                        className="flex px-3 w-full justify-center mb-2 hover:bg-slate-50 group items-center pe-2 lg:pe-0 ">
                                                                                                        <div
                                                                                                            className="w-full text-xl group-hover:font-semibold border-2 rounded-md group-hover:scale-105 group-hover:text-xl transition-all ease-in-out duration-300 me-2 py-1 cursor-pointer text-blue-900"
                                                                                                        >
                                                                                                            {file.filename}
                                                                                                        </div>

                                                                                                        <div className="flex ms-auto px-3 space-x-4 ">
                                                                                                            <button

                                                                                                                className="text-lg p-2 h-fit border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out"

                                                                                                            >
                                                                                                                <a href={file.fileurl}
                                                                                                                    target="_blank"
                                                                                                                    rel="noopener noreferrer"
                                                                                                                    className="text-sm flex tracking-wider gap-4 justify-center items-center"
                                                                                                                >
                                                                                                                    <BsEyeFill className="text-xl" />
                                                                                                                </a>
                                                                                                            </button>
                                                                                                            <button
                                                                                                                className="text-lg p-2 border border-green-400 text-green-500 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-300 ease-in-out "

                                                                                                            >
                                                                                                                <a
                                                                                                                    href="#"
                                                                                                                    className="text-sm flex tracking-wider gap-4 justify-center items-center"

                                                                                                                    onClick={(e) => {
                                                                                                                        e.preventDefault();
                                                                                                                        handleDownload(file.fileurl, file.filename , file._id);
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {
                                                                                                                        loadingFileId === file._id ? (
                                                                                                                            // Display the loading icon during download
                                                                                                                            <div className="w-5">
                                                                                                                                <div className="animate-spin rounded-full h-4 w-3 mx-auto border-t-2 border-black"></div>
                                                                                                                            </div>
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                <HiDownload className="text-xl" />
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    }
                                                                                                                </a>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="w-11/12 mx-auto py-4 bg-white mt-2 rounded-md flex justify-center items-center space-x-4 font-bold text-xl text-red-500 shadow-lg dd">
                                                                                        <p>Oops! No files found </p>
                                                                                        <BsEmojiFrown />
                                                                                    </div>
                                                                                )
                                                                            )
                                                                        )}

                                                                    </div>
                                                                ))}
                                                        </ul>

                                                    )}
                                                </div>

                                            </div>
                                        }

                                    </div>

                                </div>
                            </div>

                        </div >

                    ) :
                    (
                        <Loading />
                    )
            }
        </>


    );
}

export default WorkSheets;
