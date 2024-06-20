const testimonial = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GEt", "https://api.npoint.io/fe17e2cd5722e9a4bfc2", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("fail load data");
    }
  };
  xhr.onerror = function () {
    reject("404 Not Found");
  };

  xhr.send();
});

async function allTestimonial() {
  try {
    const response = await testimonial;
    let testimonialHtml = ``;
    response.map((item) => {
      testimonialHtml += `
      <div class="card col-md-4 mx-auto p-3 mb-5" style="width: 25rem">
          <img src="${item.image}" alt="" class="card-img rounded" />
          <div class="card-body">
            <div class="card-text">
              <p class="caption">${item.content}</p>
            </div>
            <div class="card-title text-end">
              <p class="author fw-bold">${item.author}</p>
              <p class="fw-bold">${item.rating} <i class="fa-solid fa-star"></i></p>
            </div>
          </div>
        </div>`;
    });
    document.querySelector("#testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}

async function filterTestimonials(rating) {
  try {
    const response = await testimonial;
    let testimonialHtml = ``;
    const dataFilter = response.filter((item) => item.rating === rating);
    if (dataFilter.length === 0) {
      testimonialHtml += `<h1 class="text-center"> Data did not found!</h1>`;
    } else {
      dataFilter.forEach((item) => {
        testimonialHtml += `
        <div class="card col-md-3 mx-auto p-3 mb-5" style="width: 25rem">
          <img src="${item.image}" alt="" class="card-img rounded" />
          <div class="card-body">
            <div class="card-text">
              <p class="caption">${item.content}</p>
            </div>
            <div class="card-title text-end">
              <p class="author fw-bold">${item.author}</p>
              <p class="fw-bold">${item.rating} <i class="fa-solid fa-star"></i></p>
            </div>
          </div>
        </div>`;
      });
    }
    document.querySelector("#testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}
