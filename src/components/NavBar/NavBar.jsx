import {Link} from 'react-router'
import LogOutButton from '../Auth/LogOutButton'
import './NavBar.scss'

function NavBar({user, setUser}) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to='/'>Home</Link>
        <Link to='/challenges'>Browse Challenges</Link>
        <Link to='/dashboard'>My Dashboard</Link>
        <Link to='/challenges/new'>Create Challenge</Link>
      </div>

      <div className="nav-right">
        {user ? (
          <LogOutButton setUser={setUser} />
        ) : (
          <>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
