import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';

const HomePage = ({
  posts,
  deleteHandler,
  hiddenHandler,
  visibleHandler,
  toggleBtn,
}) => {
  const [isReadMore, setReadMore] = React.useState(false);

  return (
    <div className='w-full md:w-4/6 m-auto'>
      <section>
        <div>
          <div className='flex justify-between items-center mb-2'>
            <div>
              <Link
                to='/post/new'
                className='bg-green-500 text-sm hover:bg-green-700 text-white font-semibold py-1 px-2 rounded'
              >
                <i className='fa-solid fa-circle-plus'></i> Add New Post
              </Link>
            </div>
            <div>
              {toggleBtn ? (
                <button
                  onClick={visibleHandler}
                  className='bg-gray-700 text-sm hover:bg-gray-600 text-white font-semibold py-1 px-2 rounded'
                >
                  <i className='fa-solid fa-eye'></i> visible posts
                </button>
              ) : (
                <button
                  onClick={hiddenHandler}
                  className='bg-red-700 text-sm hover:bg-red-600 text-white font-semibold py-1 px-2 rounded'
                >
                  <i className='fa-solid fa-eye-slash'></i> hidden posts
                </button>
              )}
            </div>
          </div>
        </div>
        {posts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((post) => (
            <div key={post._id}>
              <div className='shadow-md border mb-6 p-4 flex'>
                <div className='flex-1 mr-20'>
                  <h5 className='font-bold text-xl'>{post.title}</h5>
                  <div className='para text-justify pt-1 text-sm'>
                    {isReadMore && post.content.length <= 200 ? (
                      <div>{parser(post.content)}</div>
                    ) : (
                      <div>
                        {parser(post.content.slice(0, 200))}
                        <button className='text-sm text-blue-600'>
                          ...read more
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Link
                    to={`/post/view/${post._id}`}
                    className='bg-green-700 text-sm hover:bg-green-600 text-white font-semibold py-1 px-2 rounded'
                  >
                    View
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
      </section>
    </div>
  );
};

export default HomePage;
