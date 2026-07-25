import { Link } from 'react-router-dom';
import { resourceConfig, resourceKeys } from '../../config/resourceConfig';

export default function Dashboard() {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Manage all portfolio content from here.</p>

      <div className="dashboard-grid">
        {resourceKeys.map((key) => (
          <Link to={`/admin/${key}`} className="dashboard-card" key={key}>
            <h2>{resourceConfig[key].labelPlural}</h2>
            <p>View, add, edit, or delete {resourceConfig[key].labelPlural.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
