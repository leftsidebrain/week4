function hitungDurasi() {
  let inputStartDate = document.getElementById("inputStartDate").value;
  let inputEndDate = document.getElementById("inputEndDate").value;
  let startDate = new Date(inputStartDate);
  let endDate = new Date(inputEndDate);

  // Menghitung perbedaan waktu dalam milidetik
  let difference = endDate.getTime() - startDate.getTime();

  // Mengonversi perbedaan waktu ke dalam hari
  let daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

  return `${daysDifference} hari`;
}
let dataBlog = [];
function handleInput(event) {
  let inputName = document.getElementById("inputName").value;

  let inputDescription = document.getElementById("inputDescription").value;
  let inputNodeJs = document.getElementById("inputNodeJs");
  let inputReactJs = document.getElementById("inputReactJs");
  let inputNextJs = document.getElementById("inputNextJs");
  let inputTypesricpt = document.getElementById("inputTypescript");
  let inputFile = document.getElementById("inputFile").files;
  let inputStartDate = document.getElementById("inputStartDate").value;
  let inputEndDate = document.getElementById("inputEndDate").value;

  event.preventDefault();

  if (!inputName) {
    alert("nama harus diisi");
  } else if (!inputDescription) {
    alert("Deskripsi harus diisi");
  } else if (!inputStartDate) {
    alert("Tanggal mulai harus diisi");
  } else if (!inputEndDate) {
    alert("Deskripsi harus diisi");
  } else if (inputFile == "") {
    alert("file harus diisi");
  } else {
  }
  inputFile = URL.createObjectURL(inputFile[0]);

  const node = inputNodeJs.checked ? true : false;
  const react = inputReactJs.checked ? true : false;
  const next = inputNextJs.checked ? true : false;
  const typescript = inputTypesricpt.checked ? true : false;

  let blog = {
    nama: inputName,
    // startDate: inputStartDate,
    // endDate: inputEndDate,
    desc: inputDescription,
    file: inputFile,
    node: node,
    react: react,
    next: next,
    typescript: typescript,
    postAt: new Date(),
  };
  dataBlog.push(blog);
  console.log("data yng dikirim", dataBlog, hitungDurasi());
  insertBlog();
}

function insertBlog() {
  document.getElementById("content").innerHTML = "";
  for (let index = 0; index < dataBlog.length; index++) {
    document.getElementById("content").innerHTML += `
    <div class="col-sm-4 mb-5">
    <div class="card p-3">
      <img src="${dataBlog[index].file}" class="card-img rounded" alt="..." />
      <div class="card-body">
        <h5 class="card-title"><a href="blog-detail.html" target="_blank">${dataBlog[index].nama} </a> | Durasi: ${hitungDurasi()}</h5>
        <p class="card-text">${dataBlog[index].desc}</p>
        <div class="mb-3">
        ${dataBlog[index].node ? `<i class="fa-brands fa-node-js"></i>` : ""}
        ${dataBlog[index].react ? `<i class="fa-brands fa-react"></i>` : ""}
        ${dataBlog[index].next ? `<i class="fa-brands fa-jsfiddle"></i>` : ""}
        ${dataBlog[index].typescript ? `<i class="fa-solid fa-scroll"></i>` : ""}
        </div>
        <div class="row justify-content-between">
          <a href="#" class="btn btn-primary btn-sm col-sm-5">Edit post</a>
          <a href="#" class="btn btn-danger btn-sm col-sm-5">Delete post</a>
        </div>
      </div>
    </div>
  </div>
        `;
  }
}

setInterval(function () {
  insertBlog();
}, 1000);

function getFullTime(tanggal) {
  const monthList = ["January", "Febuari", "Maret", "Apr", "Meiiii", "Juni", "Juli", "Augustus", "Sep", "Okt", "Nov", "Desember"];

  const date = tanggal.getDate();
  const month = tanggal.getMonth();
  const year = tanggal.getFullYear();
  let hours = tanggal.getHours();
  let minutes = tanggal.getMinutes();

  if (hours <= 9) {
    hours = "0" + hours;
  }

  // ketika ditampilkan yang tadinya 8:45, menjadi 08:45

  // jam 10:00
  // jam 07:00
  // jam 06:00

  if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${monthList[month]} ${year}`;
}

function getDistanceTime(time) {
  const timeNow = new Date().getTime(); //ini ngambil waktu saat ini
  const timePosted = time;

  const distance = timeNow - timePosted; //ms atau miliseconds

  // math :
  // floor -> ini akan membulatkan angka kebawah : 8.9 -> 8
  // round -> dibulatkan ke yg terdekat: 9.7 -> 9 | 8.2 akan jadi 8
  // ceil -> dibulatkan ke atas : 8.7 -> 9

  const distanceSeconds = Math.floor(distance / 1000); // 1000 melambangkan setiap detik, karna 1 detika 1000 ms
  const distanceMinutes = Math.floor(distance / 1000 / 60); // 60 melambangkan 1 menit
  const distanceHours = Math.floor(distance / 1000 / 60 / 60); // 60 melambangkan 1 jam
  const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24); // 24 melambangkan 1 hari yaitu 24 jam

  console.log(distanceSeconds);
  console.log(distanceMinutes);
  console.log(distanceHours);
  console.log(distanceDay);

  if (distanceDay > 0) {
    return `${distanceDay} Day Ago`;
  } else if (distanceHours > 0) {
    return `${distanceHours} Hours Ago`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} Minutes Ago`;
  } else if (distanceSeconds > 0) {
    return `${distanceSeconds} Seconds Ago`;
  }
}
