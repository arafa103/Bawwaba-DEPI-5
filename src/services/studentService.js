import { db } from '../config/firebase.js';
import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';


const studentsRef = collection(db, "students");

async function getStudent(studentId){
    const studentRef = doc(studentsRef, studentId);
    const studentSnap = await getDoc(studentRef);
    if(!studentSnap.exists()) throw new Error("Student doesn't exist.");
    return studentSnap.data();
}


 
async function listStudents(filters){
    // pagination is cut of scope, searching is done in client-side
    const constraints = [];
    for(let filter in filters){
        constraints.push(where(filter, "==", filters[filter]))
    }
    const studentsQuery = query(
        studentsRef,
        ...constraints
    )
    const studentsSnap = await getDocs(studentsQuery);
    const filteredStudents = studentsSnap.docs.map(s => s.data())
    return filteredStudents;
}


// updateStudentProfile() is deferred


export {getStudent, listStudents};