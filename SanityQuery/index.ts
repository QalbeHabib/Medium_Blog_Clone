import { sanityClient, urlFor } from '../sanity'

export const getAllPost = `*[_type == "post"]{
        _id,
        title,
        description,
        releasedate,
        mainImage,
        slug,
        author->{
        name,
        image
      }
      
        
      }`

export const getPostByID = `*[_type == "post"]{
        
        slug {
          current
        }
}`

export const getPostBySlug = `*[_type == "post" && slug.current == $slug][0]
{
  _id,
  releasedate,
  _createdAt,
  title,
  description,
  body,
 slug,
  mainImage,
  author->{ 
  name,
  image
},

}`
