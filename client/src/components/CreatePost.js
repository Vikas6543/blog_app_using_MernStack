import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handlePublish = async () => {
    await Axios.post('http://localhost:5000/post/new', {
      title,
      content,
    });
    navigate('/');
  };

  const handleDraft = async () => {
    await Axios.post('http://localhost:5000/post/new', {
      title,
      content,
      visibility: 'hide',
    });
    navigate('/');
  };

  return (
    <div>
      <div className='mb-4'>
        <Link
          to='/'
          className='bg-gray-800 hover:bg-gray-700 text-white py-2 px-2 rounded text-sm'
        >
          <i class='fa-solid fa-arrow-left'></i> Go Back
        </Link>
      </div>
      <div className='w-4/6 lg:3/6 mx-auto'>
        <p className='text-center mb-3 font-bold text-gray-600 '>
          Create a New Post
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
        <div className=''>
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
