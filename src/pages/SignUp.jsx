import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usersApi } from '../api/resources';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    setSaving(true);
    try {
      await usersApi.create(formData);
      // After successful sign up, send them to sign in
      navigate('/signin', { state: { justSignedUp: true } });
    } catch (err) {
      const message = err?.response?.data?.message || 'Sign up failed. Please try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}
