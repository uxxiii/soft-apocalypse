import React, { useState, useEffect } from 'react';
import { Search, Download, LogOut, Lock } from 'lucide-react';
import '../styles/admin.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [error, setError] = useState('');

  const normalizeFileLink = (fileLink) => {
    if (!fileLink) return '';

    if (fileLink.startsWith('http://localhost:5000/api/downloads/')) {
      return fileLink.replace('http://localhost:5000', API_ORIGIN);
    }

    if (fileLink.startsWith('/api/downloads/')) {
      return `${API_ORIGIN}${fileLink}`;
    }

    return fileLink;
  };

  // Check if already logged in
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchSubmissions(token);
    }
  }, [token]);

  // Filter submissions based on search and genre
  useEffect(() => {
    let filtered = submissions;

    // Genre filter
    if (filterGenre !== 'all') {
      filtered = filtered.filter(sub => sub.genre === filterGenre);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, filterGenre]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        setPassword('');
        await fetchSubmissions(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Unable to reach admin API.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async (authToken) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/submissions?token=${authToken}`
      );

      const data = await response.json();

      if (response.ok) {
        const normalizedSubmissions = (data.submissions || []).map((submission) => ({
          ...submission,
          fileLink: normalizeFileLink(submission.fileLink),
        }));
        setSubmissions(normalizedSubmissions);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch submissions');
      }
    } catch (err) {
      setError('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('adminToken');
    setSubmissions([]);
    setFilteredSubmissions([]);
  };

  const downloadFile = (fileLink) => {
    if (fileLink) {
      window.open(fileLink, '_blank');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const genres = ['Poetry', 'Prose', 'Flash Fiction'];

  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <div className="login-card">
          <div className="login-header">
            <Lock className="lock-icon" size={32} />
            <h1>Admin Panel</h1>
            <p>Enter password to access submissions</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="password-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="login-button">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>{filteredSubmissions.length} submissions</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="genre-filter"
        >
          <option value="all">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading submissions...</div>}

      {error && <div className="error-message">{error}</div>}

      {!loading && filteredSubmissions.length === 0 && (
        <div className="no-submissions">No submissions found</div>
      )}

      {!loading && filteredSubmissions.length > 0 && (
        <div className="submissions-table-wrapper">
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Institution</th>
                <th>Genre</th>
                <th>Title</th>
                <th>Submitted</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="name-cell">{submission.name}</td>
                  <td className="email-cell">{submission.email}</td>
                  <td>{submission.city}</td>
                  <td>{submission.institution}</td>
                  <td>
                    <span className={`genre-badge genre-${submission.genre.toLowerCase()}`}>
                      {submission.genre}
                    </span>
                  </td>
                  <td className="title-cell">{submission.title}</td>
                  <td className="date-cell">{formatDate(submission.submittedAt)}</td>
                  <td>
                    {submission.fileLink ? (
                      <button
                        onClick={() => downloadFile(submission.fileLink)}
                        className="download-button"
                        title="Download file"
                      >
                        <Download size={18} />
                      </button>
                    ) : (
                      <span className="no-file">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
