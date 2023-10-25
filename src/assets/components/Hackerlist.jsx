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
        "http://hn.algolia.com/api/v1/search_by_date?tags=story",
      );
      setPosts(response.data.hits);
      console.log(response.data.hits);
    } catch (error) {
      setError(true);
      alert(error);
    }
  };

  const getSearchData = async (e) => {
    try {
      const response = await axios(
        `http://hn.algolia.com/api/v1/search?query=${e.target.value}&tags=story`,
      );
      setPosts(response.data.hits);
      console.log(response.data.hits);
    } catch (error) {
      setError(true);
      alert(error);
    }
  };

  return (
    <div>
      {/* <input className="inputarea" type="text"  onChange={getSearchData}/> */}
      <div class="container">
        <div class="search-container">
          <input onChange={getSearchData} class="input" type="text" />
          <svg viewBox="0 0 24 24" class="search__icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </div>
      </div>
      <h2 className="hero">All posts</h2>
      <ul className="links">
        {!posts ? (
          <p>Loading</p>
        ) : (
          posts.map((post) => (
            <li key={post.story_id}>
              <h2> {post.title}</h2>
              <p>Date: {post.created_at}</p>
              <p>Link: {post.url}</p>
              <p>Points: {post.points}</p>
              <p>Comments: {post.num_comments}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Hackerlist;
