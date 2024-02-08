import "./style.css";
import { FaSchool, FaChartLine } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { FaUserTie } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { HiClipboardDocumentList } from "react-icons/hi2";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidenav">
      <div className="logo-container">
        <img src="/agenda_icon_129512.png " alt="logo" className="logo" />
        <span className="logo-text">
          <p>Gestion</p>
          <p> ABsence</p>
        </span>
      </div>
      <ul>
        <li>
          <Link>
            <SlBadge size={22} />
            <span> Commune</span>
          </Link>
        </li>
        <li>
          <Link>
            {" "}
            <FaSchool size={22} />
            <span>Etablissement</span>{" "}
          </Link>
        </li>
        <li>
          <Link>
            {" "}
            <FaUserTie size={22} />
            <span>Responsable</span>{" "}
          </Link>
        </li>
        <li>
          <Link>
            <TbUsersGroup  size={22}/>
            <span> Enseignant</span>
          </Link>
        </li>
        <li>
          <Link>
            {" "}
            <FaChartLine  size={22}/> <span>Absence</span>
          </Link>
        </li>
        <li>
          <Link>
            {" "}
            <HiClipboardDocumentList  size={22}/> <span>Dommande</span>
          </Link>
        </li>
      </ul>

      <div className="logout-container">
        <Link>
          <CiLogout  size={22}/>
          <span> deconnecté</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
