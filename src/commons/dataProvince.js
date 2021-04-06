const data = [
  { title: "Hai Duong", data: [20.94099, 106.33302] },
  { title: "Da Nang", data: [16.06778, 108.22083] },
  { title: "HaNoi", data: [21.0245, 105.84117] },
  { title: "Ho Chi Minh City", data: [10.82302, 106.62965] },
  { title: "Quang Nam", data: [16.06, 108.25] },
  { title: "Khanh Hoa", data: [12.25, 109.1833] },
  { title: "Ba Ria - Vung Tau", data: [10.34599, 107.08426] },
  { title: "Quang Ninh", data: [20.95, 107.0833] },
  { title: "Bac Lieu", data: [9.2833, 105.7167] },
  { title: "Thai Binh", data: [20.4461, 106.3422] },
  { title: "Ninh Binh", data: [20.25809, 105.97965] },
  { title: "Vinh Phuc", data: [21.30891, 105.60489] },
  { title: "Thanh Hoa", data: [19.8, 105.76667] },
  { title: "Haiphong", data: [20.86481, 106.68345] },
  { title: "Nha Trang", data: [12.24507, 109.19432] },
  { title: "Bia Hoa", data: [10.94469, 106.82432] },
  { title: "Vinh", data: [18.67337, 105.69232] },
  { title: "La Gi", data: [10.65993, 107.77206] },
  { title: "Buôn Ma Thuột", data: [12.66747, 108.03775] },
  { title: "Cam Ranh", data: [11.92144, 109.15913] },
  { title: "Huế", data: [16.4619, 107.59546] },
  { title: "Cẩm Phả Mines", data: [21.01667, 107.3] },
  { title: "Thái Nguyên", data: [21.59422, 105.84817] },
  { title: "Kan Tho", data: [10.03711, 105.78825] },
  { title: "Gia Lai", data: [13.98333, 108] },
  { title: "Rach Gia", data: [10.01245, 105.08091] },
  { title: "Thanh Hóa", data: [19.8, 105.76667] },
  { title: "Thị Xã Phú Mỹ", data: [10.56815, 107.12999] },
  { title: "Qui Nhon", data: [13.77648, 109.22367] },
];

const findProvince = (province) => {
  try {
    var tempData = [...data];
    var result = tempData.filter((p) => !p.title.localeCompare(province));
    return result.length === 0 ? null : result;
  } catch (error) {
    return null;
  }
};

module.exports = findProvince;
