import {useEffect, useState} from "react";
import {getAuth, createUserWithEmailAndPassword,signInWithPopup, signInWithEmailAndPassword ,GoogleAuthProvider ,updateProfile , onAuthStateChanged, getIdToken, signOut} from "firebase/auth";
import initializeFirebase from "../Firebase/firebase.initialize";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";
//initialize firebase app
initializeFirebase();
const useFirebase=() => {
  const auth=getAuth();
  const [user, setUser]=useState({});
  const [isLoading, setIsLoading]=useState(true);
  const [authError, setAuthError]=useState('');
  const [admin, setAdmin]=useState(false);
  const [checkAdmin, setCheckAdmin]=useState(false);
const [allCourses, setAllCourses] = useState([]);
  const googleProvider=new GoogleAuthProvider();

  //get courses
  let i=true;
  const url = 'https://urscoursedata-default-rtdb.firebaseio.com/Courses.json';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllCourses(data);
                console.log('From useeffect',allCourses)
            });
    }, [isLoading]);
  i=false;

    //register user
  const registerUser=(email, password, history, name) => {
      setIsLoading(true)
      // console.log('From register user', email);
        createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
           setAuthError('');
           const newUser={email, displayName: name}
           //send name to firebase after creation
           setUser(newUser);
           //save user to the database
          saveUser(email, name, 'POST')
              updateProfile(auth.currentUser, {
                  displayName: name
              }).then(() => {
                logout2()
Swal.fire(
  'Congratulations!',
  'Your Registration is complete, Please sign in with email and password',
  'success'
)
 })
 history.replace('/login');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage=error.message;
    setAuthError(errorMessage)
     Swal.fire({
  icon: 'error',
  title: 'Sorry...Rejected',
  text: `${authError.slice(22)}`,
})
    // ..
  })
          .finally(()=>  setIsLoading(false));
  }
  useEffect(() => {
    fetch(`https://immense-escarpment-32991.herokuapp.com/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data, 'from admin finder');
      setAdmin(data.admin)
    })
  },[user.email,checkAdmin])
    //sign in
  const loginUser=(email, password, location, history) => {
    setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
    //location set
            //to redirect admin dashboard
            // console.log('from user cr', admin);
            if(admin) {
              const destination=location.state?.from||'/dashboard';
              history.replace(destination);
            }
            else {
              // console.log('else');
              const destination=location.state?.from||'/';
              history.replace(destination);
            }
    // Signed in
    setAuthError('');
    // ...
  })
  .catch((error) => {
    const errorCode=error.code;
    // console.log(error.code,'s', error.message, 'd');
    const errorMessage=error.message;
    setAuthError(errorMessage)
    // alert(authError.slice(22))
    Swal.fire({
  icon: 'error',
  title: 'Sorry...Rejected',
  text: `${authError.slice(22)}`,
})
  }).finally(()=>  setIsLoading(false));
  }

  //google sign in
  const signInWithGoogle=(location, history) => {
    setIsLoading(true);
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const user=result.user;
    saveUser(user.email, user.displayName, 'PUT')
    setAuthError('');
    const destination=location.state?.from||'/';
            history(destination ,{replace: true});

  }).catch((error) => {
    setAuthError(error.message)
  }).finally(()=>  setIsLoading(false));

}
//observer
    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {

    setUser(user);
    getIdToken(user)
    .then(idToken => {

    })
  } else {
    setUser({})
    }
    setIsLoading(false);
  });
        return () => unsubscribe;
    }, [auth]);
//admin check for admin route
/*   useEffect(() => {
    fetch(`https://immense-escarpment-32991.herokuapp.com/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      setAdmin(data.admin)
    })
  },[user.email]) */
//user check for user route
  const [isUser, setIsUser]=useState(false);
/*   useEffect(() => {
    fetch(`https://immense-escarpment-32991.herokuapp.com/user/${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log(data, 'from db');
      setIsUser(data.user)
    })
  },[user.email]) */

   //log out
  const logout=(history) => {
history.push('/');
      signOut(auth).then(() => {

  // Sign-out successful.
    }).catch((error) => {
  setAuthError(error.message)
  // An error happened.
}).finally(()=>  setIsLoading(false));;
  }
   //log out for register user again login
  const logout2=() => {
      signOut(auth).then(() => {
  // Sign-out successful.
    }).catch((error) => {
  setAuthError(error.message)
  // An error happened.
}).finally(()=>  setIsLoading(false));;
  }

  //save user function
    const saveUser=(email, displayName, method) => {
        const role='user';
        const user = { email, displayName, role };
        fetch('https://immense-escarpment-32991.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
  }
  // console.log(isUser);
    return {
      user,
      admin,
      isLoading,
      setIsLoading,
      isUser,
      signInWithGoogle,
      registerUser,
      loginUser,
      authError,
      checkAdmin, setCheckAdmin,allCourses,
        logout
    }

};

export default useFirebase;