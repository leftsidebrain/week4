function handleInput() {
  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputNumber = document.getElementById("inputNumber").value;
  const inputSubject = document.getElementById("inputSubject").value;
  const inputMessage = document.getElementById("inputMessage").value;

  if (!inputName) {
    return alert("Nama Harus diisi");
  } else if (!inputNumber) {
    return alert("Number Tidak boleh kosong");
  } else if (!inputEmail) {
    return alert("Email Tidak boleh kosong");
  } else if (!inputSubject) {
    return alert("subjek Tidak boleh kosong");
  } else if (!inputMessage) {
    return alert("Pesan Tidak boleh kosong");
  }

  let a = document.createElement("a");
  a.href = `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessage}`;
  a.click();
}
