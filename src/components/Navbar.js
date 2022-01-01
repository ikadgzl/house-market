import { useLocation, NavLink } from 'react-router-dom';

import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

function Navbar() {
  const location = useLocation();

  const handleSVGColor = (route) => {
    return route === location.pathname;
  };

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <NavLink to='/'>
              <ExploreIcon
                fill={handleSVGColor('/') ? '#2c2c2c' : '#8f8f8f'}
                width='36px'
                heigh='36px'
              />
              <p>Explore</p>
            </NavLink>
          </li>

          <li className='navbarListItem'>
            <NavLink to='/offers'>
              <OfferIcon
                fill={handleSVGColor('/offer') ? '#2c2c2c' : '#8f8f8f'}
                width='36px'
                heigh='36px'
              />
              <p>Offers</p>
            </NavLink>
          </li>

          <li className='navbarListItem'>
            <NavLink to='/profile'>
              <PersonOutlineIcon
                fill={handleSVGColor('/profile') ? '#2c2c2c' : '#8f8f8f'}
                width='36px'
                heigh='36px'
              />
              <p>Profile</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
