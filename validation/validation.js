// kiểm tra chuỗi rỗng
function checkEmptyValue(value, errField) {
  if (!value) {
    errField.innerHTML = "Vui lòng nhập dữ liệu";
    return false;
  } else {
    errField.innerHTML = "";
    return true;
  }
}
// kiểm tra độ dài chuỗi
function checkLenghtValue(value, errField, min, max) {
  if (min <= value.length && value.length <= max) {
    errField.innerHTML = "";
    return true;
  } else {
    errField.innerHTML = `Vui lòng nhập dữ liệu từ ${min} đến ${max}`;
    return false;
  }
}

// kiểm tra email
function checkEmaiValue(value, errorField) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexEmail.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  }
}

// kiểm tra định dạng tên
function checkNameValue(value, errorField) {
  let regexName = /^[A-Za-zÀ-ỹà-ỹ\s]+$/;

  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexName.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Tên nhân viên phải là chữ";
    return false;
  }
}

// kiểm tra định dạng password
function checkPassWordValue(value, errorField) {
  let regexPassWord = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/;
  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexPassWord.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML =
      "Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    return false;
  }
}

// kiểm tra định dạng ngày
function checkDateValue(value, errorField) {
  let regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
  //sử dụng chuỗi regex để kiểm tra value
  let isValid = regexDate.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Định dạng mm/dd/yyyy";
    return false;
  }
}

// kiểm tra mức lương 1tr-20tr,dùng luôn cho check giờ làm
function checkLuongCoBan(value, errField, min, max) {
  if (min <= value && value <= max) {
    errField.innerHTML = "";
    return true;
  } else {
    errField.innerHTML = `Vui lòng nhập lương căn bản từ ${min} đến ${max}`;
    return false;
  }
}

//Kiểm tra số giờ làm
function checkGiolam(value, errField, min, max) {
  if (min <= value && value <= max) {
    errField.innerHTML = "";
    return true;
  } else {
    errField.innerHTML = `Vui lòng nhập số giờ làm  từ ${min} đến ${max}`;
    return false;
  }
}
