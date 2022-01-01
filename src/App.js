import logo from './logo.svg';
import './App.css';
import SearchCourse from './Pages/SearchCourse/SearchCourse';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseDetails from './Pages/CourseDetails/CourseDetails';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchCourse/>}/>
      <Route path="/courses" element={<SearchCourse/>}>
   
        </Route>
        <Route
        path="courses/:courseId"
        element={<CourseDetails />}
      />
        
    </Routes>
  </BrowserRouter></AuthProvider>
    </div>
  );
}

export default App;
