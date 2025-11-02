import {Link} from 'react-router'




function NavBar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/challenges'>Browse Challenges </Link>
        <Link to='/dashboard'>My Dashboard</Link>
        <Link to='/challenges/new'>Create Challenge</Link>
    </nav>
  )
}

export default NavBar