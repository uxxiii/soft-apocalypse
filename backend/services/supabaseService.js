const { createClient } = require('@supabase/supabase-js');

let cachedSupabase = null;

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url.includes('your-project') || url.includes('YOUR-')) {
    return null;
  }

  if (!cachedSupabase) {
    try {
      cachedSupabase = createClient(url, key);
      console.log('✅ Connected to Supabase at:', url);
    } catch (err) {
      console.warn('⚠️ Supabase connection error:', err.message);
      return null;
    }
  }
  return cachedSupabase;
}

// In-memory fallback for local testing if Supabase is not yet configured
let memorySubmissions = [];

/**
 * Save new submission
 */
async function saveSubmission(data) {
  const submissionRecord = {
    name: data.name,
    email: data.email,
    city: data.city,
    institution: data.institution,
    genre: data.genre,
    title: data.title,
    content: data.content,
    word_count: data.wordCount || 0,
    line_count: data.lineCount || 0,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabase();
  if (supabase) {
    const { data: inserted, error } = await supabase
      .from('submissions')
      .insert([submissionRecord])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return inserted;
  }

  // Fallback to memory
  const fallbackRecord = {
    id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    ...submissionRecord,
  };
  memorySubmissions.unshift(fallbackRecord);
  return fallbackRecord;
}

/**
 * Get all submissions
 */
async function getAllSubmissions() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase fetch error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  }

  return memorySubmissions;
}

/**
 * Update submission status (approved or rejected)
 */
async function updateSubmissionStatus(id, status) {
  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}. Must be one of ${validStatuses.join(', ')}`);
  }

  const updates = {
    status,
    reviewed_at: new Date().toISOString(),
  };

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from('submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase update error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data;
  }

  const record = memorySubmissions.find((s) => String(s.id) === String(id));
  if (!record) {
    throw new Error('Submission not found');
  }
  Object.assign(record, updates);
  return record;
}

module.exports = {
  saveSubmission,
  getAllSubmissions,
  updateSubmissionStatus,
};
