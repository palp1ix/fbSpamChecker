// Import the functions you need from the SDKs you need
import { initializeApp } from "./libs/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  connectAuthEmulator,
  onAuthStateChanged,
  signInWithCustomToken,
  setPersistence
 } from './libs/firebase-auth-web-extension.js';

const firebaseConfig = {
  apiKey: "AIzaSyCT3xLLQz_o4aeTZE-9DAX910J3Fd0U75k",
  authDomain: "fbspam-f7e95.firebaseapp.com",
  projectId: "fbspam-f7e95",
  storageBucket: "fbspam-f7e95.appspot.com",
  messagingSenderId: "970360759604",
  appId: "1:970360759604:web:c47b0d3e9fdb6019d23161",
  measurementId: "G-RWWC3EXJTZ",
  databaseURL: "https://users.europe-central2.firebaseio.com"
};
const authDiv = document.querySelector('.auth-container');
const errorDiv = document.querySelector('#error-container');
const loaderDiv = document.querySelector('.loader');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//connectAuthEmulator(auth, "http://localhost:9099");
const loginEmailPassword = async () => {
    loaderDiv.style.display = 'block';
    errorDiv.innerHTML = "";
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      loaderDiv.style.display = 'none';
      const errorCode = error.code;
      const errorMessage = error.message;
      
      errorDiv.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`;
      // ..
    });
}
document.getElementById('register-btn').addEventListener('click', loginEmailPassword);

auth.onAuthStateChanged((user) => {
  loaderDiv.style.display = 'none';
  if (user) {
      authDiv.style.display = 'none';
  }
});

//Пока не используется, форматирование даты
function formatDate(date) {
  const pad = (num) => num.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}