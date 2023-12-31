import { useEffect, useState } from "react";
import "../../App.css";
import { PostCard, PostWidget, About } from "../BlogComps"
import { getPosts } from "../graphServices";
import FeaturedPosts from "./FeaturedPost";
import ReactPaginate from "react-paginate";
import Loading from "./Loading";

const Blog = () => {

  const [dataLoaded, setDataLoaded] = useState(true);

  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);



  const postPerPage = 2;
  const pagesVisited = pageNumber * postPerPage;

  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postPerPage)
    .map((post) => {
      return <PostCard key={post.title} post={post} />;
    })

  const pageCount = Math.ceil(posts.length / postPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }


  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        const extractedPosts = fetchedPosts.map((edge) => edge.node);
        setPosts(extractedPosts.reverse());
        setDataLoaded(false);
        
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();

  }, []);




  return (

    <>
    {
      dataLoaded ?
      (
        <Loading />
      ) 
      :
      (
        <div className="bg-slate-50 overflow-hidden" >

      <div className="lg:container bg-white shadow-xl work-sans mx-auto py-6 pb-16 " >
        <div className=" w-full  sm:py-4 items-center ">
          <h1 className="mb-4 py-4 w-fit animate__animated animate__slideInDown sm:ms-4  border-0 border-b-2 border-orange-600 text-white bg-blue-950 rounded-md text-2xl md:text-3xl lg:text-[2.3rem] leading-10  px-6 tracking-widest font-extrabold " style={{ fontFamily: "Archivo Narrow" }}>
            ENGFLUENCERS WEEKLY BLOGS <span className="bg-white text-blue-950 px-2 rounded-lg border-0 border-b-2 border-orange-600">& STORIES</span></h1>
          <div className="w-5/6  px-2 py-2 border-0 mx-auto"
            data-aos="fade-down"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            <FeaturedPosts  />
          </div>
        </div>

        <div className="p-3 mt-2  w-full mx-auto  "
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="1000">
          <div className="w-full md:w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-12 ">
            <div className="lg:col-span-8  mx-auto col-span-1 flex  w-full">
              <div className="w-full  ">
                {displayPosts}
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"my-2 pgbtn flex items-center  justify-center w-full space-x-6 "}
                  previousLinkClassName={"border border-sky-500 px-4 py-2 text-lg font-semibold mr-4 transition-all ease-in-out duration-500 rounded-md  text-blue-400 hover:bg-sky-400 hover:text-white"}
                  nextLinkClassName={"border border-sky-500 px-4 py-2 text-lg font-semibold transition-all ease-in-out duration-500  rounded-md  text-blue-400 hover:bg-sky-400 hover:text-white ml-4"}
                  activeClassName={"paginationActive bg-sky-500 text-white font-bold"}
                  activeLinkClassName="paginationActive bg-sky-500 text-white font-bold"
                  pageLinkClassName={"border border-sky-500 px-4 py-2 text-lg font-semibold transition-all ease-in-out duration-500 rounded-md text-blue-400 hover:bg-sky-400 hover:text-white"}
                />

              </div>
            </div>

            <div className="lg:col-span-4 col-span-1 "
              
            >
              <div className=" relative px-6 md:px-0 md:w-9/12 lg:w-10/12 lg:mx-0 mx-auto lg:sticky top-8 md:top-28 mt-16 mb-24 md:mb-14 lg:mb-0 right-0 "
              
              >
                <PostWidget />
                <About />
              </div>
            </div>
          </div>

        </div>


      </div>

    </div>
      )
    }
    </>
  );
}

export default Blog;
