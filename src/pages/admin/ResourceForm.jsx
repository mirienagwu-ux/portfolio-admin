import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resourceConfig } from '../../config/resourceConfig';

function buildEmptyForm(fields) {
  const empty = {};
  fields.forEach((f) => {
    empty[f.name] = '';
  });
  return empty;
}

export default function ResourceForm() {
  const { resource, id } = useParams(); // id present only when editing
  const navigate = useNavigate();
  const config = resourceConfig[resource];
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(() => buildEmptyForm(config.fields));
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      loadExisting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadExisting() {
    setLoading(true);
    try {
      const data = await config.api.getById(id);
      // Format date fields for the <input type="date"> control
      const formatted = { ...data };
      config.fields.forEach((f) => {
        if (f.type === 'date' && formatted[f.name]) {
          formatted[f.name] = formatted[f.name].slice(0, 10);
        }
      });
      setFormData(formatted);
    } catch (err) {
      setError('Failed to load record.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Basic required-field validation
    for (const field of config.fields) {
      if (field.required && !String(formData[field.name] || '').trim()) {
        setError(`${field.label} is required.`);
        return;
      }
    }

    setSaving(true);
    try {
      if (isEditMode) {
        await config.api.update(id, formData);
      } else {
        await config.api.create(formData);
      }
      navigate(`/admin/${resource}`);
    } catch (err) {
      setError('Failed to save. Please check your entries and try again.');
    } finally {
      setSaving(false);
    }
  }

  if (!config) return <p>Unknown resource: {resource}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-page">
      <h1>{isEditMode ? `Edit ${config.label}` : `Add ${config.label}`}</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        {config.fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                rows={4}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        {error && <p className="error-text">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => navigate(`/admin/${resource}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
