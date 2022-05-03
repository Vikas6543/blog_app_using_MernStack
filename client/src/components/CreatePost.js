import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = React.useState('all');

  const options = ['all', 'sports', 'entertainment', 'technology'];

  const navigate = useNavigate();
  toast.configure();

  const handlePublish = async () => {
    try {
      await Axios.post('http://localhost:5000/post/new', {
        title,
        content,
        category,
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDraft = async () => {
    try {
      await Axios.post('http://localhost:5000/post/new', {
        title,
        content,
        category,
        visibility: 'hide',
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
      <div className='mx-auto w-10/12 md:w-7/12 lg:w-5/12'>
        <p className='text-center mb-3 font-bold text-gray-600 '>
          Create a New Post
        </p>
        <div>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='block border hover:border-gray-500 w-full px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
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
            className='bg-gray-500 mr-2 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mt-4'
            onClick={handleDraft}
          >
            Save as Draft
          </button>

          <button
            to='/post/new'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-4'
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
