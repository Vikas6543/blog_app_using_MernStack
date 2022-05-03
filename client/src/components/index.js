import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectOption, setSelectOption] = React.useState('all');

  const user = JSON.parse(localStorage.getItem('user'));

  toast.configure();

  const navigate = useNavigate();

  const allPosts = async () => {
    try {
      setLoading(true);
      const { data } = await Axios('http://localhost:5000/post/all');
      const visiblePosts = data.posts.filter(
        (post) => post.visibility !== 'hide'
      );
      const filteredPosts = visiblePosts.filter((post) => {
        if (selectOption === 'all') {
          return post;
        } else if (selectOption === 'sports') {
          return post.category === 'sports';
        } else if (selectOption === 'entertainment') {
          return post.category === 'entertainment';
        } else {
          return post.category === 'technology';
        }
      });
      setPosts(filteredPosts);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const hiddenHandler = async () => {
    try {
      setLoading(true);
      const { data } = await Axios('http://localhost:5000/post/all');
      const hiddenPosts = data.filter((post) => post.visibility === 'hide');
      setPosts(hiddenPosts);
      setToggleBtn(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const visibleHandler = () => {
    allPosts();
    setToggleBtn(false);
  };

  const deleteHandler = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        setLoading(true);
        await Axios.delete(`http://localhost:5000/post/delete/${id}`);
        allPosts();
        setLoading(false);
        toast.success('Post deleted successfully', {
          autoClose: 2000,
        });
      } else {
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to access dashboard', {
        autoClose: 2000,
      });
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    allPosts();
  }, [selectOption]);

  return (
    <div>
      <HomePage
        posts={posts}
        deleteHandler={deleteHandler}
        hiddenHandler={hiddenHandler}
        toggleBtn={toggleBtn}
        visibleHandler={visibleHandler}
        loading={loading}
        selectOption={selectOption}
        setSelectOption={setSelectOption}
      />
    </div>
  );
};

export default Home;
