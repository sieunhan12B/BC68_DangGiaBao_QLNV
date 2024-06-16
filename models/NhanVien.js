class NhanVien {
  constructor() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucvu = "";
    this.gioLam = "";
  }

  tinhTongLuong = function () {
    if (this.chucvu == "Sếp") return this.luongCB * 3;
    else if (this.chucvu == "Trưởng phòng") return this.luongCB * 2;
    else {
      return this.luongCB * 1;
    }
  };

  xepLoai = function () {
    if (this.gioLam * 1 >= 192) return "Xuất sắc";
    else if (this.gioLam * 1 >= 176) return "Giỏi";
    else if (this.gioLam * 1 >= 160) return "Khá";
    else return "Trung bình";
  };
}
