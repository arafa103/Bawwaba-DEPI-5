import { auth, db } from '../config/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc } from 'firebase/firestore'

// services: registering and logining in with email and password

const usersRef = collection(db, "users")


async function login(email, password) {
    const {user} = await signInWithEmailAndPassword(auth, email, password)
    return user || null;

}

// onAuthChanged: store user in context, get it by getUserContext
async function getUserContext(uid) {
    const userRef = doc(usersRef, uid)
    const user = await getDoc(userRef)
    // return null if user's not existing
    if (!user.exists()) return null;
    return user.data()
}


async function logout() {
    await signOut(auth)
}


export { login, getUserContext, logout };