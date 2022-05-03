import Nav from './components/layout/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ViewPost from './components/ViewPost';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div className='md:mx-14 mx-4 mt-6'>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/post/create' element={<CreatePost />} />
            <Route exact path='/post/edit/:id' element={<EditPost />} />
            <Route exact path='/post/view/:id' element={<ViewPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
