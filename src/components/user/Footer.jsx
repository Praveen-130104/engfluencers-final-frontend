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
    return (
        <div className="py-4 bg-blue-950 w-full work-sans " id="contact">
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
        </div>
    )
}

export default Footer;
