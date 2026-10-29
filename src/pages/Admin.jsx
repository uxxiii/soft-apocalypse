import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Lock,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Mail,
  MapPin,
  Building,
  Calendar,
  BookOpen,
  Feather,
  Copy,
  Check,
  ChevronRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [decisionLoading, setDecisionLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Auto-clear toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Check login on load
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchSubmissions(token);
    }
  }, [token]);

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
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Connection error. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async (authToken = token) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/submissions?token=${authToken}`);
      const data = await response.json();

      if (response.ok) {
        setSubmissions(data.submissions || []);
        setError('');
        // If a submission is currently selected, update its reference
        if (selectedSubmission) {
          const updatedSelected = (data.submissions || []).find((s) => s.id === selectedSubmission.id);
          if (updatedSelected) {
            setSelectedSubmission(updatedSelected);
          }
        }
      } else {
        if (response.status === 401) {
          handleLogout();
        }
        setError(data.error || 'Failed to fetch submissions');
      }
    } catch (err) {
      setError('Failed to reach server. Please verify backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('adminToken');
    setSubmissions([]);
    setSelectedSubmission(null);
  };

  const handleDecision = async (id, status) => {
    if (!selectedSubmission) return;
    setDecisionLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/submissions/${id}/decision`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          email: selectedSubmission.email,
          name: selectedSubmission.name,
          title: selectedSubmission.title,
          genre: selectedSubmission.genre,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedStatus = data.submission?.status || status;
        const updatedList = submissions.map((sub) =>
          sub.id === id ? { ...sub, status: updatedStatus, reviewed_at: new Date().toISOString() } : sub
        );
        setSubmissions(updatedList);
        setSelectedSubmission((prev) => ({
          ...prev,
          status: updatedStatus,
          reviewed_at: new Date().toISOString(),
        }));

        setToast({
          type: status === 'approved' ? 'success' : 'info',
          title: status === 'approved' ? 'Article Approved' : 'Article Marked as Rejected',
          message: data.message,
        });
      } else {
        setToast({
          type: 'error',
          title: 'Action Failed',
          message: data.error || 'Could not update submission status',
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        title: 'Network Error',
        message: err.message || 'Failed to communicate with server',
      });
    } finally {
      setDecisionLoading(false);
    }
  };

  const handleCopyContent = () => {
    if (selectedSubmission?.content) {
      navigator.clipboard.writeText(selectedSubmission.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        !searchTerm.trim() ||
        sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.institution?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenre = filterGenre === 'all' || sub.genre === filterGenre;
      const matchesStatus = filterStatus === 'all' || (sub.status || 'pending') === filterStatus;

      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [submissions, searchTerm, filterGenre, filterStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter((s) => !s.status || s.status === 'pending').length;
    const approved = submissions.filter((s) => s.status === 'approved').length;
    const rejected = submissions.filter((s) => s.status === 'rejected').length;
    return { total, pending, approved, rejected };
  }, [submissions]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-pale-sky">
        <div className="w-full max-w-md rounded-[2.5rem] border border-white/80 bg-white/85 p-8 sm:p-10 shadow-[0_28px_90px_-50px_rgba(23,34,52,0.6)] backdrop-blur-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-storm-slate/10 text-storm-slate">
            <Lock size={28} />
          </div>

          <p className="mt-6 font-body text-xs font-semibold uppercase tracking-[0.34em] text-storm-slate/60">
            Soft Apocalypse India
          </p>

          <h1 className="mt-2 font-heading text-3xl text-storm-slate">
            Editorial Admin Panel
          </h1>

          <p className="mt-2 text-xs text-deep-ink/65 font-body">
            Enter your admin credentials to access and review submitted manuscripts.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full rounded-2xl border border-storm-slate/20 bg-white px-4 py-3.5 font-body text-sm text-deep-ink placeholder:text-deep-ink/35 focus:border-storm-slate focus:outline-none focus:ring-2 focus:ring-storm-slate/15"
            />

            {error && (
              <p className="text-xs font-body text-rose-600 bg-rose-50 border border-rose-200 rounded-xl py-2 px-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-2xl bg-storm-slate py-3.5 font-body text-xs font-semibold uppercase tracking-[0.24em] text-white transition-all hover:bg-deep-ink disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Selected Submission Detail View (Split-Screen Interface)
  if (selectedSubmission) {
    const isApproved = selectedSubmission.status === 'approved';
    const isRejected = selectedSubmission.status === 'rejected';
    const isPending = !isApproved && !isRejected;

    return (
      <div className="min-h-screen bg-pale-sky text-deep-ink flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-storm-slate/10 bg-white/90 backdrop-blur-md px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <button
              onClick={() => setSelectedSubmission(null)}
              className="inline-flex items-center gap-2 rounded-full border border-storm-slate/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-storm-slate transition-all hover:bg-storm-slate hover:text-white cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back to Submissions
            </button>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
                  isApproved
                    ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                    : isRejected
                    ? 'bg-rose-500/15 text-rose-800 border border-rose-500/30'
                    : 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                }`}
              >
                {isApproved && <CheckCircle2 size={14} />}
                {isRejected && <XCircle size={14} />}
                {isPending && <Clock size={14} />}
                {selectedSubmission.status || 'Pending Review'}
              </span>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-storm-slate/15 bg-white p-2 text-storm-slate hover:bg-storm-slate hover:text-white transition-all"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Split Screen Container */}
        <main className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr] items-start">
            {/* Left Side: Article Content Reader */}
            <div className="rounded-[2.5rem] border border-white/80 bg-white/80 p-8 sm:p-12 shadow-[0_24px_70px_-50px_rgba(23,34,52,0.5)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4 border-b border-storm-slate/10 pb-6">
                <div>
                  <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.24em] text-storm-slate/70">
                    {selectedSubmission.genre === 'Poetry' ? <Feather size={14} /> : <BookOpen size={14} />}
                    {selectedSubmission.genre} • {selectedSubmission.genre === 'Poetry' ? `${selectedSubmission.line_count || 0} lines` : `${selectedSubmission.word_count || 0} words`}
                  </span>
                  <h1 className="mt-2 font-heading text-3xl sm:text-4xl text-storm-slate leading-tight">
                    {selectedSubmission.title}
                  </h1>
                </div>

                <button
                  onClick={handleCopyContent}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-storm-slate/15 bg-white px-3 py-2 text-xs font-medium text-storm-slate hover:bg-storm-slate hover:text-white transition-all cursor-pointer"
                  title="Copy content to clipboard"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Manuscript Reader Body */}
              <div className="mt-8 font-heading text-lg sm:text-xl leading-relaxed text-deep-ink/90 whitespace-pre-wrap select-text selection:bg-warm-sand/30 font-light">
                {selectedSubmission.content || (
                  <span className="italic text-deep-ink/40">No text content provided for this submission.</span>
                )}
              </div>
            </div>

            {/* Right Side: Author Details & Decision Actions */}
            <div className="space-y-6 sticky top-24">
              {/* Author Dossier Card */}
              <div className="rounded-[2.5rem] border border-white/80 bg-white/80 p-6 sm:p-8 shadow-[0_24px_70px_-50px_rgba(23,34,52,0.5)] backdrop-blur-xl">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-storm-slate/60 mb-6">
                  Author Dossier
                </p>

                <div className="space-y-5 font-body">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-storm-slate/10 text-storm-slate">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-deep-ink/50 uppercase tracking-wider font-semibold">Author Name</p>
                      <p className="text-base font-semibold text-deep-ink mt-0.5">{selectedSubmission.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-storm-slate/10 text-storm-slate">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-deep-ink/50 uppercase tracking-wider font-semibold">Email Address</p>
                      <a
                        href={`mailto:${selectedSubmission.email}`}
                        className="text-sm font-medium text-storm-slate hover:underline mt-0.5 block break-all"
                      >
                        {selectedSubmission.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-storm-slate/10 text-storm-slate">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-deep-ink/50 uppercase tracking-wider font-semibold">Location / City</p>
                      <p className="text-sm font-medium text-deep-ink mt-0.5">{selectedSubmission.city || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-storm-slate/10 text-storm-slate">
                      <Building size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-deep-ink/50 uppercase tracking-wider font-semibold">Institution / Affiliation</p>
                      <p className="text-sm font-medium text-deep-ink mt-0.5">{selectedSubmission.institution || 'Independent'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-storm-slate/10 text-storm-slate">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-deep-ink/50 uppercase tracking-wider font-semibold">Submitted On</p>
                      <p className="text-sm font-medium text-deep-ink mt-0.5">
                        {formatDate(selectedSubmission.created_at || selectedSubmission.submittedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="mt-8 pt-6 border-t border-storm-slate/10">
                  <div className="flex items-center justify-between text-xs font-body">
                    <span className="text-deep-ink/60 uppercase tracking-wider font-semibold">Current Status</span>
                    <span className="font-bold uppercase tracking-wider text-storm-slate">
                      {selectedSubmission.status || 'Pending Review'}
                    </span>
                  </div>
                  {selectedSubmission.reviewed_at && (
                    <p className="mt-1 text-xs text-deep-ink/50">
                      Last reviewed on {formatDate(selectedSubmission.reviewed_at)}
                    </p>
                  )}
                </div>

                {/* Decision Action Buttons at the Bottom */}
                <div className="mt-8 pt-6 border-t border-storm-slate/10 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-storm-slate/70 mb-2 font-body">
                    Editorial Decision
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Approve Button */}
                    <button
                      type="button"
                      disabled={decisionLoading || isApproved}
                      onClick={() => handleDecision(selectedSubmission.id, 'approved')}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 px-4 font-body text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isApproved
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg disabled:opacity-50'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      {decisionLoading ? 'Sending...' : isApproved ? 'Approved' : 'Approve'}
                    </button>

                    {/* Reject Button */}
                    <button
                      type="button"
                      disabled={decisionLoading || isRejected}
                      onClick={() => handleDecision(selectedSubmission.id, 'rejected')}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 px-4 font-body text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isRejected
                          ? 'bg-rose-600 text-white cursor-default'
                          : 'border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 disabled:opacity-50'
                      }`}
                    >
                      <XCircle size={16} />
                      {decisionLoading ? 'Sending...' : isRejected ? 'Rejected' : 'Reject'}
                    </button>
                  </div>

                  <p className="text-[11px] text-deep-ink/50 text-center font-body mt-2">
                    Action will update the status and immediately dispatch the decision email to the author.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Floating Toast Notification */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 font-body text-sm shadow-xl backdrop-blur-lg border transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-900/90 text-emerald-100 border-emerald-500/30'
                : toast.type === 'error'
                ? 'bg-rose-900/90 text-rose-100 border-rose-500/30'
                : 'bg-storm-slate/90 text-white border-white/20'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
            {toast.type === 'error' && <XCircle size={18} className="text-rose-400" />}
            {toast.type === 'info' && <Clock size={18} className="text-warm-sand" />}
            <div>
              <p className="font-semibold text-xs uppercase tracking-wider">{toast.title}</p>
              <p className="text-xs opacity-90">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Submissions List View
  return (
    <div className="min-h-screen bg-pale-sky text-deep-ink flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-storm-slate/10 bg-white/90 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="font-body text-[0.68rem] uppercase tracking-[0.32em] text-storm-slate/60 font-semibold">
              Soft Apocalypse India
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl text-storm-slate leading-none mt-1">
              Editorial Selection Desk
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchSubmissions()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-storm-slate/15 bg-white px-3.5 py-2 text-xs font-semibold text-storm-slate hover:bg-storm-slate hover:text-white transition-all cursor-pointer"
              title="Refresh submissions"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-storm-slate/15 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-storm-slate hover:bg-storm-slate hover:text-white transition-all cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-storm-slate/60">Total Entries</p>
            <p className="mt-2 font-heading text-3xl sm:text-4xl text-storm-slate">{stats.total}</p>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 shadow-sm">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-amber-800">Pending Review</p>
            <p className="mt-2 font-heading text-3xl sm:text-4xl text-amber-800">{stats.pending}</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 shadow-sm">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-emerald-800">Approved</p>
            <p className="mt-2 font-heading text-3xl sm:text-4xl text-emerald-800">{stats.approved}</p>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5 shadow-sm">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-rose-800">Rejected</p>
            <p className="mt-2 font-heading text-3xl sm:text-4xl text-rose-800">{stats.rejected}</p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="rounded-2xl border border-white/80 bg-white/80 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-storm-slate/40" />
            <input
              type="text"
              placeholder="Search by author, title, email, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-storm-slate/15 bg-white pl-10 pr-4 py-2.5 font-body text-sm text-deep-ink placeholder:text-deep-ink/35 focus:border-storm-slate focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Genre Filter */}
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="rounded-xl border border-storm-slate/15 bg-white px-3.5 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-storm-slate focus:outline-none cursor-pointer"
            >
              <option value="all">All Genres</option>
              <option value="Poetry">Poetry</option>
              <option value="Prose">Prose</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-storm-slate/15 bg-white px-3.5 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-storm-slate focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Submissions List */}
        {loading && submissions.length === 0 ? (
          <div className="py-20 text-center font-body text-sm text-storm-slate/60">
            <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-storm-slate" />
            Loading submissions from database...
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="rounded-[2.5rem] border border-white/70 bg-white/60 p-12 text-center shadow-sm">
            <BookOpen size={36} className="mx-auto text-storm-slate/30 mb-3" />
            <h3 className="font-heading text-2xl text-storm-slate">No submissions found</h3>
            <p className="mt-1 font-body text-xs text-deep-ink/50">
              {searchTerm || filterGenre !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search query or filters.'
                : 'No submissions have been registered yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSubmissions.map((sub) => {
              const isApproved = sub.status === 'approved';
              const isRejected = sub.status === 'rejected';
              const isPending = !isApproved && !isRejected;

              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className="group rounded-2xl border border-white/80 bg-white/75 p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-warm-sand/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-heading text-xl sm:text-2xl text-storm-slate font-medium group-hover:text-deep-ink transition-colors truncate">
                        {sub.title || 'Untitled Work'}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider ${
                          sub.genre === 'Poetry' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {sub.genre}
                      </span>
                    </div>

                    <p className="font-body text-xs text-deep-ink/65 flex items-center gap-2 flex-wrap">
                      <span>by <strong className="text-deep-ink font-semibold">{sub.name}</strong></span>
                      <span>•</span>
                      <span>{sub.city || 'Location unavailable'}</span>
                      <span>•</span>
                      <span>{sub.institution || 'Independent'}</span>
                      <span>•</span>
                      <span>{formatDate(sub.created_at || sub.submittedAt)}</span>
                    </p>

                    {sub.content && (
                      <p className="font-body text-xs text-deep-ink/45 line-clamp-1 italic max-w-2xl">
                        "{sub.content.slice(0, 140)}..."
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider ${
                        isApproved
                          ? 'bg-emerald-500/15 text-emerald-800'
                          : isRejected
                          ? 'bg-rose-500/15 text-rose-800'
                          : 'bg-amber-500/15 text-amber-800'
                      }`}
                    >
                      {isApproved && <CheckCircle2 size={13} />}
                      {isRejected && <XCircle size={13} />}
                      {isPending && <Clock size={13} />}
                      {sub.status || 'Pending'}
                    </span>

                    <div className="h-8 w-8 rounded-full border border-storm-slate/15 flex items-center justify-center text-storm-slate group-hover:bg-storm-slate group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
