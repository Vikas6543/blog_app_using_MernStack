import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import Axios from 'axios';
import moment from 'moment';

const HomePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postedTime, setPostedTime] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const { data } = await Axios.get('http://localhost:5000/post/all');
      const post = data.find((post) => post._id === id);
      setTitle(post.title);
      setContent(post.content);
      setPostedTime(post.date);
    };
    getPost();
  }, []);

  return (
    <div>
      <Link
        to='/'
        className='bg-gray-800 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm'
      >
        <i class='fa-solid fa-arrow-left'></i> Go Back
      </Link>
      <section className='w-full md:w-4/6 m-auto'>
        <h4 className='text-center pt-3 font-semibold pb-4 text-lg'>
          Full Post
        </h4>
        <div key={title}>
          <div className='shadow-md border mb-6 p-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h5 className='font-bold text-xl'>{title}</h5>
              </div>
              <div className='text-xs text-gray-500 font-bold'>
                {moment(postedTime).fromNow().replace('hours', 'hrs')}
              </div>
            </div>
            <div className='para text-justify pt-1 text-sm'>
              {parser(content)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
