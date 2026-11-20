import {db} from '../config/firebase'
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore'

const coursesRef = collection(db, "courses");


async function getCourse(courseId){
    const courseRef = doc(coursesRef, courseId);
    const courseSnap = await getDoc(courseRef);
    if(!courseSnap.exists()) return null;
    return courseSnap.data();
}

async function listCourses(filters){
    const constraints = [];
    for(let filter in filters){
        constraints.push(where(filter, "==", filters[filter]));
    }
    const coursesQuery = query(coursesRef, ...constraints);
    const coursesSnap = await getDocs(coursesQuery);
    const filteredCourses = coursesSnap.docs.map(c => c.data())
    return filteredCourses;
}

async function createCourse(courseData){
    const courseSnap = await addDoc(coursesRef, courseData);
    return {id: courseSnap.id, ...courseData};
}

async function updateCourse(courseId, newData){
    const courseRef = doc(coursesRef, courseId);
    await updateDoc(courseRef, newData);
    return newData;
}

async function deleteCourse(courseId){
    const courseRef = doc(coursesRef, courseId);
    await deleteDoc(courseRef);
}


export {getCourse, listCourses, createCourse, updateCourse, deleteCourse};