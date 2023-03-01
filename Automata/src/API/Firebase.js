import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBe6_oOSGd5Qa7K0RIGonr5Srcw6peu2RY',
  authDomain: 'automata-981bd.firebaseapp.com',
  projectId: 'automata-981bd',
  storageBucket: 'automata-981bd.appspot.com',
  messagingSenderId: '940483545612',
  appId: '1:940483545612:web:15cccfadc200cefa923c29'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

//Métodos de obtención de datos de firebase

//Obtenemos los dispositivos de manera estática
export const dameDocs = (ref) => getDocs(collection(db, ref))

//Obtenemos docs filtrados por campo y valor
export const filterDevice = (ref, campo, valor) =>
  getDocs(query(collection(db, ref), where(campo, '==', valor)))

//Añadimos sala
export const addRoom = (ref, room) => addDoc(collection(db, ref), room)

//Añadimos un dispositivo
export const addDevice = (ref, device) => addDoc(collection(db, ref), device)

//Snapshot de los dispositivos
export const onDameDevices = (ref, callback) => onSnapshot(collection(db, ref), callback)

//Snapshot de las salas
export const onDameRooms = (ref, callback) => onSnapshot(collection(db, ref), callback)

//Actualizamos los dispositivos
export const updateDevice = (ref, id, objeto) => updateDoc(doc(db, ref, id), objeto)

//Eliminamos un dispositivo
export const deleteDevice = (ref, id) => deleteDoc(doc(db, ref, id))
