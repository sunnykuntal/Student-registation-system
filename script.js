  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // jis row ko edit kr rhe h use yaha store krenge
let rowBeingEdited = null;




///////////////////////////////////////////////////////////////////////////////////////////////////
//  REGISTER and Update student here
function registerStudent() {


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // form se values le rhe h 
  const name     = document.getElementById("fullname").value.trim();
  const dob      = document.getElementById("dob").value.trim();
  const email    = document.getElementById("email").value.trim();
  const roll     = document.getElementById("roll").value.trim();
  const phone    = document.getElementById("phone").value.trim();
  const studentid= document.getElementById("studentid").value.trim();
  const course   = document.getElementById("course").value.trim();
  const sclass   = document.getElementById("className").value.trim();  
  const transport= document.getElementById("transport").value.trim();
  const idmark   = document.getElementById("idmark").value.trim();
  const gender   = document.getElementById("gender").value;


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 1) empty check
  if (!name || !dob || !email || !roll || !phone || !studentid || !course ||
      !sclass || !transport || !idmark || !gender) {
    alert("Please fill all fields!");
    return;
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 2) name only letters
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert("Name me sirf letters use kro!");
    return;
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 3) phone exactly 10 digits
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Phone number 10 digits ka hona chahiye!");
    return;
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 4) email basic check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Email valid nahi h!");
    return;
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 5) roll and student id numbers only
  if (!/^[0-9]+$/.test(roll) || !/^[0-9]+$/.test(studentid)) {
    alert("Roll no & Student ID me sirf numbers!");
    return;
  }

  const tableBody = document.getElementById("tableBody");


///////////////////////////////////////////////////////////////////////////////////////////////////
  //   update detail
  if (rowBeingEdited !== null) {
    const cells = rowBeingEdited.children;
    cells[1].innerText = name;
    cells[2].innerText = studentid;
    cells[3].innerText = email;
    cells[4].innerText = phone;
    cells[5].innerText = sclass;
    cells[6].innerText = course;

    rowBeingEdited = null;
    document.querySelector(".Registrater").innerText = "Register";

    saveToLocalStorage();
    updateSerialNumbers();
    alert("Student updated!");
    document.getElementById("regForm").reset();
    return;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //   adding here
  const newRow = `
    <tr>
      <td class="srno"></td>
      <td>${name}</td>
      <td>${studentid}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${sclass}</td>
      <td>${course}</td>
      <td>
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
      </td>
    </tr>
  `;

  tableBody.innerHTML += newRow;

  updateSerialNumbers();
  updateStudentCount();
  saveToLocalStorage();
  document.getElementById("regForm").reset();
  alert("Student added!");
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//  edit row  option
function editRow(btn) {
  rowBeingEdited = btn.parentElement.parentElement;
  const cells = rowBeingEdited.children;

  document.getElementById("fullname").value   = cells[1].innerText;
  document.getElementById("studentid").value  = cells[2].innerText;
  document.getElementById("email").value      = cells[3].innerText;
  document.getElementById("phone").value      = cells[4].innerText;
  document.getElementById("className").value  = cells[5].innerText;
  document.getElementById("course").value     = cells[6].innerText;

  document.querySelector(".Registrater").innerText = "Update";
}


///////////////////////////////////////////////////////////////////////////////////////////////////
// delete row option
function deleteRow(btn) {
  btn.parentElement.parentElement.remove();
  updateSerialNumbers();
  updateStudentCount();
  saveToLocalStorage();
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//   serial number 
function updateSerialNumbers() {
  const rows = document.querySelectorAll("#tableBody tr");
  let num = 1;
  rows.forEach(row => {
    row.querySelector(".srno").innerText = num++;
  });
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//   Totel student  count
function updateStudentCount() {
  const total = document.querySelectorAll("#tableBody tr").length;
  document.getElementById("studentCount").innerText = total;
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//  searching student
function searchStudent() {
  const text = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#tableBody tr");

  rows.forEach(row => {
    const rowText = row.innerText.toLowerCase();
    row.style.display = rowText.includes(text) ? "" : "none";
  });
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//  data save to local storage
function saveToLocalStorage() {
  const rows = document.querySelectorAll("#tableBody tr");
  const data = [];

  rows.forEach(row => {
    const c = row.children;
    data.push({
      name:  c[1].innerText,
      id:    c[2].innerText,
      email: c[3].innerText,
      phone: c[4].innerText,
      class: c[5].innerText,
      course:c[6].innerText
    });
  });

  localStorage.setItem("students", JSON.stringify(data));
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//  data load form local storage
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("students")) || [];
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach(s => {
    const row = `
      <tr>
        <td class="srno"></td>
        <td>${s.name}</td>
        <td>${s.id}</td>
        <td>${s.email}</td>
        <td>${s.phone}</td>
        <td>${s.class}</td>
        <td>${s.course}</td>
        <td>
          <button onclick="editRow(this)">Edit</button>
          <button onclick="deleteRow(this)">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  updateSerialNumbers();
  updateStudentCount();
}

//  after page load  old data will show here 
loadFromLocalStorage();

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////




//             SANI 



 ///////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////