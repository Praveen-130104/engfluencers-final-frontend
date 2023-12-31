import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { app } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';



const AdminLogin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSignIn = async () => {
        try {

            //check if username and password are not empty
            if (email === '' && password === '') {
                alert('Please enter username and password');
                return;
            }
            if (email == '') {
                alert('Please enter username');
                return;
            }
            if (password == '') {
                alert('Please enter password');
                return;
            }
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/fileupload/worksheets');
        } catch (error) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="flex flex-col md:flex-row work-sans  h-screen items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-300 "

        >

            <div className=" w-full md:w-3/4 space-x-1 p-2 h-full py-32 flex justify-center items-center ">

                <div className="hidden lg:block w-1/2 h-full flex justify-center items-center ">
                    <div className="w-full h-full border-4 border-blue-500 rounded-full me-auto shadow-2xl">
                        <img
                            src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1692167676/login-vector_xdglsh.jpg"
                            alt="Login Background"
                            className="rounded-full w-full h-full"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-3/4 md:w-3/4 lg:w-1/2  flex flex-column justify-around items-center shadow-xl h-full border-2 bg-gradient-to-b from-slate-400 to-sky-50 rounded-2xl">
                    <div className=' w-9/12 flex justify-center flex-col items-center'>
                        <div className="text-center space-y-2 mt-4">
                            <h1 className="text-3xl lg:text-4xl  font-bold md:block hidden">
                               ENGFLUENECERS
                            </h1>
                            <h3 className="text-3xl md:text-xl font-semibold tracking-wider ">ADMIN LOGIN</h3>
                        </div>
                        <form className=" space-y-4 py-4  w-full  ">
                            <div className="space-y-2">
                                <label htmlFor="username" className="block font-medium">
                                    USERNAME :
                                </label>
                                <input
                                    className="border rounded-md px-3 py-2 w-full"
                                    type="text"
                                    id="username"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block font-medium">
                                    PASSWORD :
                                </label>
                                <input
                                    className="border rounded-md px-3 py-2 w-full"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <button
                                className="bg-blue-900 font-bold hover:bg-blue-700 text-white rounded-md px-4 py-2 w-full"
                                type='button'
                                onClick={handleSignIn} // Call the handleSignIn function when the button is clicked
                            >
                                LOG IN
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div className="w-11/12 h-3/4 flex md:flex-row flex-col  ">
                <div className="md:w-1/2 md:h-full w-full h-1/2 bg-indigo-500 rounded-l-2xl">
                    <img
                        src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1692167676/login-vector_xdglsh.jpg"
                        alt="Login Background"
                        className="object-cover h-full w-full rounded-l-2xl"
                    />
                </div>

                <div className="md:w-1/2 md:h-full w-full h-1/2  flex flex-col  items-center justify-center bg-indigo-300 rounded-r-2xl"
                >
                    <div className="text-center space-y-2 mt-4">
                        <h1 className="text-3xl font-bold md:block hidden">
                            SIGMAXX ACADEMY
                        </h1>
                        <h3 className="text-3xl md:text-xl font-semibold tracking-wider ">ADMIN LOGIN</h3>
                    </div>
                    <form className=" space-y-4 py-4  w-96 md:w-80 lg:w-96">
                        <div className="space-y-2">
                            <label htmlFor="username" className="block font-medium">
                                USERNAME :
                            </label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="text"
                                id="username"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block font-medium">
                                PASSWORD :
                            </label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button
                            className="bg-blue-900 hover:border border-blue-800 hover:text-blue-900 hover:bg-white text-white rounded-md px-4 py-2 w-full"
                            type='button'
                            onClick={handleSignIn} // Call the handleSignIn function when the button is clicked
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div> */}
        </div >
    );
}

export default AdminLogin;
