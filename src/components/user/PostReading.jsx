import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { PostDetail , PostWidget , Author, Comments, CommentsForm, About} from "../BlogComps"
import { getPostDetails } from "../graphServices"
import Loading from "./Loading";

const PostReading = () => {

  const { slug } = useParams();
  const [post, setPost] = useState(null);

  const [dataloaded , setDataLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostDetails(slug);
        setPost(fetchedPost);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [slug]);


  return (
    <>
    {
      dataloaded ? (
        <div className="container mx-auto px-10 md:px-32 lg:px-44 py-8 lg:pb-16 bg-gray-50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8"
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="1000"
            >
              {post && (
                <>
                  <PostDetail post={post} />
                  <Author author={post.author} />
                  <CommentsForm slug={post.slug} />
                  <Comments slug={post.slug} />
                </>
              )}
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8 md:top-28 mb-20 md:mb-14 right-0"
              data-aos="fade-left"
              data-aos-delay="100"
              data-aos-duration="1000"
              >
                {post && (
                  <>
                    <PostWidget />
                    <About />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      ) : (
        <Loading />
      )
    }
    </>
  );
}

export default PostReading;
