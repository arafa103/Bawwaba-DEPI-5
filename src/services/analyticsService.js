import {db} from '../config/firebase';
import {collection, doc, getDocs, limit, orderBy, query} from 'firebase/firestore';


const studentsRef = collection(db, "students");


// mechanism updated: student rank & average department gpa are computed on data seeding, getPublicRanks only returns-
// -the fields from student document.
async function getPublicRankings(studentId){
    // const rankingQuery = query(
    //     studentsRef,
    //     orderBy("cumulativeGpa", "desc"),
    //     limit(20)
    // );
    // const rankingSnap = await getDocs(rankingQuery);
    // const ranking = rankingSnap.docs.map(r => {
    //     const {cumulativeGpa, name} = r.data();
    //     const {id} = r;
    //     return {id, name, cumulativeGpa};
    // });
    // return ranking;

    const studentRef = doc(studentsRef, studentId);
    const studentSnap = await getDoc(studentRef);
    const student = studentSnap.data();
    const {cumulativeGpa, departmentRank, departmentAvgGpa} = student;
    return {cumulativeGpa, departmentRank, departmentAvgGpa};
}


export {getPublicRankings};