function Register() {
    const name=document.getElementById("name").value.trim();
    const Email=document.getElementById("email").value.trim().toLowerCase();
    const pwd=document.getElementById("password").value.trim();
    const phone=document.getElementById("number").value.trim();
    if (name==="" || Email==="" || pwd==="" || phone==="" ) {
        alert("All field Required")
    }
    let users=JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user=>user.Email.toLowerCase()===Email)) {
        alert("This email is already registered.Please login")
    }
    const superCharRegex=/[@#$%^&*]/;
     if (!superCharRegex.test(pwd)) {
        alert("Password must include special character");
    }
    else if (!Email.includes ("@") ||!Email.includes (".")) {
        alert("Email format not accepted");
    }
     else if (pwd.length<8) {
        alert("password must not be less than 8 characters")
    }
    else{
        const newUser={name:name,Email:Email,password:pwd,number:phone };
        users.push(newUser);
        localStorage.setItem("users",JSON.stringify(users));
        alert("Account created");
        showLogin();
    }
}
function Login() {
    const Email=document.getElementById("email").value.trim().toLowerCase();
    const pwd=document.getElementById("password").value.trim();

     let users=JSON.parse(localStorage.getItem("users"))||[];

        let found=users.find(user=>user.Email.toLowerCase()===Email && user.password===pwd);
        if (found) {
            localStorage.setItem("currentUser",JSON.stringify(found));
            showDashboard(found);
        }
        else{
            alert("Email or password is incorrect");
        }
}
function showDashboard(user) {
    document.getElementById("registerDiv").style.display="none";
    document.getElementById("loginDiv").style.display="none";
    document.getElementById("dashboardDiv").style.display="block";
    document.getElementById("welcome").innerHTML="Welcome " + user.name;
    document.getElementById("userEmail").innerHTML=user.Email; 
}
function showLogin() {
    document.getElementById("registerDiv").style.display="none";
    document.getElementById("loginDiv").style.display="block";
    document.getElementById("dashboardDiv").style.direction="none";
}
function showRegister() {
    document.getElementById("registerDiv").style.display="block";
    document.getElementById("loginDiv").style.display="none";
    document.getElementById("dashboardDiv").style.display="none";
}
function logout() {
    document.getElementById("dashboardDiv").style.display="none";
    document.getElementById("loginDiv").style.display="block";
    localStorage.removeItem("currentUser");
    showLogin();
}
const current=localStorage.getItem("currentUser");
if (current) {
    showDashboard(JSON.parse(current));
}