import { useState } from "react";
import { FaLink } from "react-icons/fa"

import axios from "axios";



const ResourceLinkUpload = ({ currentSelectedRscSubcollection, isOpen, onClose }) => {

    const [linkName, setLinkName] = useState('');

    const [linkUrl, setLinkUrl] = useState('');

    const [uploadClicked, setUploadClicked] = useState(false);

    const handleLinkNameChange = (e) => {
        setLinkName(e.target.value); // Update the link name state
    };


    const handleLinkUrlChange = (e) => {
        setLinkUrl(e.target.value); // Update the link URL state
    };

    const handleClearForm = () => {
        setLinkName("");
        setLinkUrl("");
        onClose();
    };

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                //display separate alert messages for empty filename and file inputs
                if (!linkName && !linkUrl) {
                    alert("Please enter a link name and provide a link");
                    return;
                }
                if (!linkName) {
                    alert("Please enter a link name");
                    return;
                }   
                if (!linkUrl) {
                    alert("Please choose a link");
                    return;
                }

                setUploadClicked(true);
                
                const formData = new FormData();
                formData.append("linkName", linkName);
                formData.append("linkUrl", linkUrl);

                // Construct the URL for the POST request
                const url = `https://engfluencers-final-backend.vercel.app/admin/resources/links/videoUrl?subcollectionName=${currentSelectedRscSubcollection}`;

                const response = await axios.post(url, formData ,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                
                });

                if (response.status === 201) {
                     setUploadClicked(false);
                    // console.log("Link uploaded successfully");
                    alert("Link uploaded successfully");
                    // Clear form inputs after successful upload
                    setLinkName("");
                    setLinkUrl("");
                    onClose();
                }
                else {
                    // console.log("Failed to upload link");
                    alert("Failed to upload link");
                }
            }
            catch (error) {
                console.error("Error uploading link:", error);
                
            }
        }


    return (
        <div
            className={` fixed top-0 left-0 w-full h-full flex flex-col  items-center justify-center bg-gray-700 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="bg-white relative w-11/12 md:w-9/12 h-fit p-6 rounded-lg shadow-lg animate__animated animate__zoomIn ">
                <button
                    onClick={onClose} // Close button action
                    className="absolute top-5 right-5 border border-red-300 rounded-md text-red-600 hover:text-gray-800 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="mt-8 md:mt-2 text-center">
                    <div className="text-2xl font-bold mb-2 flex items-center justify-center  space-x-4" >
                        <h3 >
                            Upload Resource Links
                        </h3>
                        <span className="text-red-600"><FaLink /></span>
                    </div>

                    <div className='pt-4 '>
                        <h3 className='text-lg text-blue-500 font-semibold'>
                            selected topic : <span className="text-red-700 underline">{currentSelectedRscSubcollection}</span>
                        </h3>

                        <form onSubmit={handleSubmit}  >
                            <div className="w-full mx-auto mt-4 mb-12">
                                <div className="text-left my-6 lg:px-12">
                                    <label htmlFor="filename" className="block text-blue-900 my-2 font-medium">
                                        Linkname :
                                    </label>
                                    <input
                                        type="text"
                                        id="Linkname"
                                        value={linkName}
                                        onChange={handleLinkNameChange}
                                        placeholder="Enter the Link name here.."
                                        className="border-2 rounded-md px-3  py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="text-left my-6 lg:px-12">
                                    <label htmlFor="LinkUrl" className="block text-blue-900 my-2 font-medium">
                                        Paste the url:
                                    </label>
                                    <input
                                        type="text"
                                        id="LinkUrl"
                                        value={linkUrl} 
                                        onChange={handleLinkUrlChange} 
                                        placeholder="Paste the URL here..."
                                        className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>


                            </div>

                            {
                                uploadClicked ? (
                                    <>
                                        <button
                                            className="tracking-wider text-green-500 hover:text-white border-2 border-green-600 mx-2 hover:bg-green-600 py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
                                        >
                                            UPLOADING...
                                        </button>
                                    </>
                                ) :
                                    (
                                        <>
                                            <button
                                                type="submit"
                                                className="tracking-wider text-green-500 hover:text-white border-2 border-green-600 mx-2 hover:bg-green-600 py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
                                            >
                                                UPLOAD
                                            </button>
                                        </>
                                    )
                            }
                            <button
                                type="button"
                                onClick={handleClearForm}
                                className="tracking-wider text-red-500 hover:text-white border-2 border-red-600 mx-2 hover:bg-red-600 py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
                            >
                                CANCEL
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>)

}

export default ResourceLinkUpload
