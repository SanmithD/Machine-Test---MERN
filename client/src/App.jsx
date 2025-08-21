import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(()=> import("./pages/Login"));
const Profile = lazy(()=> import("./pages/Profile"));
const Dashboard = lazy(()=> import("./pages/Dashboard"));

function App() {
  return (
    <div>
      <Toaster/>
      <Suspense fallback={"Loading..."} >
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/' element={<Dashboard/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App