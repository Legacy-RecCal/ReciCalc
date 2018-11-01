import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// refactor to functional component?
class Header extends Component {
  constructor() {
      super();
      this.state = {
        // does this need to be a class component?
      }
  }

  render () {
      return (
      <div>
        <h3 id='header-logo' className='logo'>RECI-CALC</h3>
          <Link className='nav link' to='/create'>Create New Recipe</Link>
          <Link className='nav link' to='/recipes'>Recipes</Link>
      </div>)
  }
}
export default Header;