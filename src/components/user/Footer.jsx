import { useState } from "react";
import {
    FaWhatsapp,
    FaInstagram,
    FaTelegram,
    
    FaFacebook,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { IoMdCall } from "react-icons/io";

const Footer = () => {

    
    const [showModel, setShowModel] = useState(false);

    const openModel = () => {
        setShowModel(true);
    }

    const closeModel = () => {
        setShowModel(false);
    }

    setTimeout(() => {
        setShowModel(false);
    }, 3000);
    
    return (
        <div className="py-4 bg-blue-950 w-full work-sans relative" id="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-10 md:gap-2 ">
                <div className="text-white mt-4 md:mt-8 md:mx-auto mx-12  order-last md:order-first">
                    <h1 className="text-lg  font-bold underline underline-offset-4">
                        CONTACT US
                    </h1>
                    <ul className="mt-4">
                        <li className="text-md mb-2">thesigmaxx@gmail.com</li>
                        {/* <li className="text-md mb-2">
                            <Link to="/blog" >
                                Blog
                            </Link>
                        </li> */}
                        <li className="text-md mb-2 flex gap-2 items-center">Contact Us <IoMdCall /> :</li>
                        
                        <li className="text-md ms-12 md:mx-6">
                            +91 9136781709
                        </li>
                    </ul>
                </div>
                <div className="text-white text-center order-first  ">
                    <h1 className="text-2xl  font-bold tracking-widest ">
                        ENGFLUENCERS
                    </h1>
                    <ul className="flex justify-center space-x-4 mt-8 pb-6  gap-4">
                        <li className="text-4xl text-orange-200">
                            <Link to="https://wa.me/919136781709" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp />
                            </Link>
                        </li>
                        <li className="text-4xl text-orange-200">
                            <Link to="https://instagram.com/thesigmaxx" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </Link>
                        </li>
                        <li className="text-4xl text-orange-200">
                            {/* <Link to="https://t.me/mu_aia" target="_blank" rel="noopener noreferrer">
                            
                                <FaTelegram />
                            </Link> */}
                            <Link to="https://t.me/TheSigmaxx" target="_blank" rel="noopener noreferrer">
                                <FaTelegram />
                            </Link>
                        </li>
                        <li className="text-4xl text-orange-200">
                            <Link to="https://twitter.com/thesigmaxx" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter />
                            </Link>
                        </li>
                        <li className="text-4xl text-orange-200">
                            <Link to="https://www.facebook.com/profile.php?id=61554920437821" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </Link>
                        </li>
                    </ul>
                    <hr className="w-3/4 md:w-full mx-auto border border-orange-500" />
                </div>
                <div className="text-white flex flex-col items-center md:mt-8 mx-auto md:order-last ">
                    <h1 className="text-lg font-bold underline underline-offset-4 mb-4">
                        USEFUL LINKS
                    </h1>
                    <div className="space-y-3 mt-2">
                        <div className="w-[160px]">
                            <Link to="mailto:thesigmaxx@gmail.com"  target="_blank" rel="noopener noreferrer">
                                <button className="tracking-widest border-2 border-orange-500 w-full px-6 py-2 hover:bg-white hover:text-black">
                                    EMAIL
                                </button>
                            </Link>
                        </div>
                        <div className="w-[160px]">
                            <Link to="/blog"  >
                                <button className="tracking-widest border-2 border-orange-500 w-full px-6 py-2 hover:bg-white hover:text-black">
                                    <div className="flex items-center justify-center gap-2">
                                        BLOG
                                    </div>
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            <p
                className="mt-12 text-center text-white w-full text- "
                style={{ fontFamily: "poppins" }}
            >
                Copyrights @ 2024 Engfluencers - Privacy | Terms of Service
            </p>


            <div className="h-2 w-2 bg-transparent bottom-4 cursor-pointer right-4 top-4 absolute "
                onClick={openModel}
            >

            </div>



            <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${showModel ? "block" : "hidden"}`}>

                <div className="bg-blue-950 animate__animated animate__fadeInUp w-full h-1/2 mx-2 sm:mx-4 md:mx-0 md:w-1/2 p-2 sm:p-4 md:p-8 rounded-lg">


                    <div className="w-full h-full border-2 bg-white border-blue-100 shadow-lg rounded-lg overflow-hidden">
                        <div className="w-full bg-sky-100 py-2 border-b-2 border-sky-500 flex justify-center items-center text-center font-bold text-lg md:text-xl">
                            <div className="w-full h-auto relative flex justify-center items-center">
                                <h1 className="tracking-wide" style={{ fontFamily: "poppins" }}>
                                    DEVELOPERS OF THIS WEBSITE
                                </h1>
                                <span className="absolute right-4 top-0 -translate-y-0">
                                <button className=" text-red-500 px-1
                                hover:text-red-700 transition duration-500 ease-in-out
                                
                                " onClick={closeModel}>
                                    X
                                </button>
                            </span>
                            </div>
                            
                        </div>


                        <div className="grid grid-cols-2 h-full relative">


                            <div className="flex flex-col items-center justify-center mb-20 text-center space-y-2">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 border-2 mb-4 border-sky-500 shadow-md rounded-full overflow-hidden">
                                    <img
                                        src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1704203324/727721EUEC095_ts6lxv.jpg"
                                        alt="Profile Image"
                                        className="w-full h-full object-contain "
                                    />
                                </div>
                                <h2 className="mt-4 text-xl font-bold tracking-wider">S. MUKESH</h2>
                                <h3 className="text-gray-700 font-semibold">B.E - ECE  <span className="text-sm font-normal">(2021 - 2025)</span> </h3>
                                <p className="text-gray-600 text-sm my-2 font-semibold">SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY</p>
                            </div>


                            <div className="flex flex-col items-center justify-center mb-20 text-center space-y-2">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 border-2 mb-4 border-sky-500 shadow-md rounded-full overflow-hidden">
                                    <img
                                        src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1704203323/727721EUEC113_owbfig.jpg"
                                        alt="Profile Image"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h2 className="mt-4 text-xl font-bold tracking-wider">K. PRAVEEN</h2>
                                <h3 className="text-gray-700 font-semibold">B.E - ECE <span className="text-sm font-normal">(2021 - 2025)</span> </h3>
                                <p className="text-gray-600 text-sm my-2 font-semibold">SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY</p>
                            </div>

                            <div className="absolute h-52 md:h-72 bg-blue-400 w-1
                        left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer;
