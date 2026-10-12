import { db, persistDB } from '../config/db.js';

function extractYoutubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export const getVideosByProfessor = (req, res) => {
  const { professorId } = req.params;
  const videos = db.videos.filter(v => v.professor_id === professorId && v.status === 'approved');
  return res.json({ videos });
};

export const submitVideo = (req, res) => {
  const user = req.user;
  const { professor_id, course_id, title, youtube_url, lecture_topic, description } = req.body;

  if (!professor_id || !title || !youtube_url) {
    return res.status(400).json({ error: 'Professor ID, title, and YouTube URL are required.' });
  }

  const videoId = extractYoutubeId(youtube_url);
  if (!videoId) {
    return res.status(400).json({ error: 'Invalid YouTube URL. Please provide a valid YouTube link.' });
  }

  const prof = db.professors.find(p => p.id === professor_id);
  if (!prof) {
    return res.status(404).json({ error: 'Professor not found.' });
  }

  const newVideo = {
    id: `vid-${Date.now()}`,
    professor_id,
    professor_name: prof.name,
    course_id: course_id || null,
    submitted_by: user.id,
    submitter_email: user.email,
    title: title.trim(),
    youtube_url: youtube_url.trim(),
    youtube_video_id: videoId,
    description: description || '',
    topic: lecture_topic || 'Lecture Demonstration',
    status: user.role === 'admin' ? 'approved' : 'pending',
    created_at: new Date().toISOString()
  };

  db.videos.push(newVideo);
  persistDB();

  return res.status(201).json({
    message: user.role === 'admin' ? 'Video approved and added immediately.' : 'Video submitted successfully! It is now pending moderator approval.',
    video: newVideo
  });
};
