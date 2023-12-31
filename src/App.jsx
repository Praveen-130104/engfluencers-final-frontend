import './App.css'
import 'animate.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom'
import AdminLogin from './components/adminLogin/AdminLogin';
import AdminFileUpload from './components/adminFileUpload/AdminFileUpload';
import AdminNavbar from './components/adminFileUpload/AdminNavbar';
import AdminResourceUpload from './components/adminFileUpload/AdminResourceUpload';


import Home from './components/user/Home';
import Navbar from './components/user/Navbar';
import Footer from './components/user/Footer';
import WorkSheets from './components/user/WorkSheets';


import Blog from './components/user/Blog';
import PostReading from './components/user/PostReading';
import Resources from './components/user/Resources';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { NotFound } from './components/user/NotFound';
// ..
AOS.init();



const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route
        path="/fileupload/worksheets"
        element={<AdminLayout><AdminFileUpload /></AdminLayout>}
      />
      <Route
        path="/fileupload/resources"
        element={<AdminLayout><AdminResourceUpload /></AdminLayout>}
      />
       <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/worksheets"
        element={
          <Layout>
            <WorkSheets />
          </Layout>
        }
      />
      <Route
        path="/blog"
        element={
          <Layout>
            <Blog />
          </Layout>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <Layout>
            <PostReading />
          </Layout>
        }
      />
      <Route
        path="/resources"
        element={
          <Layout>
            <Resources />
          </Layout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};



// const UserRoutes = () => {
//   return (
//     <>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/worksheets" element={<WorkSheets />} />
//       <Route path="/blog" element={<Blog />} />
//       <Route path="/blog/:slug" element={<PostReading />} />
//       <Route path="/resources" element={<Resources />} />
//       <Route path= "*" element = {<NotFound/>}/>

//     </Routes> 
//     <Footer />
//   </>
//   );
// };

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} /> {/* Define a user route */}
      </Routes>
    </Router>
  );
};

export default App;


