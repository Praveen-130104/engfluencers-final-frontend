import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs"

const PostCard = ({ post }) => {

  const renderContent = (content) => {
    if (!content || !content.raw || !content.raw.children) return null;

    return content.raw.children.map((child, index) => {
      if (child.type === "paragraph") {
        return (
          <p key={index} className="mb-2">
            {child.children.map((text, textIndex) => {
              if (text.underline) {
                return <u key={textIndex}>{text.text}</u>;
              } else if (text.bold) {
                return <strong key={textIndex}>{text.text}</strong>;
              } else if (text.italic) {
                return <em key={textIndex}>{text.text}</em>;
              } else {
                return (
                  <React.Fragment key={textIndex}>{text.text}</React.Fragment>
                );
              }
            })}
          </p>
        );
      } else if (child.type === "heading-three") {
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {child.children.map((text, textIndex) => (
              <React.Fragment key={textIndex}>{text.text}</React.Fragment>
            ))}
          </h3>
        );
      } else if (child.type === "heading-four") {
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {child.children.map((text, textIndex) => (
              <React.Fragment key={textIndex}>{text.text}</React.Fragment>
            ))}
          </h4>
        );
      } else if (child.type === "image") {
        const { alt, height, width, src } = child;
        return (
          <img key={index} alt={alt} height={height} width={width} src={src} />
        );
      } else if (child.type === "unordered-list") {
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {child.children.map((text, textIndex) => (
              <li key={textIndex}>
                {text.children.map((text, textIndex) => (
                  <React.Fragment key={textIndex}>{text.text}</React.Fragment>
                ))}
              </li>
            ))}
          </ul>
        );
      } else if (child.type === "ordered-list") {
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            {child.children.map((text, textIndex) => (
              <li key={textIndex}>
                {text.children.map((text, textIndex) => (
                  <React.Fragment key={textIndex}>{text.text}</React.Fragment>
                ))}
              </li>
            ))}
          </ol>
        );
      } else if (child.type === "block-quote") {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-400 pl-4 mb-4"
          >
            {child.children.map((text, textIndex) => (
              <React.Fragment key={textIndex}>{text.text}</React.Fragment>
            ))}
          </blockquote>
        );
      }

      return null;
    });
  };

  return (
    <div className=""
    data-aos="fade-up"
    data-aos-delay="100"
    data-aos-duration="1000"
    >
      <div className="flex  flex-col w-full  md:w-10/12 md:mx-auto  px-4 sm:px-0">

        <div className="w-full sm:px-12 md:px-0 md:w-11/12  mb-4 md:mb-0 mx-auto flex justify-between text-center items-center ">
          <div className="flex items-center  lg:justify-center md:my-2 md:space-x-4">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="align-middle object-contain rounded-full h-12 w-12 border-2 border-blue-400"
            
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.author.name.toUpperCase()}
            </p>
          </div>
          <div className="font-medium underline sm:no-underline text-sm sm:text-lg text-sky-600 ps-12 md:ps-0">
            <AiOutlineCalendar className="inline align-middle mr-2" />
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>


        <div className="md:hover:-translate-y-2 overflow-hidden hover:shadow-none transition-all duration-500 ease-in-out bg-white w-full sm:w-10/12 lg:w-full xl:w-10/12 sm:mx-auto shadow-xl border border-gray-300 rounded-t-xl mb-14 pb-4">

          <div className="relative border-0 border-b-2 border-gray-300 shadow-xl overflow-hidden pb-80 mb-6 " >
            <img
              src={post.featuredImage.url}
              alt={post.title}
              className="object-contain absolute md:hover:scale-110 transition-all duration-500 ease-in-out w-full h-full bg-blue-100 rounded-t-lg"
            />
          </div>
          <h1 className="open-sans-semibold ms-4 md:ms-6 underline mb-8 cursor:pointer text-blue-900 hover:text-blue-950 text-2xl md:text-3xl font-semibold">
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h1>


          <p className="text-center md:text-lg text-md text-gray-700 font-normal px-4 lg:px-20 mb-8">
            {post.excerpt}
          </p>
          
          <div className="text-center pb-4">
            <Link to={`/blog/${post.slug}`}>
              <span className="transition duration-500 transform inline-block  bg-sky-500 text-md md:text-xl rounded-md font-medium text-white md:px-6 px-3 py-2 cursor:pointer md:hover:-translate-y-1 md:hover:bg-white md:hover:text-sky-500 borde border-2 border-sky-500">
                Read More
                <span>
                  <BsChevronDown className="inline align-middle ml-4" />
                </span>
              </span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostCard;
