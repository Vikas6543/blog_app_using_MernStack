import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ViewPost from './components/ViewPost';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div className='md:mx-14 mx-4'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/post/new' element={<CreatePost />} />
            <Route exact path='/post/edit/:id' element={<EditPost />} />
            <Route exact path='/post/view/:id' element={<ViewPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
