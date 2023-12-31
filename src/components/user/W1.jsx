import { useEffect, useState } from "react";
import axios from "axios";

import { BsEyeFill, BsEmojiFrown } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const WorkSheets = () => {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);

    const handleFetchWorksheets = async () => {
        try {
            const response = await axios.get("http://192.168.43.239:3000/user/worksheets");
            setCollections(response.data);  
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

    const handleDownload = async (fileUrl, pdfName) => {

        console.log(fileUrl);
        try {
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
        }
    };

    const handleCollectionClick = (collection) => {
        setSelectedCollection(collection);

        const subcol = document.querySelector('.subcol');

        // Remove the animation class
        subcol.classList.remove('animate__slideInDown');
        
        // Trigger a reflow (force a repaint) to reapply the animation
        void subcol.offsetWidth;
        
        // Add the animation class to trigger the animation again
        subcol.classList.add('animate__slideInDown');



        const modalElement = document.getElementById('defaultModal');
        modalElement.classList.remove('hidden');
    }

    const handleModelClose = () => {
        const modalElement = document.getElementById('defaultModal');
        modalElement.classList.add('hidden');
    }


    return (
        <div className=" min-h-[92vh]  flex ">
            <div className="w-full p-3 flex justify-center items-center mx-auto sm:mx-12 md:mx-2 lg:mx-6 xl:mx-14 gap-16 md:gap-8 lg:gap-10">

                <div className="md:w-1/3 w-full animate__animated animate__slideInLeft animate__delay-0.7s ">
                    <div className="w-full bg-blue-950 py-6 text-center">
                        <h1 className="font-bold xl:text-3xl text-xl tracking-widest text-white">ALL TOPICS</h1>
                    </div>
                    <div className="px-2 py-1 overflow-y-scroll overflow-x-hidden max-h-[75vh] bg-slate-200">
                        <ul className="space-y-2 pt-4">
                            {collections.map((collection) => (
                                <li
                                    key={collection._id}
                                    onClick={() => handleCollectionClick(collection)}
                                    className={`p-4   border-b-2 text-xl border-gray-300 rounded-md lg:text-2xl cursor-pointer ${collection === selectedCollection ? "text-blue-500" : "text-black"} hover:underline ${collection.name.length > 15 ? 'marquee' : ''}   hover:bg-white hover:text-red-500 px-4 flex items-center justify-between`}
                                >
                                    <p className=" truncate ">
                                        {collection.name.charAt(0).toUpperCase() + collection.name.slice(1)}
                                    </p>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>

                <div className="w-2/3   hidden md:block">
                    {selectedCollection === null ?
                        (
                            <div className="text-center animate__animated animate__fadeIn animate__delay-1s  min-h-full  sm:block flex flex-col justify-center items-center">
                                <p className="text-gray-600 text-xl pb-4">
                                    No Topics Selected
                                </p>
                                <img
                                    className="w-72 h-72 mx-auto mb-4"
                                    src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1692278450/2829247-removebg-preview_lmrvlg.png"
                                    alt=""
                                />
                            </div>
                        ) :
                        (
                            <div className={`subcol animate__animated animate__backInDown  `} >
                                <div className="w-full bg-blue-950 py-6 text-center">
                                    <h1 className="font-bold xl:text-3xl text-xl tracking-widest text-white">
                                        CONTENTS OF {selectedCollection.name.toUpperCase()}
                                    </h1>
                                </div>
                                <div className="xl:px-16 xl:py-4 overflow-y-scroll overflow-x-hidden h-[75vh] max-h-[75vh] bg-slate-200">

                                    {selectedCollection.subcollections.length === 0 ? (
                                        <div className="text-center h-full sm:block ">
                                            <p className="text-gray-600 text-xl pb-4 h-full flex  justify-center items-center">
                                                No content available in {selectedCollection.name}
                                            </p>
                                        </div>
                                    ) : (
                                        <ul className="space-y-2" >
                                            {selectedCollection.subcollections
                                                .slice() // Create a copy of the array to avoid modifying the original array
                                                .reverse()
                                                .map((subcollection) => (
                                                    <div key={subcollection._id} >
                                                        <li

                                                            className=" border-0 border-b-2 rounded-md border-gray-300  cursor-pointer py-4 p-2 ps-6 xl:ps-0 font-semibold text-xl lg:text-2xl text-blue-900"
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
                                                                    <div className="bg-gray-400 dd  p-4 py-5 mx-auto rounded-md w-11/12 mt-2 shadow-lg">
                                                                        <div className="space-y-1">
                                                                            {subcollection.files.map((file) => (
                                                                                <div
                                                                                    key={file._id}
                                                                                    className="flex justify-between rounded-xl  py-1 bg-white shadow-md px-4 mx-4 items-center border-0 border-b border-blue-500">
                                                                                    <div
                                                                                        className=" xl:text-lg p-2 cursor-pointer text-blue-900"
                                                                                    >
                                                                                        {file.filename}
                                                                                    </div>
                                                                                    <div className="flex space-x-6">
                                                                                        <button

                                                                                            className="ml-6 text-lg p-2 my-2 border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "

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
                                                                                            className="ml-6 text-lg p-2 my-2 border border-green-400 text-green-500 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-300 ease-in-out "

                                                                                        >
                                                                                            <a
                                                                                                href="#"
                                                                                                className="text-sm flex tracking-wider gap-4 justify-center items-center"

                                                                                                onClick={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    handleDownload(file.fileurl, file.filename);
                                                                                                }}
                                                                                            >
                                                                                                <span className="lg:block hidden">DOWNLOAD</span>
                                                                                                <HiDownload className="text-xl" />
                                                                                            </a>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>

                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="bg-gray-100 dd p-4 py-5 flex justify-center space-x-3 text-xl text-red-500 items-center  text-center w-11/12 mt-2 mx-auto shadow-md">
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
                        )}
                </div>

                <div id="defaultModal" tabIndex="-1" aria-hidden="true" className=" md:hidden hidden fixed w-full h-full ">
                    <div className="bg-slate-950 p-6 bg-opacity-50 h-full flex justify-center items-center w-full ">
                        <div className="w-full mx-auto animate__animated animate__zoomIn sm:w-9/12 md:hidden">
                          
                            {
                                selectedCollection !== null &&
                                <div >
                                    <div className="w-full bg-blue-950 py-6 text-center rounded-t-lg">
                                        <h1 className="font-bold xl:text-3xl flex justify-around items-center px-4  text-xl tracking-widest text-white">
                                            CONTENTS OF {selectedCollection.name.toUpperCase()}
                                            <span className="w-6 h-6 bg-white rounded-md" onClick={handleModelClose}>
                                                <AiOutlineClose className=" text-xl w-full h-full text-red-600 " />
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="xl:px-16 xl:py-4 rounded-b-lg overflow-y-scroll overflow-x-hidden h-[65vh] max-h-[65vh] bg-white">

                                        {selectedCollection.subcollections.length === 0 ? (
                                            <div className="text-center shadow-lg h-full sm:block ">
                                                <p className="text-gray-600  text-xl pb-4 h-full flex  justify-center items-center">
                                                    No content available in {selectedCollection.name}
                                                </p>
                                            </div>
                                        ) : (
                                            <ul className="space-y-2 mt-2 sm:mt-4" >
                                                {selectedCollection.subcollections
                                                    .slice() // Create a copy of the array to avoid modifying the original array
                                                    .reverse()
                                                    .map((subcollection) => (
                                                        <div key={subcollection._id} >
                                                            <li

                                                                className=" border-0 border-b-2 rounded-md border-gray-300  cursor-pointer py-4 p-2 text-xl px-4 sm:px-8 lg:text-2xl text-blue-900"
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
                                                                        <div className="bg-slate-300 dd mt-1 px-5 py-5 mx-auto shadow-xl mb-4">
                                                                            <div className="sm:space-y-2 space-y-1 ">
                                                                                {subcollection.files.map((file) => (
                                                                                    <div
                                                                                        key={file._id}
                                                                                        className="flex justify-between rounded-md sm:rounded-xl  bg-white shadow-md px-4 sm:mx-4 items-center border-0 border-b border-blue-500">
                                                                                        <div
                                                                                            className="text-xl xl:text-lg p-2 cursor-pointer text-blue-900"
                                                                                        >
                                                                                            {file.filename}
                                                                                        </div>
                                                                                        <div className="flex space-x-4 sm:space-x-6">
                                                                                            <button

                                                                                                className=" text-lg p-2 my-2 border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "

                                                                                            >
                                                                                                <a href={file.fileurl}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="text-sm flex tracking-wider gap-4 justify-center items-center"
                                                                                                >
                                                                                                    <span className="hidden md:block">PREVIEW</span>
                                                                                                    <BsEyeFill className="text-xl" />
                                                                                                </a>
                                                                                            </button>
                                                                                            <button
                                                                                                className="ml-6 text-lg p-2 my-2 border border-green-400 text-green-500 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-300 ease-in-out "

                                                                                            >
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className="text-sm flex tracking-wider gap-4 justify-center items-center"

                                                                                                    onClick={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        handleDownload(file.fileurl, file.filename);
                                                                                                    }}
                                                                                                >
                                                                                                    <span className="hidden md:block">
                                                                                                        DOWNLOAD
                                                                                                    </span>
                                                                                                    <HiDownload className="text-xl" />
                                                                                                </a>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>

                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="bg-gray-100 dd p-4 py-5 flex justify-center space-x-3 text-xl text-red-500 items-center  text-center w-full mx-auto shadow-md">
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
        </div >
    );
}

export default WorkSheets;
