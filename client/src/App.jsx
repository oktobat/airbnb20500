import {Route, Routes} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Join from './pages/Join.jsx'
import Profile from './pages/Profile.jsx'
import HostTypeSelect from './pages/HostTypeSelect.jsx'
import HostSetupFlow from './pages/HostSetupFlow.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Join />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/host" element={<HostTypeSelect />} />
        <Route path="/host/setup" element={<HostSetupFlow />} />
      </Route>
    </Routes>
  )
}

export default App