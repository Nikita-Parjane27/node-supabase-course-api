import express from 'express';
import supabase from '../supabaseClient.js';
import validateEnrollment from '../middleware/validateEnrollment.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enroll a student into a course
router.post('/', validateEnrollment, async (req, res) => {
  const { student_name, course_id } = req.body;
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([{ student_name, course_id }])
      .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({
      message: 'Student enrolled successfully',
      enrollment: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get enrollments for a course
router.get('/:id/enrollments', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('student_name, course_id')
      .eq('course_id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;