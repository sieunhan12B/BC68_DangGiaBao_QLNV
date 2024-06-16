let arrNhanVien = [];

// tự động hiển thị dữ liệu,lưu dữ liệu xuống localStorage và reset form
function renderSaveReset() {
  renderArrNhanVien();
  saveLocalStorage();
  document.getElementById("formQLNV").reset();
}

// Lấy dữ liệu nhân viên từ form
function getValueForm() {
  //   console.log("xinchao");

  let arrField = document.querySelectorAll(
    ".modal-body input,.modal-body select"
  );
  //   console.log(arrField);
  let nhanVien = new NhanVien();
  let isValid = true;

  for (let field of arrField) {
    // kiểm tra dữ liệu

    // console.log(field);
    // desturcturing để lấy dữ liệu
    let { value, id } = field;
    // gán phần tử có id là gì đó là giá trị của field
    nhanVien[id] = value;
    let parent = field.parentElement.parentElement;

    let errField = parent.querySelector(".sp-thongbao");

    let check = checkEmptyValue(value, errField);
    isValid &= check;
    if (check && id == "tknv") {
      isValid &= checkLenghtValue(value, errField, 4, 6);
    }
    if (check && id == "email") {
      isValid &= checkEmaiValue(value, errField);
    }
    if (check && id == "name") {
      isValid &= checkNameValue(value, errField);
    }
    if (check && id == "password") {
      if (checkLenghtValue(value, errField, 6, 10)) {
        isValid &= checkPassWordValue(value, errField);
      }
    }
    if (check && id == "datepicker") {
      isValid &= checkDateValue(value, errField);
    }
    if (check && id == "luongCB") {
      isValid &= checkLuongCoBan(value, errField, 1000000, 20000000);
    }
    if (check && id == "gioLam") {
      isValid &= checkGiolam(value, errField, 80, 200);
    }
  }
  if (isValid) {
    return nhanVien;
  }
}

// thêm nhân viên
document.getElementById("form-QLNV").onsubmit = function (event) {
  event.preventDefault();
  let nhanVien = getValueForm();
  if (!nhanVien) {
    return;
  }
  arrNhanVien.push(nhanVien);

  renderSaveReset();
};

//hiển thị lên giao diện
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  // bóc tách dữ liệu =destructuring

  // B1:tạo 1 vòng lặp duyệt qua tất cả sinh viên có tron mảng
  for (let nhanVien of arr) {
    let newArrNhanVien = new NhanVien();
    Object.assign(newArrNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = nhanVien;

    content += `
        <tr>
        <td>${tknv}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${datepicker}</td>
        <td>${chucvu}</td>
        <td>${newArrNhanVien.tinhTongLuong()}</td>
        <td>${newArrNhanVien.xepLoai()}</td>
        <td>
        <button onclick="deleteNhanVien('${tknv}')" class="btn btn-success">Xóa</button>
        <button onclick="getInfoNhanVien('${tknv}')" class="btn btn-danger">Sửa</button>
        
    
        </td>

        </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}
getLocalStorage();
renderArrNhanVien();
// lưu dữ liệu vô localStorage
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}

// lấy dữ liệu từ localStorage
function getLocalStorage(key = "arrNhanVien") {
  let arrLocal = localStorage.getItem(key);
  if (arrLocal) {
    arrNhanVien = JSON.parse(arrLocal);
    // renderArrNhanVien();
  } else {
    arrNhanVien = [];
  }
}

// xóa nhân viên
function deleteNhanVien(msnv) {
  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == msnv;
  });

  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderArrNhanVien();
    saveLocalStorage();
  }
}

// lấy thông tin nhân viên
function getInfoNhanVien(msnv) {
  let nhanVien = arrNhanVien.find((item, index) => {
    return item.tknv == msnv;
  });
  if (nhanVien) {
    let arrField = document.querySelectorAll(
      ".modal-body input,.modal-body select"
    );
    for (let field of arrField) {
      let id = field.id;
      field.value = nhanVien[id];
    }
  }
  document.getElementById("btnThemNV").setAttribute("disabled", "true");

  document.getElementById("tknv").readOnly = true;
}

// cập nhật nhân viên ()
function updateNhanVien() {
  let nhanVien = getValueForm();
  if (!nhanVien) {
    return;
  }
  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == nhanVien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderSaveReset();
    document.getElementById("btnThemNV").setAttribute("disabled", "false");
    document.getElementById("tknv").readOnly = false;
  }
}
document.getElementById("btnCapNhat").onclick = updateNhanVien;

function searchNhanVien(event) {
  let newKeyWord = removeVietnameseTones(
    event.target.value.toLowerCase().trim()
  );
  let arrNhanVienFilter = arrNhanVien.filter((item) => {
    let xepLoai = xepLoaiNV(item.gioLam);
    console.log(xepLoai);
    let newLoaiNhanVien = removeVietnameseTones(xepLoai.toLowerCase().trim());
    return newLoaiNhanVien.includes(newKeyWord);
  });

  renderArrNhanVien(arrNhanVienFilter);
}
document.getElementById("searchName").oninput = searchNhanVien;

function xepLoaiNV(gioLam) {
  if (gioLam * 1 >= 192) return "Xuất sắc";
  else if (gioLam * 1 >= 176) return "Giỏi";
  else if (gioLam * 1 >= 160) return "Khá";
  else return "Trung bình";
}
