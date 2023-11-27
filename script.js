
if (
  window.location.pathname == "/profile.html" &&
  !localStorage.getItem("accessToken")
) {
  window.location.href = "index.html";
}
// if user is trying to acces the signup page but the user is logged in
if (
  window.location.pathname == "/index.html" &&
  localStorage.getItem("accessToken")
) {
  window.location.href = "profile.html";
}


if (window.location.pathname == "/index.html") {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let cpassword = document.getElementById("cpassword");

    let array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    let accessToken = Array.from(array, (b) =>
      b.toString(16).padStart(2, "0")
    ).join("");
     
    if(password.value != cpassword.value){
      document.getElementById("login-message").innerText = `Oops Wrong Password!`;
      return;
    }

    let user1 = {
      username: username.value,
      email: email.value,
      password: password.value,
      cpassword: cpassword.value,
      accessToken: accessToken,
    };

    localStorage.setItem("user1", JSON.stringify(user1));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));

    setTimeout(() => {
      window.location.href = "/profile.html";
    }, 1000);
  });
}else if(window.location.pathname == "/profile.html"){
  let user = JSON.parse(localStorage.getItem("user1"));
  let profileText = `
     <p>Full Name:${user.username}</p>
     <p>Email:${user.email}</p>
     <p>Token:${user.accessToken}</p>
     <p>Password:${user.password}</p>
  `
  document.getElementById("profile").innerHTML = profileText;

  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click",()=>{
    localStorage.clear();
    document.getElementById("message").innerText = "Logging Out";

    setTimeout(()=>{
      window.location.href = "/index.html";
    },2000);
  })
}
