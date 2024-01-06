import { useState } from 'react'
import axios from 'axios'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'

export const FileUpload = ({ isOpen, onClose, currentSelectedSubcollection }) => {

  const [filename, setfilename] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

    const [uploadClicked, setUploadClicked] = useState(false);

  const handlefilenameChange = (event) => {
    setfilename(event.target.value);
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(currentSelectedSubcollection);
    try {
      //display separate alert messages for empty filename and file inputs
      if (!filename && !selectedFile) {
        alert("Please enter a filename and provide a file");
        return;
      }
      if (!filename) {
        alert("Please enter a filename");
        return;
      }
      if (!selectedFile) {
        alert("Please choose a file");
        return;
      }
       setUploadClicked(true);

      const formData = new FormData();
      formData.append("filename", filename);
      formData.append("file", selectedFile);

      // Construct the URL for the POST request
      const url = `https://engfluencers-final-backend.vercel.app/admin/fileupload?subcollectionName=${currentSelectedSubcollection}`;

      const response = await axios.post(url, formData);

      if (response.status === 201) {
        setUploadClicked(false);
        alert("File uploaded successfully");
        // Clear form inputs after successful upload
        setfilename("");  
        setSelectedFile(null);
        onClose();
        alert("File uploaded successfully");
        

      } else {
        // console.log("Failed to upload file");
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error scenario, show error message to the user, etc.
    }
  };



  const handleClearForm = () => {
    setfilename("");
    setSelectedFile(null);
    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.value = "";
    }
    onClose();
  };


  return (

    <div
    className={` fixed top-0 left-0 w-full h-full flex flex-col  items-center justify-center bg-gray-700 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
  >
    <div className="bg-white relative w-11/12 md:w-9/12 h-fit  p-6 rounded-lg shadow-lg animate__animated animate__zoomIn">
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
              Upload PDF File
            </h3>
            <span className="text-red-600"><BsFillFileEarmarkPdfFill /></span>
          </div>

          <div className='pt-4 '>
            <h3 className='text-lg text-blue-500 font-semibold'>
            selected topic : <span className="text-red-700 underline">{currentSelectedSubcollection}</span>
            </h3>

            <form onSubmit={handleSubmit}  >
            <div className="w-full mx-auto mt-4 mb-12">
                <div className="text-left my-6 lg:px-12">
                  <label htmlFor="filename" className="block text-blue-900 my-2 font-medium">
                    Filename :
                  </label>
                  <input
                    type="text"
                    id="filename"
                    value={filename}
                    onChange={handlefilenameChange}
                    placeholder="Enter the file name here.."
                    className="border-2 rounded-md px-3  py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className=" text-left my-6 lg:px-12">
                  <label htmlFor="file  " className="block my-2 text-blue-900 font-medium">
                     Choose File :
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept='.pdf'
                    onChange={handleFileChange}
                    className="w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

               {
                uploadClicked ? (
                  <>
                    <button
                      className="tracking-wider text-green-500 hover:text-white border-2 border-green-600 mx-2 hover:bg-green-600 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
                    >
                      UPLOADING...
                    </button>
                  </>
                ) :
                  (
                    <>
                      <button
                        type="submit"
                        className="tracking-wider text-green-500 hover:text-white border-2 border-green-600 mx-2 hover:bg-green-600 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
                      >
                        UPLOAD
                      </button>
                    </>
                  )
              }
              <button
                type="button"
                onClick={handleClearForm}
                className="tracking-wider text-red-500 hover:text-white border-2 border-red-600 mx-2 hover:bg-red-600 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
              >
                CANCEL
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
