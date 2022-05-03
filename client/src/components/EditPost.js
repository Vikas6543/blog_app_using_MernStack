import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  toast.configure();
  const { id } = useParams();

  const handleUpdate = async () => {
    try {
      await Axios.put(`http://localhost:5000/post/edit/${id}`, {
        title,
        content,
      });
      toast.success('Post updated successfully', {
        autoClose: 2000,
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const getPost = async () => {
    try {
      const { data } = await Axios.get('http://localhost:5000/post/all');
      const post = data.find((post) => post._id === id);
      setTitle(post.title);
      setContent(post.content);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <div className='mb-4'>
        <Link
          to='/'
          className='bg-gray-800 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm'
        >
          <i className='fa-solid fa-arrow-left'></i> Go Back
        </Link>
      </div>
      <div className='w-4/6 lg:3/6 mx-auto'>
        <p className='text-center mb-3 font-bold text-gray-600 '>
          Update a Post
        </p>
        <div className='mb-4'>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <div className='float-right'>
          <button
            to='/post/new'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-4'
            onClick={handleUpdate}
          >
            Update Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
