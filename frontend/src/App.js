import Signup from './accounts/Signup'
import Signin from './accounts/Signin'
import { Route, Routes } from 'react-router-dom';
import Main from './view/Main'
import VideoRoom from './components/VideoRoomComponent'
import UserProfile from './accounts/UserProfile'
import CreateStudyroom from './view/CreateStudyroom'



function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/join" element={<Signup />} />
      <Route path="/studyroom" element={<VideoRoom />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/createroom" element={<CreateStudyroom />} />
    </Routes>
  )
}

export default App;
