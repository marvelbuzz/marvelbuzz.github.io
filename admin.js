
function login(){
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    if(email==="admin@gmail.com" && pass==="1234"){
        document.getElementById("uploadSection").style.display="block";
        alert("Login Success");
    } else {
        alert("Wrong Credentials");
    }
}
