import {Link} from 'react-router'
import LogOutButton from '../Auth/LogOutButton'




function NavBar({user, setUser}) {
  return (
    <nav>
      {
        user 
        ?
        <LogOutButton setUser={setUser} />
        :
        <>
          <Link to='/signup'>Sign Up</Link>
          <Link to='login'>Login</Link>
        </>
      }
        

        <Link to='/'>Home</Link>
        <Link to='/challenges'>Browse Challenges </Link>
        <Link to='/dashboard'>My Dashboard</Link>
        <Link to='/challenges/new'>Create Challenge</Link>
    </nav>
  )
}

export default NavBar