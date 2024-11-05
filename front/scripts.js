import { buildRecomendations } from "./src/builders/buildRecomendations.js";
import { btnUpdateListener } from "./src/listeners/btnUpdateListener.js";

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

btnInsert.addEventListener("click", async () => {
  const result = await fetch("http://localhost:3000/insertRecomentation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
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
});

btnDeleteAll.addEventListener("click", async () => {
  const result = await fetch("http://localhost:3000/deleteAllRecommendations", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  insertMessage.innerText = data.response;
});
btnGetAll.addEventListener("click", async () => {
  const result = await fetch("http://localhost:3000/getAllRecommendations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  insertMessage.innerText = data.response;

  buildRecomendations(data.recommendations);
});
btnGetAllByImdb.addEventListener("click", async () => {
  const result = await fetch(
    "http://localhost:3000/getAllRecommendationsByImdb",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();
  insertMessage.innerText = data.response;
  buildRecomendations(data.recommendations);
});

btnBestByImdb.addEventListener("click", async () => {
  const result = await fetch(
    "http://localhost:3000/getBestRecommendationByImdb",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();
  insertMessage.innerText = data.response;
  buildRecomendations(data.recommendations);
});
btnGetMoreThan.addEventListener("click", async () => {
  const result = await fetch(
    `http://localhost:3000/getMoviesHigherThan/${imdb.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();
  insertMessage.innerText = data.response;
  buildRecomendations(data.recommendations);
});
