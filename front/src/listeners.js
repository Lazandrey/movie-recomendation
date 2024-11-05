const title = document.getElementById("title");
const rating = document.getElementById("rating");
const description = document.getElementById("description");
const imdbLink = document.getElementById("imdbLink");
const btnInsert = document.getElementById("btn-insert");
const btnUpdate = document.getElementById("btn-update");
const btnGetAll = document.getElementById("btn-get-all");
const btnGetAllByImdb = document.getElementById("btn-get-all-by-imdb");
const btnDeleteAll = document.getElementById("btn-delete-all");
const recomendationsWrapper = document.querySelector(".recomendation-wrapper");
const insertMessage = document.getElementById("insert-message");
const btnBestByImdb = document.getElementById("btn-best-by-imdb");
const btnGetMoreThan = document.getElementById("btn-get-more-than");
const imdb = document.getElementById("imdb");

export const btnUpdateListener = async () => {
  const result = await fetch("http://localhost:3000/updateRecomendation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: id,
      title: title.value,
      rating: rating.value,
      description: description.value,
      imdbLink: imdbLink.value,
    }),
  });
  const data = await result.json();
  insertMessage.innerText = data.response;
  title.value = "";
  rating.value = "";
  description.value = "";
  imdbLink.value = "";
  btnUpdate.style.display = "none";
  btnInsert.style.display = "block";
};

const editRecommendation = async (id) => {
  const result = await fetch(
    `http://localhost:3000/getRecommendationById/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();

  title.value = data.recommendation.title;
  rating.value = data.recommendation.rating;
  description.value = data.recommendation.description;
  imdbLink.value = data.recommendation.imdbLink;

  btnInsert.style.display = "none";
  btnUpdate.style.display = "block";
  btnUpdate.addEventListener("click", async () => {
    btnUpdateListener();
  });
  insertMessage.innerText = data.response;
};
