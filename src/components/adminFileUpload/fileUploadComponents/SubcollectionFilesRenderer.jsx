  import { BsTrash3, BsEyeFill , BsEmojiFrown} from "react-icons/bs";

const SubcollectionFilesRenderer = ({ subcollection , onDeletePdfFile}) => {

  return (
    <div className="pt-2">
       {subcollection.files?.length === 0 ? (
        <p className="text-red-500 font-semibold p-3 flex justify-center items-center gap-4">No files available <span><BsEmojiFrown /></span></p>
      ) : (
      subcollection.files?.map((i, index) => (
        <div key={index} className="mb-1 text-blue-900 rounded-lg border-b border-gray-400 text-2xl hover:bg-slate-50 hover:underline bg-white">
          <div className="flex justify-between items-center px-4 py-1">
            <span className="hover:text-indigo-900 cursor-pointer">
              {i.filename.charAt(0).toUpperCase() + i.filename.slice(1)}
            </span>
            <div className="space-x-6 flex justify-center items-center align-middle">
              <a
                href={i.fileurl}
                className="ml-6 text-lg p-2 my-2 border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsEyeFill />
              </a>
              <button
                className="ml-6 text-lg p-2 my-2 border border-red-400 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out "
                onClick={() => onDeletePdfFile(subcollection.name , i.filename)}
              >
                <BsTrash3 />
              </button>
            </div>
          </div>
        </div>
      ))
      )}
    </div>

  );
};

export default SubcollectionFilesRenderer;
