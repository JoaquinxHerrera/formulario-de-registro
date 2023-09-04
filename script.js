const firebaseConfig = {
    apiKey: "AIzaSyCBaTSnx0lr1edgvRZmCZ_s-ef25ztgpF4",
    authDomain: "datos-de-formulario-df5ab.firebaseapp.com",
    projectId: "datos-de-formulario-df5ab",
    storageBucket: "datos-de-formulario-df5ab.appspot.com",
    messagingSenderId: "16264802459",
    appId: "1:16264802459:web:a75522e976409df968963e",
    measurementId: "G-H17TGDLPNT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('form').addEventListener('submit', (event) =>{
    event.preventDefault();


    let nameEntry = document.getElementById('name')
    let nameError = document.getElementById('nameError')

    if(nameEntry.value.trim() === ''){
        nameError.textContent='Please, write your name'
        nameError.classList.add ('errorMessage')
    } else{
        nameError.textContent=''
        nameError.classList.remove ('errorMessage')
    }

    let emailEntry = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailEntry.value)){
        emailError.textContent='Please, write a valid email'
        emailError.classList.add ('errorMessage')
    }else{
        emailError.textContent=''
        emailError.classList.remove ('errorMessage')
    }

    let passwordEntry = document.getElementById('password')
    let passwordError = document.getElementById('passwordError')
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!passwordPattern.test(passwordEntry.value)) {
        passwordError.textContent='Password must contain at least 8 characters, lower and uppercase, and special characters'
        passwordError.classList.add ('errorMessage')
    }else{
        passwordError.textContent=''
        passwordError.classList.remove ('errorMessage')
    }

    if(!nameError.textContent && !emailError.textContent && !passwordError.textContent){
        db.collection("users").add({
            name: nameEntry.value,
            email: emailEntry.value,
            password: passwordEntry.value,
        })
        .then((docRef) => {
            alert('The form was successully sent', docRef.id)
            document.getElementById('form').reset();
        })
        .catch((error) => {
            alert(error);
        });

        
        

    }
})