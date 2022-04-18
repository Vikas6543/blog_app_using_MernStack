import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import Axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);

  const allPosts = async () => {
    const { data } = await Axios('http://localhost:5000/post/all');
    setPosts(data);
  };

  const hiddenHandler = async () => {
    const { data } = await Axios('http://localhost:5000/post/all');
    const hiddenPosts = data.filter((post) => post.visibility === 'hide');
    setPosts(hiddenPosts);
    setToggleBtn(true);
  };

  const visibleHandler = () => {
    allPosts();
    setToggleBtn(false);
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await Axios.delete(`http://localhost:5000/post/delete/${id}`);
      allPosts();
    } else {
      return;
    }
  };

  useEffect(() => {
    allPosts();
  }, []);

  return (
    <div>
      <HomePage
        posts={posts}
        deleteHandler={deleteHandler}
        hiddenHandler={hiddenHandler}
        toggleBtn={toggleBtn}
        visibleHandler={visibleHandler}
      />
    </div>
  );
};

export default Home;
