// import { Link } from "react-router-dom";

// function Navbar() {
//     return (

//         <nav className=" top-0 left-0 sticky overflow-hidden shadow-lg  border-0 border-b border-slate-400  bg-[#e6eff8]"
//         style={{
//             zIndex: 1000,
//         }}
//          >

//             <div className="w-full h-16 sm:h-20  relative">

//                 <div className="flex items-center h-full w-1/3 animate__animated animate__slideInLeft animate__delay-0.8s">
//                     <img
//                         className="h-3/5 lg:ps-10 ps-8"
//                         src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1696088195/WhatsApp_Image_2023-09-25_at_12.-removebg-preview_k4u77o.png"
//                         alt="logo"
//                     />
//                 </div>

//                 <div className="h-full w-2/3  absolute top-0 right-0 ">
//                     <div className="flex justify-center  items-center h-full w-full ">
//                         <div className="ms-auto md:me-6 lg:me-12 xl:me-32">
//                             <div className=" w-full  hidden md:block  transform  ">
//                                 <ul className="flex justify-center items-center lg:space-x-14 xl:space-x-20 space-x-8 ">
//                                     <Link to='/user' className=" rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-400 ease-in-out sm:text-xl md:text-sm font-semibold   tracking-wider  hover:bg-blue-600  hover:text-white px-2 py-1 lg:px-3 lg:py-2  ">
//                                         HOME
//                                     </Link>
//                                     <Link to='/user/blog' className="rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-400 ease-in-out sm:text-xl md:text-sm font-semibold   tracking-wider hover:bg-blue-600  hover:text-white  px-2 py-1 lg:px-3 lg:py-2   ">
//                                         BLOG
//                                     </Link>
//                                     <Link to='/user/worksheets' className="rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-400 ease-in-out sm:text-xl md:text-sm font-semibold tracking-wider hover:bg-blue-600  hover:text-white  px-2 py-1 lg:px-3 lg:py-2 ">
//                                         RESOURCES
//                                     </Link>
//                                     <li className="rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-400 ease-in-out sm:text-xl md:text-sm font-semibold tracking-wider hover:bg-blue-600  hover:text-white  px-2 py-1 lg:px-3 lg:py-2  ">
//                                         <a href="#contact">CONTACT</a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>


//     );
// }

// export default Navbar;

import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

const  Navbar = () => {

    const [showSmNav, setShowSmNav] = useState(false);

    const toggleSmNav = () => {
        setShowSmNav(!showSmNav);
    };



    return (

        <nav className=" top-0 sticky w-full overflow-hidden shadow-lg  border-0 border-b-2 border-blue-900  bg-[#e6eff8]"
            style={{
                zIndex: 1000,
            }}
        >

            <div className="w-full h-14 my-2 sm:my-0 sm:h-20 relative">

               <div className="flex items-center h-full w-2/3 sm:w-1/3 animate__animated animate__slideInLeft animate__delay-0.8s">
                    <Link to='/' className=" h-1/2 ps-2  md:mx-4">
                        <img
                            className="h-full"
                            src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1696088195/WhatsApp_Image_2023-09-25_at_12.-removebg-preview_k4u77o.png"
                            alt="logo"
                        />
                    </Link>    
                </div>

                <div className="h-full w-2/3  absolute top-0 right-0 ">
                    <div className="flex justify-center  items-center h-full w-full ">
                        <div className="ms-auto md:me-6 lg:me-12 xl:me-32">
                            <div className=" w-full  hidden md:block  transform  ">
                                <ul className="flex justify-center items-center lg:space-x-14 xl:space-x-20 space-x-8 ">
                                    <Link to='/'
                                        className=" rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-500 ease-in-out sm:text-xl md:text-sm font-semibold   tracking-wider focus:bg-sky-500 focus:text-white  hover:bg-sky-500  hover:text-white px-2 py-1 lg:px-3 lg:py-2  ">
                                        HOME
                                    </Link>
                                    <Link to='/blog' className="rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-500 ease-in-out sm:text-xl md:text-sm font-semibold   tracking-wider focus:bg-sky-500 focus:text-white hover:bg-sky-500  hover:text-white  px-2 py-1 lg:px-3 lg:py-2   ">
                                        BLOG
                                    </Link>
                                    <Link to='/resources' className="rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-500 ease-in-out sm:text-xl md:text-sm font-semibold tracking-wider focus:bg-sky-500 focus:text-white hover:bg-sky-500  hover:text-white  px-2 py-1 lg:px-3 lg:py-2 ">
                                        RESOURCES
                                    </Link>

                                    <li 
                                    className="rounded-lg border border-blue-950 shadow-md hover:underline  transition duration-500 ease-in-out sm:text-xl md:text-sm font-semibold tracking-wider focus:bg-sky-500 focus:text-white hover:bg-sky-500  hover:text-white  px-2 py-1 lg:px-3 lg:py-2  ">
                                       <a href="#contact">CONTACT</a> 
                                    </li>
                                </ul>
                            </div>
                            <div className="block md:hidden me-8  transition-all duration-500 ease-in-out">
                                {
                                    showSmNav ?
                                        (<button
                                            onClick={toggleSmNav}
                                            className="text-2xl animate__animated animate__flipInY rounded-lg text-blue-900 border-2 border-blue-900 px-3 py-2">
                                            < RxCross1 />
                                        </button>
                                        ) :
                                        (
                                            <button
                                                onClick={toggleSmNav}
                                                className="text-2xl rounded-lg animate__animated animate__flipInX text-blue-900 border-2 border-blue-900 px-3 py-2">
                                                <GiHamburgerMenu />
                                            </button>
                                        )
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className={`bg-blue-950 fixed w-full smNav md:hidden ${showSmNav ? "block animate__animated animate__fadeIn" : "hidden"}`}>
                <div className="w-full h-72 py-3  ">
                    <ul className="flex flex-col animate__animated animate__backInDown justify-center items-center space-y-2">
                        <Link to='/'
                            onClick={toggleSmNav}
                            className="text-center  w-full cursor-pointer text-white shadow-md hover:underline  transition-all duration-500 ease-in-out text-xl  font-bold   tracking-wider  hover:bg-slate-200  hover:text-blue-950 py-4  ">
                            HOME
                        </Link>

                        <Link to='/blog'
                            onClick={toggleSmNav}
                            className="text-center  w-full cursor-pointer text-white shadow-md hover:underline  transition-all duration-500 ease-in-out text-xl  font-bold   tracking-wider hover:bg-slate-200  hover:text-blue-950 py-4   ">
                            BLOG
                        </Link>
                        <Link to='/resources'
                            onClick={toggleSmNav}
                            className="text-center  w-full cursor-pointer text-white shadow-md  hover:underline  transition-all duration-500 ease-in-out text-xl  font-bold tracking-wider hover:bg-slate-200  hover:text-blue-950 py-4">
                            RESOURCES
                        </Link>
                        <button onClick={toggleSmNav}>
                            <li className="text-center  w-full cursor-pointer text-white shadow-md  hover:underline  transition-all duration-500 ease-in-out text-xl font-bold tracking-wider hover:bg-slate-200  hover:text-blue-950 py-4">
                                <a href="#contact">CONTACT</a>
                            </li>
                        </button>
                    </ul>
                </div>
            </div>

        </nav>


    );
}

export default Navbar;


