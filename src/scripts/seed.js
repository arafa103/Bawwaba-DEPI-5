// ### Quick Checklist Before Running

// 1. **ESM Compatibility:** Because Vite projects use `"type": "module"` in `package.json`, the script above uses `import` and `readFileSync` so it runs cleanly with `node scripts/seed.js` without CommonJS `require` errors.
// 2. **Auth UIDs:** In Firebase Console $\rightarrow$ **Authentication**, create the two test users (`ahmadarafa103@gmail.com` and `nour.admin@bawwaba.edu`) and copy their generated **User UID** into the `uid` fields in `users` (and `studentId` for the student) if you want login rules to match immediately.
// 3. **Constants File (`src/utils/constants.js`):** Add your active term config so your schedule builder doesn't need a `terms` collection:
// ```javascript
// export const ACTIVE_TERM = {
//   name: 'Fall 2026',
//   minCredits: 12,
//   maxCredits: 18,
//   addDropDeadline: '2026-10-15'
// };
// ```
// For a quick walkthrough of using the Firebase Admin SDK in Node.js to read and write Cloud Firestore documents, see [Getting Started with Cloud Firestore with Node.js - Firecasts](https://www.youtube.com/watch?v=Z87OZtIYC_0).


// new seed.js

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Load serviceAccountKey.json (supports ES modules in Vite projects)
const serviceAccount = JSON.parse(
  readFileSync(new URL('../serviceAccountKey.json', import.meta.url))
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seedTierADatabase() {
  console.log('🌱 Seeding Bawwaba Tier A Database...');

  // 1. Users (Auth Role & ID Mapping)
  // Note: Ensure these UIDs match the Auth UIDs created in Firebase Authentication
  const users = [
    {
      uid: 'admin_nour_id',
      role: 'admin',
      studentId: null,
      name: 'Nour Hassan',
      email: 'nour.admin@bawwaba.edu'
    },
    {
      uid: '20250042',
      role: 'student',
      studentId: '20250042',
      name: 'Ahmed Mostafa',
      email: 'ahmadarafa103@gmail.com'
    }
  ];

  for (const user of users) {
    await db.collection('users').doc(user.uid).set(user);
  }
  console.log('✅ users collection seeded.');

  // 2. Students (Profile + Embedded Transcript Results Array)
  const students = [
    {
      studentId: '20250042',
      name: 'Ahmed Mostafa',
      email: 'ahmadarafa103@gmail.com',
      phone: '+201000000000',
      address: 'Giza, Egypt',
      program: 'B.Sc. in Computer Science',
      department: 'Computer Science',
      year: 2,
      status: 'Active',
      cumulativeGpa: 3.60,
      creditsEarned: 15,
      results: [
        { term: 'Fall 2025', code: 'CS201', title: 'Data Structures & Algorithms', credits: 3, grade: 'A', gradePoints: 4.0 },
        { term: 'Fall 2025', code: 'MATH213', title: 'Discrete Mathematics', credits: 3, grade: 'A-', gradePoints: 3.7 },
        { term: 'Spring 2026', code: 'CS202', title: 'Object-Oriented Programming', credits: 3, grade: 'B+', gradePoints: 3.3 },
        { term: 'Spring 2026', code: 'MATH232', title: 'Real Analysis II', credits: 3, grade: 'A', gradePoints: 4.0 },
        { term: 'Spring 2026', code: 'CS306', title: 'Operating Systems', credits: 3, grade: 'B', gradePoints: 3.0 }
      ]
    },
    {
      studentId: '20250088',
      name: 'Hana Tarek',
      email: 'hana.tarek@bawwaba.edu',
      phone: '+201022222222',
      address: 'Giza, Egypt',
      program: 'B.Sc. in Computer Science',
      department: 'Computer Science',
      year: 2,
      status: 'Active',
      cumulativeGpa: 3.85,
      creditsEarned: 15,
      results: [
        { term: 'Fall 2025', code: 'CS201', title: 'Data Structures & Algorithms', credits: 3, grade: 'A', gradePoints: 4.0 },
        { term: 'Fall 2025', code: 'MATH213', title: 'Discrete Mathematics', credits: 3, grade: 'A', gradePoints: 4.0 },
        { term: 'Spring 2026', code: 'CS202', title: 'Object-Oriented Programming', credits: 3, grade: 'A-', gradePoints: 3.7 },
        { term: 'Spring 2026', code: 'MATH232', title: 'Real Analysis II', credits: 3, grade: 'A-', gradePoints: 3.7 },
        { term: 'Spring 2026', code: 'CS306', title: 'Operating Systems', credits: 3, grade: 'A', gradePoints: 4.0 }
      ]
    }
  ];

  for (const student of students) {
    await db.collection('students').doc(student.studentId).set(student);
  }
  console.log('✅ students collection (with embedded results) seeded.');

  // 3. Courses (8 Fall 2026 Courses)
  const courses = [
    { id: 'cs304', code: 'CS304', title: 'Computer Graphics', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Waleed Y.', capacity: 40, enrolled: 35, schedule: [{ day: 'Sun', start: '10:00', end: '11:30' }, { day: 'Tue', start: '10:00', end: '11:30' }], room: 'Lab 3', status: 'Open', prerequisites: ['CS202'] },
    { id: 'cs308', code: 'CS308', title: 'Database Systems', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Salma K.', capacity: 45, enrolled: 42, schedule: [{ day: 'Mon', start: '12:00', end: '13:30' }, { day: 'Wed', start: '12:00', end: '13:30' }], room: 'Hall 2', status: 'Open', prerequisites: ['CS201'] },
    { id: 'cs401', code: 'CS401', title: 'Computer Networks', credits: 3, department: 'Computer Science', section: 'Sec 2', instructor: 'Dr. Amr H.', capacity: 40, enrolled: 38, schedule: [{ day: 'Sun', start: '12:00', end: '13:30' }, { day: 'Tue', start: '12:00', end: '13:30' }], room: 'Hall 4', status: 'Open', prerequisites: ['CS306'] },
    { id: 'cs309', code: 'CS309', title: 'Systems Analysis & Design', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Mona S.', capacity: 35, enrolled: 30, schedule: [{ day: 'Thu', start: '10:00', end: '13:00' }], room: 'Lab 1', status: 'Open', prerequisites: ['CS202'] },
    { id: 'math301', code: 'MATH301', title: 'Linear & Abstract Algebra', credits: 3, department: 'Mathematics', section: 'Sec 1', instructor: 'Dr. Nabil Z.', capacity: 50, enrolled: 45, schedule: [{ day: 'Mon', start: '09:00', end: '10:30' }, { day: 'Wed', start: '09:00', end: '10:30' }], room: 'Hall 1', status: 'Open', prerequisites: ['MATH213'] },
    { id: 'cs310', code: 'CS310', title: 'Software Engineering', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Youssef E.', capacity: 40, enrolled: 40, schedule: [{ day: 'Tue', start: '14:00', end: '15:30' }, { day: 'Thu', start: '14:00', end: '15:30' }], room: 'Lab 2', status: 'Full', prerequisites: ['CS202'] },
    { id: 'gen101', code: 'GEN101', title: 'Technical Writing & Ethics', credits: 3, department: 'General', section: 'Sec 3', instructor: 'Dr. Hoda F.', capacity: 60, enrolled: 50, schedule: [{ day: 'Sun', start: '14:00', end: '15:30' }], room: 'Hall 5', status: 'Open', prerequisites: [] },
    { id: 'cs315', code: 'CS315', title: 'Distributed Systems', credits: 3, department: 'Computer Science', section: 'Sec 1', instructor: 'Dr. Khaled M.', capacity: 35, enrolled: 25, schedule: [{ day: 'Wed', start: '14:00', end: '15:30' }, { day: 'Thu', start: '09:00', end: '10:30' }], room: 'Lab 4', status: 'Open', prerequisites: ['CS306'] }
  ];

  for (const course of courses) {
    await db.collection('courses').doc(course.id).set(course);
  }
  console.log('✅ courses collection seeded.');

  // 4. Enrollments (Sample active enrollment using deterministic ID: studentId_courseId)
  await db.collection('enrollments').doc('20250042_cs304').set({
    studentId: '20250042',
    courseId: 'cs304',
    createdAt: new Date().toISOString()
  });
  console.log('✅ enrollments collection seeded.');

  console.log('🚀 Bawwaba Tier A database seeding finished!');
}

seedTierADatabase().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});