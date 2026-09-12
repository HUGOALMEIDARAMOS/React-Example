import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import CategoryMaster from './pages/CategoryMaster'
import StatusMaster from './pages/StatusMaster';
import NewEnquiryForm from './pages/NewEnquiryForm';
import EnquiryList from './pages/EnquiryList';
import UseRefEx from './pages/UseRefEx';

function App() {
  const location = useLocation();

  const hideNavBar = location.pathname === '/' || location.pathname === '/new-enquiry';


  return (
    <>
    {
      hideNavBar === false && 
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Enquiry App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active"  to={'/category'}>Category</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/status'}>Status</Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link" to={'/enquiry-list'}>Enquiry List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/useref'}>UseRef Example</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    }
      
      <Routes>
        <Route path="" element={<NewEnquiryForm />} />
        <Route path="category" element={<CategoryMaster />} />
        <Route path="status" element={<StatusMaster />} />
        <Route path="new-enquiry" element={<NewEnquiryForm />} />
        <Route path="enquiry-list" element={<EnquiryList />} />
        <Route path="useref" element={<UseRefEx/>} /> 
      </Routes>
    </>
  )
}

export default App
