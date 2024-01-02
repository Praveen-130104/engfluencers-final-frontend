import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../../firebaseConfig";

import { BsTrash3 } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDone } from 'react-icons/md';
import ResourceSubCollection from "./resourceUploadComponents/ResourceSubCollection";

const AdminResourceUpload = () => {

    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth < 768);

    const [ResourceCollections, setResourceCollections] = useState([]);

    const [RscCollectionTitle, setRscCollectionTitle] = useState("");

    const [selectedRscCollection, setSelectedRscCollection] = useState(null);

    const [editModes, setEditModes] = useState(Array(ResourceCollections.length).fill(false));

    const [RscCollectionName, setRscCollectionName] = useState("");


    const [editingCollectionId, setEditingCollectionId] = useState(null); // Track the currently editing collection ID




    useEffect(() => {
        fetchCollections();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const fetchCollections = async () => {
        try {
            const response = await axios.get("https://engfluencers-final-backend.vercel.app/admin/resources"); // Replace with your actual API endpoint

            if (response.status === 200) {
                //extracting collections array from response
                const { collections } = response.data;

                setResourceCollections(collections);
            } else {
                console.error("Error fetching collections");
            }
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    };

    const handleRscCreateCollection = async () => {
        if (!RscCollectionTitle) {
            return; // If the new collection name is empty, do nothing
        }

        try {
            const response = await axios.post("https://engfluencers-final-backend.vercel.app/admin/resources", {
                RscCollectionTitle,
            });

            if (response.status === 201) {
                // alert("Collection created successfully.");
                setRscCollectionTitle(""); // Clear the input field
                fetchCollections(); // Refresh the list of collections
            }
            else {
                alert("Error creating collection.");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Collection already exists.");
            }
            else {
                console.error("Error creating collection:", error);
            }
        }

    };

    const editCollection = async (collectionName, collectionId) => {

        try {
            const response = await axios.put(`https://engfluencers-final-backend.vercel.app/admin/resources/${collectionId}`, {
                collectionName,
            });

            if (response.status === 200) {
                alert("Collection updated successfully.");
                setEditModes((prevModes) => {
                    const updatedModes = [...prevModes];
                    const collectionIndex = ResourceCollections.findIndex((collection) => collection._id === collectionId);
                    if (collectionIndex !== -1) {
                        updatedModes[collectionIndex] = false;
                    }
                    return updatedModes;
                });
                fetchCollections();
            }
            else {
                alert("Error updating collection.");
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

    const handleDeleteRscCollection = async (collectionId) => {
        // console.log(collectionId);
        try {
            const response = await axios.delete(`https://engfluencers-final-backend.vercel.app/admin/resources/${collectionId}`);

            if (response.status === 200) {
                alert("Collection deleted successfully.");
                fetchCollections();
            }
            else {
                alert("Error deleting collection.");
            }
        } catch (error) {
            console.error("Error deleting collection:", error);
        }
    };

    const handleCollectionClick = (collectName) => {
        setSelectedRscCollection(collectName);

        // console.log(isMediumScreen)

        if (isMediumScreen) {
            const modalElement = document.getElementById('defaultModal');
            modalElement.classList.remove('hidden');
        }
    };

    const handleRscCollectionTitleChange = (event) => {
        setRscCollectionTitle(event.target.value);
    };

    const handleModelClose = () => {
        const modalElement = document.getElementById('defaultModal');
        modalElement.classList.add('hidden');
    }


    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((user) => {
            // console.log("user", user);
            if (user) {
                setIsAuth(true);
                // console.log("User is signed in");
            } else {

                // console.log("User is not signed in")
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

    return (

        <>
            {
                isAuth && (
                    <div className="w-full h-auto " style={{
                        // backgroundImage: 'url("https://res.cloudinary.com/dfsvudyfv/image/upload/v1699782359/Untitled_design_1_uipqyj.png")',

                    }}>

                        <div className='lg:container mx-auto h-full w-full overflow-hidden '>
                            <div className="md:grid grid-cols-5 h-full lg:gap-4 ">


                                <div className="mx-5 md:w-full md:mx-auto md:col-span-2 flex justify-center items-center p-2">
                                    <div className=" w-full h-full">

                                        {/* {ResourceCollections.length === 0 ? (
                                            <p className="text-gray-500">No Resources found.</p>
                                        ) : ( */}
                                            <div className="w-full h-full animate__animated animate__slideInLeft animate__delay-0.7s ">

                                                <div className="w-full bg-blue-950 py-6 text-center">
                                                    <h1 className="font-bold xl:text-3xl text-xl tracking-widest text-white">ALL TOPICS</h1>
                                                </div>

                                                <div className="h-[65vh] max-h-[65vh] bg-slate-100">
                                                    <div className="px-2  h-full  py-1 overflow-y-scroll overflow-x-hidden ">
                                                        <ul className="space-y-2 pt-4">
                                                            {ResourceCollections.map((collection, id) => (

                                                                <div key={id}
                                                                    className="w-full  flex justify-between items-center  my-2 text-blue-800  hover:bg-white  align-middle "
                                                                >
                                                                    {editModes[id] && editingCollectionId === collection._id ? (
                                                                        <input
                                                                            type="text"
                                                                            value={RscCollectionName}
                                                                            onChange={(e) => setRscCollectionName(e.target.value)}
                                                                            className="border-2 border-orange-500 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="w-full truncate py-2 group cursor-pointer"
                                                                            onClick={() => handleCollectionClick(collection.name)}
                                                                        >
                                                                            <h2 className={`transition-transform  ease-in-out group-hover:scale-105 text-blue-800 hover:underline ${collection.name.length > 16 ? 'marquee' : ''}   hover:bg-white group-hover:text-red-500 px-4 flex items-center justify-between font-semibold text-lg md:text-md lg:text-xl`}>
                                                                                {collection.name.toUpperCase()}
                                                                            </h2>
                                                                        </div>

                                                                    )}

                                                                    <div className="flex space-x-6 ps-4 md:ps-0 lg:space-x-8 me-2 lg:me-4">
                                                                        <button
                                                                            className="ml-2 md:text-lg xl:text-xl text-xl p-2 my-2 border lg:border-2 border-green-400 text-green-500 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-300 ease-in-out "
                                                                            onClick={() => {
                                                                                if (!editModes[id]) {
                                                                                    setEditingCollectionId(collection._id);
                                                                                    setRscCollectionName(collection.name); // Set collection name when entering edit mode
                                                                                } else {
                                                                                    editCollection(RscCollectionName, collection._id);
                                                                                }
                                                                                const updatedEditModes = Array(ResourceCollections.length).fill(false); // Reset all edit modes
                                                                                updatedEditModes[id] = !updatedEditModes[id]; // Toggle the current edit mode
                                                                                setEditModes(updatedEditModes);
                                                                            }}
                                                                        >
                                                                            {editModes[id] ? <MdDone /> : <RiEdit2Fill />}
                                                                        </button>

                                                                        <button
                                                                            className="ml-4 lg:ml-6 md:text-lg xl:text-xl text-xl p-2 my-2 border lg:border-2 border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
                                                                            onClick={() => handleDeleteRscCollection(collection._id)}
                                                                        >
                                                                            <BsTrash3 />
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            ))}

                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className=" h-36 w-full">
                                                    <div className="h-full w-full bg-blue-950 ">
                                                        <div className="py-4 flex flex-col space-y-4 mx-auto justify-center items-center space-x-4">
                                                            <input
                                                                className=" border-2 border-blue-500 rounded-md w-2/3 py-2"
                                                                type="text"
                                                                value={RscCollectionTitle}
                                                                onChange={handleRscCollectionTitleChange}
                                                                placeholder="Enter Collection title"
                                                            />

                                                            <button
                                                                className="bg-blue-700 hover:bg-white hover:text-blue-800 hover:border-blue-600 border-2 text-white py-2 px-4 rounded-md"
                                                                onClick={handleRscCreateCollection}
                                                            >
                                                                Create Collection
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        {/* )} */}


                                    </div>
                                </div>



                                {/* md above screen */}
                                <div className="hidden col-span-3 md:flex justify-center items-center p-2">
                                    <div className=" w-full h-full ">
                                        {
                                            ResourceCollections.length > 0 &&
                                            <div className="h-full w-full animate__animated animate__slideInRight">
                                                {selectedRscCollection ? (
                                                    <ResourceSubCollection selectedRscCollection={selectedRscCollection} />
                                                ) : (
                                                    <>
                                                        <div className="bg-slate-200 animate__animated animate__slideInRight animate__delay-1s w-full h-full flex justify-center items-center">
                                                            <p className="text-gray-500">No Resources selected.</p>

                                                        </div>
                                                    </>

                                                )}

                                            </div>
                                        }
                                    </div>
                                </div>



                            </div>

                        </div>


                        {/* small screen */}

                        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className=" md:hidden hidden fixed top-0  w-full h-full ">
                            <div className="bg-slate-950 px-6 bg-opacity-40 backdrop-blur-sm h-full flex justify-center pt-24 w-full "

                            >
                                <div className="mx-auto w-full h-auto md:hidden  animate__animated animate__zoomIn">
                                    <div className=" w-full h-[60vh]">
                                        {
                                            ResourceCollections.length > 0 &&
                                            <div className="w-full h-full">
                                                <div className="h-full w-full">
                                                    {selectedRscCollection &&
                                                        <ResourceSubCollection selectedRscCollection={selectedRscCollection} handleModelClose={handleModelClose} />
                                                    }
                                                </div>
                                            </div>
                                        }

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </>

    )
}

export default AdminResourceUpload
