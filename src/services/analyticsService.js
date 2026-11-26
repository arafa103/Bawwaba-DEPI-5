import {db} from '../config/firebase';
import {collection, getDocs, limit, orderBy, query} from 'firebase/firestore';


const studentsRef = collection(db, "students");


async function getPublicRankings(){
    const rankingQuery = query(
        studentsRef,
        orderBy("cumulativeGpa", "desc"),
        limit(20)
    );
    const rankingSnap = await getDocs(rankingQuery);
    const ranking = rankingSnap.docs.map(r => {
        const {cumulativeGpa, name} = r.data();
        const {id} = r;
        return {id, name, cumulativeGpa};
    });
    return ranking;
}


export {getPublicRankings};