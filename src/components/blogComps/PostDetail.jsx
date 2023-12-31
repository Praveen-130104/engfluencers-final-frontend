import React from "react";
import moment from "moment"
import { AiOutlineCalendar } from "react-icons/ai";

const PostDetail = ({ post }) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={`b-${index}`} className="font-extrabold">{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={`em-${index}`} className="font-italic">{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={`u-${index}`} className="font-bold text-md lg:text-xl mx-2 text-blue-900">{text}</u>;
      }
      
    }

    return <React.Fragment key={`fragment-${index}`}>{modifiedText}</React.Fragment>;
  };


  return (
    <div className="bg-white work-sans shadow-md rounded lg:px-8 pb-12 mb-8 rounded-t-lg">
      <div className="relative border-0 border-b-2 border-gray-300 shadow-xl overflow-hidden pb-80 mb-6 lg:h-96 " >
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-contain absolute md:hover:scale-110 transition-all duration-500 ease-in-out w-full h-full bg-blue-100 "
        />
      </div>

      <div className="px-4 lg:p-0 lg:pt-6">

        <div className="flex items-center mb-4 lg:mb-2 w-full lg:w-auto mr-8">
      
          <p className="inline align-middle text-blue-900 text-lg hover:underline " >
        
            {post.author.name}
            
          </p>
        </div>

        <div className="font-medium text-blue-900 lg:mb-6">
          <AiOutlineCalendar className="inline align-middle mr-2" />
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
        <h1 className="mb-8 text-3xl open-sans-semibold lg:text-5xl lg:font-bold font-semibold transition-all hover:text-gray-700  ease-in-out duration-300 hover:-translate-y-0.5">{post.title}</h1>

        <div className="ps-4 lg:ps-8  text-md md:text-lg ">
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) =>
              getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>

      </div>


    </div>
  )
}

export default PostDetail