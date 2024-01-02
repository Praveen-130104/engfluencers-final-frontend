import { useState, useEffect } from "react";
import axios from "axios";



import { BsTrash3 } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDone } from 'react-icons/md';



const Collections = ({ selectedCollection, updateSelectedCollection , sizeFunc}) => {

    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth < 768);

    const [collectionTitle, setCollectionTitle] = useState("");

    const [collections, setCollections] = useState([]);


    const [collectionName, setCollectionName] = useState("");

    const [editModes, setEditModes] = useState(Array(collections.length).fill(false));

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
            const response = await axios.get("https://engfluencers-final-backend.vercel.app/admin/collections"); // Replace with your actual API endpoint

            if (response.status === 200) {
                //extracting collections array from response
                const { collections } = response.data;

                setCollections(collections);
            } else {
                console.error("Error fetching collections");
            }
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    };

    const editCollection = async (collectionName, collectionId) => {

        try {
            const response = await axios.put(`https://engfluencers-final-backend.vercel.app/admin/collections/${collectionId}`, {
                collectionName,
            });

            if (response.status === 200) {
                alert("Collection updated successfully.");
                setEditModes((prevModes) => {
                    const updatedModes = [...prevModes];
                    const collectionIndex = collections.findIndex((collection) => collection._id === collectionId);
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


    const handleCollectionClick = (collectName) => {
        updateSelectedCollection(collectName);

        if (isMediumScreen) {
            sizeFunc();
        }
    };


    const handleCreateCollection = async () => {
        if (!collectionTitle) {
            return; // If the new collection name is empty, do nothing
        }

        try {
            const response = await axios.post("https://engfluencers-final-backend.vercel.app/admin/collections", {
                collectionTitle,
            });

            if (response.status === 201) {
                alert("Collection created successfully.");
                setCollectionTitle(""); // Clear the input field
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

    const handleDeleteCollection = async (collectionId) => {
        // console.log(collectionId);
        try {
            const response = await axios.delete(`https://engfluencers-final-backend.vercel.app/admin/collections/${collectionId}`);

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



    const handlecollectionTitleChange = (event) => {
        setCollectionTitle(event.target.value);
    };


    return (

        <div className="w-full ">

            {/* {collections.length === 0 ? (
                <p className="text-gray-500">No Collections found.</p>
            ) : ( */}

                <div className="w-full h-full animate__animated animate__slideInLeft animate__delay-0.7s ">

                    <div className="w-full bg-blue-950 py-6 text-center">
                        <h1 className="font-bold xl:text-3xl text-xl tracking-widest text-white">ALL TOPICS</h1>
                    </div>

                    <div className="h-[65vh] max-h-[65vh] bg-slate-100">
                        <div className="px-2  h-full  py-1 overflow-y-scroll overflow-x-hidden ">
                            <ul className="space-y-2 pt-4">
                                {collections.map((collection, id) => (

                                    <div key={id}
                                        className="w-full flex justify-between items-center  my-2 text-blue-800 hover:underline hover:bg-white hover:text-red-500  align-middle "
                                    >
                                        {editModes[id] && editingCollectionId === collection._id ? (
                                            <input
                                                type="text"
                                                value={collectionName}
                                                onChange={(e) => setCollectionName(e.target.value)}
                                                className="border-2 border-orange-500 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <div
                                                className="w-full truncate py-2 cursor-pointer"
                                                onClick={() => handleCollectionClick(collection.name)}
                                            >
                                                <h2 className={`text-blue-800 hover:underline ${collection.name.length > 15 ? 'marquee' : ''}   hover:bg-white hover:text-red-500 px-4 flex items-center justify-between`}>
                                                    {collection.name.toUpperCase()}
                                                </h2>
                                            </div>

                                        )}

                                        <div className="flex space-x-6 me-4">
                                            <button
                                                className="ml-6 md:text-lg xl:text-xl text-sm p-2 my-2 border-2 border-green-400 text-green-500 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-300 ease-in-out "
                                                onClick={() => {
                                                    if (!editModes[id]) {
                                                        setEditingCollectionId(collection._id);
                                                        setCollectionName(collection.name); // Set collection name when entering edit mode
                                                    } else {
                                                        editCollection(collectionName, collection._id);
                                                    }
                                                    const updatedEditModes = Array(collections.length).fill(false); // Reset all edit modes
                                                    updatedEditModes[id] = !updatedEditModes[id]; // Toggle the current edit mode
                                                    setEditModes(updatedEditModes);
                                                }}
                                            >
                                                {editModes[id] ? <MdDone /> : <RiEdit2Fill />}
                                            </button>

                                            <button
                                                className="ml-6 md:text-lg xl:text-xl text-sm p-2 my-2 border-2 border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
                                                onClick={() => handleDeleteCollection(collection._id)}
                                            >
                                                <BsTrash3 />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Create new collection */}
                    <div className=" h-36 w-full">
                        <div className="h-full w-full bg-blue-950 ">
                            <div className="py-4 flex flex-col space-y-4 mx-auto justify-center items-center space-x-4">
                                <input
                                    className=" border-2 border-blue-500 rounded-md w-2/3 py-2"
                                    type="text"
                                    value={collectionTitle}
                                    onChange={handlecollectionTitleChange}
                                    placeholder="Enter Collection title"
                                />
                                <button
                                    className="bg-blue-700 hover:bg-white hover:text-blue-800 hover:border-blue-600 border-2 text-white py-2 px-4 rounded-md"
                                    onClick={handleCreateCollection}
                                >
                                    Create Collection
                                </button>
                            </div>
                        </div>
                    </div>

                </div >
            {/* )} */}


            
        </div>
    );
};

export default Collections
