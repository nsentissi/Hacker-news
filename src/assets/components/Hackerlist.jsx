import React, { useState, useEffect } from "react";
import axios from "axios";


function Hackerlist() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const response = await axios(
        "http://hn.algolia.com/api/v1/search_by_date?tags=story"
      );
      setPosts(response.data.hits);
      console.log(response.data.hits)
    } catch (error) {
      setError(true);
      alert(error);
    }
  };

  const getSearchData = async (e) => {
    try {
      const response = await axios(
        `http://hn.algolia.com/api/v1/search?query=${e.target.value}&tags=story`
      );
      setPosts(response.data.hits);
      console.log(response.data.hits)
    } catch (error) {
      setError(true);
      alert(error);
    }
  };

  
  return (
    <div>
        <input type="text"  onChange={getSearchData}/>
      <h2>All posts</h2>
    <ul>
      {!posts ? (
            <p>Loading</p>
          ) : (posts.map((post) => (
            <li key={post.story_id}>
              <h2>{post.title}</h2>
              <p>Date: {post.created_at}</p>
              <p>Link: {post.url}</p>
              <p>Points: {post.points}</p>
              <p>Comments: {post.num_comments}</p>
            </li>
          )))}


      
    </ul>
  </div>
  );
}

export default Hackerlist;
