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

let loader = document.getElementById("loader");
loader.style.display = "none";

//Current SIgnIn User

onAuthStateChanged(auth, (user) => {
  if (user) {
    let uid = user.uid;
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

//User Data

async function getUserData() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      var uid = user.uid;
      console.log("Current User", uid, user);
      // let userGreeting = document.getElementById("userName");
      // userGreeting.innerHTML = user.displayName;

      async function runFunc() {
        const q = query(collection(db, "users"), where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let userName = document.getElementById("userName");
          let newName = user.displayName || doc.data().name;

          userName.innerHTML = newName.toUpperCase();
        });
      }
      runFunc();

      // ...
    } else {
      // User is signed out
      // ...
      console.log("Current User SignOUt");
    }
  });
}

getUserData();

let post = () => {
  let blog_heading = document.getElementById("blog_heading");
  let blogTextArea = document.getElementById("blogTextArea");
  let date = new Date().toDateString();
  let loader = document.getElementById("loader");
  loader.style.display = "block";
  async function sentData() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        async function calltoSentData() {
          const docRef = await addDoc(collection(db, "blogs"), {
            blog_heading: blog_heading.value,
            blogTextArea: blogTextArea.value,
            name: user.name,
            email: user.email,
            uid: user.uid,
            date: date,
            // dateFB: Timestamp,
            name: "Umar",
          });

          console.log("Document written with ID: ", docRef.id);
        }

        calltoSentData();

        // ...
      }
      loader.style.display = "none";
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


onAuthStateChanged(auth, (user) => {
  if (user) {
    let uid = user.uid;
    console.log("Current User", uid, user);
   
    
async function displayPosts() {
  const postsContainer = document.getElementById("posts-container");
  const q = query(collection(db, "blogs"), where("uid", "==", uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const blog = [];

  querySnapshot.forEach((doc) => {

    blog.push(doc.data());

    // Create a card element
    const card = document.createElement("div");
    card.className = "card";
   

    // Get the data from the document
    const data = doc.data();

    // Populate the card with data
    const title = document.createElement("h2");
    title.textContent = data.blog_heading; // Assuming the blog post has a 'title' field
    card.appendChild(title);

    const content = document.createElement("p");
    content.textContent = data.blogTextArea; // Assuming the blog post has a 'content' field
    card.appendChild(content);

    // const makeDiv = document.createElement('div')
    // makeDiv.className='card1'

    const displayName = document.createElement("p");
    displayName.className = 'name'
    displayName.textContent =data.name; // Assuming the blog post has a 'content' field
    card.appendChild(displayName);

    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = new Date().toDateString(); // Assuming the blog post has a 'date' field as a timestamp
    card.appendChild(date);

    // Append the card to the container
    postsContainer.appendChild(card);
  });
  })}

// Call the function to display posts
displayPosts();

    // ...
  } else {
    // User is signed out
    // ...
    console.log("Current User SignOUt");
  }
});


//Read Data

// async function runBlogFunc() {
//   const q = query(collection(db, "blogs"), );
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const Blog = [];
//   querySnapshot.forEach((doc) => {

//       Blog.push(doc.data());
//       let blog_card = document.getElementById('blog_card');
//       blog_card.innerHTML = `${Blog.name}`
//   });
//   console.log("Current Blog in CA: ", Blog);

//   let blog_card = document.getElementById('blog_card');
//   blog_card.innerHTML =
//   `
//   <h5 class="card-title" id="quizName">${Blog.name}</h5>
//           <p class="card-text" id="blog_text">
//            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, temporibus?
//           </p>

//           <div>
//             <h5 id="bloger_name">John</h5>
//           <p>Mon 17 , Aug 2024</p>
//   `
// });

// }
// runBlogFunc()
