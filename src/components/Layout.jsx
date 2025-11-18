import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import FeedbackMarker from './FeedbackMarker/FeedbackMarker'

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <FeedbackMarker />
    </>
  )
}

export default Layout



