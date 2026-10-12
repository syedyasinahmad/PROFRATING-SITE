const API_BASE = '/api';

function getAuthHeader() {
  try {
    const token = localStorage.getItem('profpulse_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (e) {
    return {};
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export const api = {
  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me'),

  // Professors
  getProfessors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/professors${query ? `?${query}` : ''}`);
  },
  getProfessorById: (id) => request(`/professors/${id}`),
  compareProfessors: (ids) => request(`/professors/compare?ids=${ids.join(',')}`),
  getLeaderboards: () => request('/professors/leaderboard'),
  toggleFollow: (id) => request(`/professors/${id}/follow`, { method: 'POST' }),

  // Reviews
  createReview: (reviewData) => request('/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),
  voteReview: (id, vote_type) => request(`/reviews/${id}/vote`, { method: 'POST', body: JSON.stringify({ vote_type }) }),
  reportReview: (id, reportData) => request(`/reviews/${id}/report`, { method: 'POST', body: JSON.stringify(reportData) }),

  // Courses
  getCourses: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/courses${query ? `?${query}` : ''}`);
  },
  getCourseById: (id) => request(`/courses/${id}`),

  // Videos
  getVideosByProfessor: (profId) => request(`/videos/professor/${profId}`),
  submitVideo: (videoData) => request('/videos', { method: 'POST', body: JSON.stringify(videoData) }),

  // Quiz
  getQuizQuestions: () => request('/quiz/questions'),
  matchQuizProfessors: (payload) => request('/quiz/match', { method: 'POST', body: JSON.stringify(payload) }),

  // Admin
  getModerationQueue: () => request('/admin/queue'),
  moderateReview: (id, action) => request(`/admin/reviews/${id}`, { method: 'PATCH', body: JSON.stringify({ action }) }),
  moderateVideo: (id, action) => request(`/admin/videos/${id}`, { method: 'PATCH', body: JSON.stringify({ action }) }),
  moderateReport: (id, action) => request(`/admin/reports/${id}`, { method: 'PATCH', body: JSON.stringify({ action }) }),
};
