import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import LoadingSpinner from './layout/LoadingSpinner';
import moment from 'moment';

const HomePage = ({
  posts,
  deleteHandler,
  hiddenHandler,
  visibleHandler,
  toggleBtn,
  loading,
  setSelectOption,
}) => {
  const options = ['all', 'sports', 'entertainment', 'technology'];

  return (
    <div className='w-full md:w-4/6 m-auto'>
      <section>
        <div className='mb-4 grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-6 sm:col-span-4'>
            <Link
              to='/post/create'
              className='bg-green-500 text-sm hover:bg-green-700 text-white font-semibold py-2 px-3 rounded'
            >
              <i className='fa-solid fa-circle-plus'></i> Create New Post
            </Link>
          </div>

          <div className='col-span-6 md:ml-10 sm:col-span-4'>
            <select
              onChange={(e) => setSelectOption(e.target.value)}
              className='block border hover:border-gray-500 p-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            >
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className='col-span-6 md:ml-12 sm:col-span-4'>
            {toggleBtn ? (
              <button
                onClick={visibleHandler}
                className='bg-gray-700 text-sm hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded'
              >
                <i className='fa-solid fa-eye'></i> visible posts
              </button>
            ) : (
              <button
                onClick={hiddenHandler}
                className='bg-red-700 text-sm hover:bg-red-600 text-white font-semibold py-2 px-3 rounded'
              >
                <i className='fa-solid fa-eye-slash'></i> hidden posts
              </button>
            )}
          </div>
        </div>

        <div>
          {loading ? (
            <div className='flex justify-center mt-20'>
              <LoadingSpinner />
            </div>
          ) : (
            <main>
              {posts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post) => (
                  <div key={post._id}>
                    <div className='shadow-md border mb-6 p-4 flex flex-col md:flex-row'>
                      <div className='flex-1 md:mr-20'>
                        <div className='font-bold text-xl'>
                          {post.title}
                          <span className='text-xs ml-2 text-gray-500 font-bold'>
                            (
                            {moment(post.date)
                              .fromNow()
                              .replace('hours', 'hrs')
                              .replace('minutes', 'min')}
                            )
                          </span>
                        </div>
                        <div className='para text-justify pt-1 text-sm'>
                          {post.content.length > 200 ? (
                            <div>
                              {parser(post.content.slice(0, 220))}
                              <Link
                                to={`/post/view/${post._id}`}
                                className='text-blue-500'
                              >
                                ...read more
                              </Link>
                            </div>
                          ) : (
                            <div>{parser(post.content)}</div>
                          )}
                        </div>
                      </div>

                      <div className='mt-4 md:mt-0'>
                        <Link
                          to={`/post/view/${post._id}`}
                          className='bg-green-700 text-sm hover:bg-green-600 text-white font-semibold py-1 px-2 rounded'
                        >
                          <i className='fa-solid fa-eye'></i>
                        </Link>

                        <Link
                          to={`/post/edit/${post._id}`}
                          className='bg-blue-600 text-sm hover:bg-blue-600 text-white font-semibold mx-2 py-1 px-2 rounded'
                        >
                          <i className='fa-solid fa-pen-to-square'></i>
                        </Link>

                        <button
                          onClick={() => deleteHandler(post._id)}
                          className='bg-red-500 text-sm hover:bg-red-700 text-white font-semibold py-1 px-2 rounded'
                        >
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </main>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
