import {AiOutlineShoppingCart} from 'react-icons/ai'
import { IoHomeOutline,IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert as reactConfirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
//import { confirmAlert } from 'react-confirm-alert';
import './Nav.css';
import { useContext } from "react"
import { ItemContext } from '../Context/ItemContext';

export default function Nav({ handleInputChange, query }) {
  const count1 = useContext(ItemContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    reactConfirmAlert({
      title: 'Xác nhận đăng xuất',
      message: 'Bạn có chắc chắn muốn đăng xuất?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            navigate('/');
            localStorage.setItem('isLogined', false)
          },
        },
        {
          label: 'Không',
          onClick: () => {
          },
        },
      ],
    });
  };
  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
      </div>
      <div className="profile-container">
        <Link>
          <IoLogOutOutline onClick={handleLogout} className="nav-icons" />
        </Link>
        <Link to={'/payment'} >
          <AiOutlineShoppingCart className="nav-icons" />
          {count1.item>0 &&<> {count1.item}</>}
        </Link>
        <Link to={'/home'} >
          <IoHomeOutline  className="nav-icons" />
        </Link>
      </div>
    </nav>
  )
}
