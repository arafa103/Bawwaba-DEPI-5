import {db} from '../config/firebase.js';
import {addDoc, collection, doc, getDocs, query, runTransaction, serverTimestamp, where} from 'firebase/firestore';


const enrollmentsRef = collection(db, "enrollments");
const coursesRef = collection(db, "courses");


// getting courses ids only, courses docs is in getStudentCourses()
async function getStudentEnrollments(studentId){
    const studentCoursesQuery = query(enrollmentsRef,
        where('studentId', '==', `${studentId}`)
    );
    const enrollmentsSnap = await getDocs(studentCoursesQuery);
    const enrollmentIds = enrollmentsSnap.docs.map((e) => e.data().courseId)
    return enrollmentIds;
}

console.log(getStudentEnrollments("20250042_cs304"));


// getting courses docs
async function getStudentCourses(studentId){
    // we have the ids now, create query on courses where course is enrolled and return
    const enrollmentIds = await getStudentEnrollments(studentId);
    const enrolledCoursesQuery = query(enrollmentsRef,
        where('courseId', 'in', enrollmentIds)
    );
    const enrolledCoursesSnap = await getDocs(enrolledCoursesQuery);
    const enrolledCourses = enrolledCoursesSnap.docs.map((c) => c.data());
    return enrolledCourses;
}



// prerequisites aren't verified here, but in conflicts.js, use it first before enrolling
async function enrollInCourse(studentId, courseId){
    // check capacity, add enrollment(studentId, courseId), increment enrolled students
    // fields: capacity, enrolled
    runTransaction(db, async (transaction) =>{
        // verify capacity, add enrollment, increment enrolled students
        const courseRef = doc(coursesRef, courseId);
        const enrollmentRef = doc(enrollmentsRef, `${studentId}_${courseId}`)
        const course = (await transaction.get(courseRef)).data();
        if(course.enrolled > course.capacity) throw new Error("Course capacity is exceeded!");
        if(course.enrolled == course.capacity) throw new Error("Course capacity is full");
        await transaction.set(enrollmentRef, {studentId, courseId, createdAt: serverTimestamp()});
        await transaction.update(courseRef, "enrolled", course.enrolled + 1);
    })
}


async function dropCourse(studentId, courseId){
    // delete enrollment, decremnt enrolled in course
    runTransaction(db, async (transaction) =>{
        const courseRef = doc(coursesRef, courseId);
        const enrollmentRef = doc(enrollmentsRef, `${studentId}_${courseId}`);
        await transaction.delete(enrollmentRef);
        await transaction.update(courseRef, "enrolled", course.enrolled - 1);
    })
}


export {getStudentEnrollments, getStudentCourses, enrollInCourse, dropCourse};