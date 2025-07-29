const supabase = require('../config/supabase');

async function verifyToken(token) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    throw new Error(error?.message || 'Invalid token or user not found');
  }
  return data.user;
}

module.exports = { verifyToken };
