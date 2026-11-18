
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedDatabase() {
  console.log('🌱 Starting Bawwaba Database Seeding...');

  // 1. Seed Academic Terms
  const terms = [
    { id: 'fall_2025', name: 'Fall 2025', registrationOpen: false, minCredits: 12, maxCredits: 18 },
    { id: 'spring_2026', name: 'Spring 2026', registrationOpen: false, minCredits: 12, maxCredits: 18 },
    { id: 'fall_2026', name: 'Fall 2026', registrationOpen: true, minCredits: 12, maxCredits: 18, addDropDeadline: '2026-10-15' }
  ];
  for (const term of terms) {
    await db.collection('terms').doc(term.id).set(term);
  }
  console.log('✅ Terms seeded.');

  // 2. Seed Users (Role Mapping for Auth)
  const users = [
    { uid: 'admin_nour_id', role: 'admin', name: 'Nour Hassan', email: 'nour.admin@bawwaba.edu' },
    { uid: '20250042', role: 'student', name: 'Ahmed Mostafa', email: 'ahmadarafa103@gmail.com' }
  ];
  for (const user of users) {
    await db.collection('users').doc(user.uid).set(user);
  }
  console.log('✅ Users mapping seeded.');

  // 3. Seed Students & Results Subcollection
  const students = [
    {
      studentId: '20250042',
      name: 'Ahmed Mostafa',
      dob: '2004-05-12',
      emails: ['ahmadarafa103@gmail.com'],
      phone: '+201000000000',
      nationality: 'Egyptian',
      address: 'Giza, Egypt',
      emergencyContact: 'Mohamed Mostafa (+201111111111)',
      program: 'B.Sc. in Computer Science',
      department: 'Computer Science',
      year: 2,
      classOf: 2028,
      advisor: 'Dr. Tarek M.',
      status: 'Active',
      standing: 'Good Standing',
      cumulativeGpa: 3.70,
      creditsEarned: 30
    }
  ];

  for (const student of students) {
    await db.collection('students').doc(student.studentId).set(student);

    // Seed per-term grade results subcollection
    const results = [
      { resultId: 'cs201', termId: 'fall_2025', courseCode: 'CS201', courseTitle: 'Data Structures & Algorithms', credits: 3, grade: 'A', gradePoints: 4.0, qualityPoints: 12.0 },
      { resultId: 'math213', termId: 'fall_2025', courseCode: 'MATH213', courseTitle: 'Discrete Mathematics', credits: 3, grade: 'A-', gradePoints: 3.7, qualityPoints: 11.1 },
      { resultId: 'cs202', termId: 'spring_2026', courseCode: 'CS202', courseTitle: 'Object-Oriented Programming', credits: 3, grade: 'B+', gradePoints: 3.3, qualityPoints: 9.9 },
      { resultId: 'math232', termId: 'spring_2026', courseCode: 'MATH232', courseTitle: 'Real Analysis II', credits: 3, grade: 'A', gradePoints: 4.0, qualityPoints: 12.0 },
      { resultId: 'cs306', termId: 'spring_2026', courseCode: 'CS306', courseTitle: 'Operating Systems', credits: 3, grade: 'B', gradePoints: 3.0, qualityPoints: 9.0 }
    ];

    for (const res of results) {
      await db.collection(`students/${student.studentId}/results`).doc(res.resultId).set(res);
    }
  }
  console.log('✅ Student profiles and transcript results seeded.');

  // 4. Seed Course Catalog (8 Fall 2026 Courses)
  const courses = [
    { id: 'cs304', code: 'CS304', title: 'Computer Graphics', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Waleed Y.', capacity: 40, enrolled: 35, schedule: [{ day: 'Sun', start: '10:00', end: '11:30' }, { day: 'Tue', start: '10:00', end: '11:30' }], room: 'Lab 3', status: 'Open', prerequisites: ['CS202'], termId: 'fall_2026' },
    { id: 'cs308', code: 'CS308', title: 'Database Systems', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Salma K.', capacity: 45, enrolled: 42, schedule: [{ day: 'Mon', start: '12:00', end: '13:30' }, { day: 'Wed', start: '12:00', end: '13:30' }], room: 'Hall 2', status: 'Open', prerequisites: ['CS201'], termId: 'fall_2026' },
    { id: 'cs401', code: 'CS401', title: 'Computer Networks', credits: 3, department: 'Computer Science', section: 'Sec 2', instructor: 'Dr. Amr H.', capacity: 40, enrolled: 38, schedule: [{ day: 'Sun', start: '12:00', end: '13:30' }, { day: 'Tue', start: '12:00', end: '13:30' }], room: 'Hall 4', status: 'Open', prerequisites: ['CS306'], termId: 'fall_2026' },
    { id: 'cs309', code: 'CS309', title: 'Systems Analysis & Design', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Mona S.', capacity: 35, enrolled: 30, schedule: [{ day: 'Thu', start: '10:00', end: '13:00' }], room: 'Lab 1', status: 'Open', prerequisites: ['CS202'], termId: 'fall_2026' },
    { id: 'math301', code: 'MATH301', title: 'Linear & Abstract Algebra', credits: 3, department: 'Mathematics', section: 'Sec 1', instructor: 'Dr. Nabil Z.', capacity: 50, enrolled: 45, schedule: [{ day: 'Mon', start: '09:00', end: '10:30' }, { day: 'Wed', start: '09:00', end: '10:30' }], room: 'Hall 1', status: 'Open', prerequisites: ['MATH213'], termId: 'fall_2026' },
    { id: 'cs310', code: 'CS310', title: 'Software Engineering', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Youssef E.', capacity: 40, enrolled: 40, schedule: [{ day: 'Tue', start: '14:00', end: '15:30' }, { day: 'Thu', start: '14:00', end: '15:30' }], room: 'Lab 2', status: 'Full', prerequisites: ['CS202'], termId: 'fall_2026' },
    { id: 'gen101', code: 'GEN101', title: 'Technical Writing & Ethics', credits: 3, department: 'General', section: 'Sec 3', instructor: 'Dr. Hoda F.', capacity: 60, enrolled: 50, schedule: [{ day: 'Sun', start: '14:00', end: '15:30' }], room: 'Hall 5', status: 'Open', prerequisites: [], termId: 'fall_2026' },
    { id: 'cs315', code: 'CS315', title: 'Distributed Systems', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Khaled M.', capacity: 35, enrolled: 25, schedule: [{ day: 'Wed', start: '14:00', end: '15:30' }, { day: 'Thu', start: '09:00', end: '10:30' }], room: 'Lab 4', status: 'Open', prerequisites: ['CS306'], termId: 'fall_2026' }
  ];

  for (const course of courses) {
    await db.collection('courses').doc(course.id).set(course);
  }
  console.log('✅ Course catalog seeded.');

  // 5. Seed Public Rankings (For leaderboards)
  await db.collection('publicRankings').doc('20250042').set({
    studentId: '20250042',
    name: 'Ahmed Mostafa',
    department: 'Computer Science',
    year: 2,
    cumulativeGpa: 3.70,
    creditsEarned: 30,
    rank: 4
  });
  console.log('✅ Public rankings seeded.');

  // 6. Seed Department Stats (For analytics trajectory charts)
  await db.collection('departmentStats').doc('cs_year2').set({
    department: 'Computer Science',
    year: 2,
    termAverages: {
      'fall_2025': 3.12,
      'spring_2026': 3.18
    }
  });
  console.log('✅ Department stats seeded.');

  console.log('🚀 Database seeding completed successfully!');
}

seedDatabase().catch((error) => {
  console.error('❌ Error seeding database:', error);
});


// ### How to execute it:
// 1. Ensure your `serviceAccountKey.json` file is placed in your project root folder (next to `package.json`).
// 2. Run the script from your terminal:
