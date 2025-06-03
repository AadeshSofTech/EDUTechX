
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Admin</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/admissions">Admissions</Link></li>
          <li><Link to="/fees">Fee Management</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/transport">Transport</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;