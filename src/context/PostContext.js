import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [renderPost, setRenderPost] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://tarmeezacademy.com/api/v1/posts?limit=50")
      .then(function (response) {
        setPosts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [renderPost]);

  // Define handelRenderPost inside PostProvider
  const handelRenderPost = () => {
    setRenderPost(!renderPost);
  };

  return (
    <PostContext.Provider value={{ posts, handelRenderPost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}
