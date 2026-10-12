const BANNED_PATTERNS = [
  /\b(fuck|shit|bitch|asshole|bastard|dick|cunt|slut|whore|nigger|faggot|retard)\b/i,
  /\b(scam|fraud|criminal|idiot|moron|stupid idiot)\b/i
];

export const filterProfanity = (text) => {
  if (!text) return '';
  let cleaned = text;
  BANNED_PATTERNS.forEach(regex => {
    cleaned = cleaned.replace(regex, (match) => '*'.repeat(match.length));
  });
  return cleaned;
};

export const profanityMiddleware = (req, res, next) => {
  if (req.body && req.body.review_text) {
    req.body.review_text = filterProfanity(req.body.review_text);
  }
  if (req.body && req.body.title) {
    req.body.title = filterProfanity(req.body.title);
  }
  next();
};
