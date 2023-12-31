import moment from 'moment';
import { Link } from 'react-router-dom';  


const FeaturedPostCard = ({ post }) => (
  <>
  <div className="relative h-64 md:h-60 work-sans overflow-hidden mx-2 mt-4 ">
    <div className=" absolute bg-center bg-no-repeat bg-cover inline-block w-full h-80 object-cover" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
    <div className=" absolute bg-center bg-gradient-to-b from-gray-400 via-gray-700 to-black w-full h-full opacity-50 " />
    <div className="absolute flex flex-col   p-4 items-center justify-center  w-full h-full">
      <p className="text-white mb-4 bg-blue-950 absolute top-0 right-0 px-2 mx-1 rounded-b-lg py-1 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
      <p className="text-white mb-4 absolute bottom-10   text-shadow font-semibold text-xl text-center">{post.title}</p>
      {/* <div className="flex items-center absolute text-white bg-black rounded-md px-2 py-1 bottom-3 mx-auto w-fit justify-center">
        <img
          alt={post.author.name}
          height="25px"
          width="25px"
          className="align-middle drop-shadow-lg rounded-full bg-blue-200"
          src={post.author.photo.url}
        />
        <p className="inline align-middle  text-shadow ml-2 font-medium">{post.author.name}</p>
      </div> */}
    </div>
    <Link to={`/blog/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
  
</>
);

export default FeaturedPostCard;

