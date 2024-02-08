import { Link } from "react-router-dom";
import "./header.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";

import { BsList } from "react-icons/bs";
const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <BsList size={30} />
      </div>
      <div className="header-right">
        <div className="notification">
          <span className="notification-alert"></span>
          <IoIosNotificationsOutline size={23} />
        </div>
        <Link>
          <span className="text-profile-logo">Abdellah_dev</span>{" "}
          <FaRegCircleUser size={35} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
