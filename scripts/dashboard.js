// import { auth, onAuthStateChanged } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import {
  app,
  db,
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "./firebase.js";
// import {
//   db,
//   getFirestore,
//   doc,
//   setDoc,
//   collection,
//   addDoc,
//   getDocs,
//   onSnapshot,
//   query,
//   where,
// } from "./firebase.js";

const auth = getAuth(app);


let loader = document.getElementById('loader');
loader.style.display='none'

//Current SIgnIn User

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("Current User", uid, user);
    let userGreeting = document.getElementById("userName");
    userGreeting.innerHTML = user.displayName;

    // ...
  } else {
    // User is signed out
    // ...
    console.log("Current User SignOUt");
  }
});

let post = () => {
  let blog_heading = document.getElementById("blog_heading");
  let blogTextArea = document.getElementById("blogTextArea");
  let date = new Date().toDateString();
let loader = document.getElementById('loader');
loader.style.display='block'
  async function sentData() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        async function calltoSentData() {
          const docRef = await addDoc(collection(db, "blogs"), {
            blog_heading: blog_heading.value,
            blogTextArea: blogTextArea.value,
            name: user.name,
            email: user.email,
            // uid: user.uid,
            // date: date,
            // dateFB: Timestamp,
            name:'Umar'
          });
          console.log("Document written with ID: ", docRef.id);
        }
        calltoSentData();
        
        // ...
      }
      loader.style.display='none'
      blog_heading.value = "";
       blogTextArea.value = "";
    });
  }
  sentData();

  

};

let postBlogBtn = document.getElementById("postBlogBtn");
postBlogBtn.addEventListener("click", post);


// let post = () => {
//   let blog_heading = document.getElementById("blog_heading");
//   let blogTextArea = document.getElementById("blogTextArea");

//   let date = new Date().toDateString();

//   function result() {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         var date = new Date().toDateString();
//         console.log("Current User", uid, user);
//         const docRef = addDoc(collection(db, "blogs"), {
//           blog_heading: blog_heading.value,
//           blogTextArea: blogTextArea.value,
//           name: user.name,
//           email: user.email,
//           uid: user.uid,
//           date: date,
//           dateFB: Timestamp,
//         });
//         console.log("result Submitted", docRef.id);
//       } else {
//         // User is signed out
//         console.log("Current User SignOUt");
//       }
//       blog_heading.value = "";
//       blogTextArea.value = "";
//     });
//   }
//   result();
// };

// // }

// let readData = () => {
//   const q = query(collection(db, "blogs"),);
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const blog = [];
//   querySnapshot.forEach((doc) => {
//       blog.push(doc.data());
//   });
//   console.log("Current blog in CA: ", blog[0].blog_heading);
// });

// }

// const querySnapshot = await getDocs(collection(db, "blogs"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
//   quizName.innerHTML=`${doc.blog_heading}`

// });

// let showData = () => {
//   // readData()
//   let quizName = document.getElementById("quizName");
//   let blog_text = document.getElementById("blog_text");
//   let bloger_name = document.getElementById("bloger_name");

//   quizName.innerHTML=`${doc.data.blog_heading}`
//   // blog_text.innerHTML=`${blog.blogTex}

// }

// showData()
