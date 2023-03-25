const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//hilangin menu klik sembarang//
const menu = document.querySelector("#menu");

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Fungsi Regis/Login

// Tanda ?? disebut Null Coalescing. Jadi jika value di kiri == null atau undefined maka value di kanan akan dipakai
const email = document.querySelector('input[name="email"]') ?? "";
const pass = document.querySelector("#password") ?? "";

const checkIfEmailExist = (users, email) => {
  return users.some((cc) => cc.email === email);
};

const regisSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const name = document.querySelector('input[name="name"]');
  const confPass = document.querySelector("#confirm-password");

  if (pass.value !== confPass.value) {
    alert("Password dan Confirm Password Tidak Sama");
    return;
  }

  let user = JSON.parse(localStorage.getItem("user") ?? "[]");

  if (checkIfEmailExist(user, email.value)) {
    alert("Email Udah Dipakai");
    return;
  }

  const newUser = {
    name: name.value,
    email: email.value,
    password: pass.value,
  };

  // Ini sama aja kayak push, namanya spread operator
  user = [...user, newUser];

  alert("Berhasil Register");

  // Set List Users Baru
  localStorage.setItem("user", JSON.stringify(user));

  // Set User yang Login
  localStorage.setItem("userLogin", JSON.stringify(newUser));

  document.forms["register"].submit();
};

const loginSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const user = JSON.parse(localStorage.getItem("user"));

  // Jika data kosong, otomatis gak bisa login
  if (!user) {
    alert("Username dan Password Tidak Cocok");
    return;
  }

  const index = user.findIndex(
    (cc) => cc.email === email.value && cc.password === pass.value
  );

  if (index === -1) {
    alert("Username dan Password Tidak Cocok");
    return;
  }

  localStorage.setItem("userLogin", JSON.stringify(user[index]));

  alert("Berhasil Login");

  document.forms["login"].submit();
};

const logout = (e) => {
  e.preventDefault();
  e.stopPropagation();

  localStorage.removeItem("userLogin");

  alert("Berhasil Logout");

  document.forms["logout"].submit();
};

// Reservasi

const reserved = (e) => {
  e.preventDefault();
  e.stopPropagation();

  let datas = JSON.parse(sessionStorage.getItem('reserved') ?? '[]');

  let fileDone = false;
  let data = {};

  const name = document.querySelector('input[name="field1"');
  const address = document.querySelector('textarea[name="field2"');
  const email = document.querySelector('input[name="field3"');
  const noHp = document.querySelector('input[name="field4"');

  const rooms = document.querySelector('select[name="room"]');
  const selectedMenuEls = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  const selectedMenus = Array.from(selectedMenuEls).map((el) => el.value);

  const payment = document.querySelector('input[name="field6"]:checked');

  const file = document.querySelector('input[name="field7"]').files[0];
  const reader = new FileReader();

  data = {
    ...data,
    name: name.value,
    address: address.value,
    email: email.value,
    noHp: noHp.value,
    room: rooms.value,
    menus: selectedMenus,
    payment: payment.value,
  };

  reader.addEventListener("load", (e) => {
    const image = document.createElement("img");

    data = { ...data, image: e.target.result };

    datas = [...datas, data];

    sessionStorage.setItem('reserved', JSON.stringify(datas));

    alert('Berhasil Tambah Reserved')

    document.forms['reserved-form'].submit();
  });

  if (file) {
    reader.readAsDataURL(file);
  } else {

    alert('Berhasil Tambah Reserved')

    sessionStorage.setItem('reserved', JSON.stringify([...datas, data]));

    document.forms['reserved-form'].submit();
  }


  console.log(data);
};
