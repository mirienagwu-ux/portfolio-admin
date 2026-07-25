import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { resourceConfig } from '../../config/resourceConfig';

export default function ResourceList() {
  const { resource } = useParams(); // e.g. 'projects'
  const navigate = useNavigate();
  const config = resourceConfig[resource];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  async function loadItems() {
    setLoading(true);
    setError('');
    try {
      const data = await config.api.getAll();
      setItems(data);
    } catch (err) {
      setError('Failed to load data. The server may be waking up (free tier) — try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(`Delete this ${config.label.toLowerCase()}? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await config.api.remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete. Please try again.');
    } finally {
      setDeletingId(null);
    }
  }

  if (!config) {
    return <p>Unknown resource: {resource}</p>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>{config.labelPlural}</h1>
        <Link to={`/admin/${resource}/new`} className="btn btn-primary">
          + Add {config.label}
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p>No {config.labelPlural.toLowerCase()} yet. Click "Add {config.label}" to create one.</p>
      )}

      {!loading && items.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              {config.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {config.columns.map((col) => (
                  <td key={col}>{String(item[col] ?? '')}</td>
                ))}
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => navigate(`/admin/${resource}/${item.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
