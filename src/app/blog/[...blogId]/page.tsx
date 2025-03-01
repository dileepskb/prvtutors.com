"use client";

import { useParams } from "next/navigation";

const BlogPage = () => {
  const params = useParams(); 
  const {blogId} = params

  //console.log(params); // { blogId: ["slug1", "slug2"] } if using [...blogId]
  
  if(blogId && blogId[1]){
    return <div>
    Blog {blogId && blogId[1]}
  </div>
  }

  return (
    <div>
      Blog {blogId && blogId[0]}
    </div>
  );
};

export default BlogPage;