import { request, gql } from "graphql-request";


const GRAPHQL_ENDPOINT = "https://api-ap-south-1.hygraph.com/v2/clqqf885o4c4u01t6ebcs65k0/master";

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            content{
              raw 
            }
          }
        }
      }
    }
  `;

  const data = await request(GRAPHQL_ENDPOINT, query);
  return data.postsConnection.edges;
};


export const getPostDetails = async (slug) => {
  const query = gql`
  query GetPostDetails($slug : String!) {
    post(where: {slug: $slug}) {  
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            content{
              raw 
            }
      }
    }
  `;

  const data = await request(GRAPHQL_ENDPOINT, query , { slug });
  return data.post;
};




export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails {
    posts(
      orderBy: createdAt_ASC
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `;

  const data = await request(GRAPHQL_ENDPOINT, query);
  return data.posts;
};


//getComments
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(GRAPHQL_ENDPOINT , query, { slug });
  //console the result
  console.log("result getCOmments func => ", result );

  return result.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(GRAPHQL_ENDPOINT , query);

  return result.posts;
};
