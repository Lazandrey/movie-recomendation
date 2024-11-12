import { editRecommendation } from "./listeners.js";

const recomendationsWrapper = document.querySelector(".recomendation-wrapper");
export const buildRecomendations = (recomendations) => {
  recomendationsWrapper.innerHTML = "";
  recomendations.forEach((recomendation) => {
    const recomendationCard = document.createElement("div");
    recomendationCard.classList.add("recomendation-card");
    const title = document.createElement("h3");
    title.innerText = `Title: ${recomendation.title}`;
    const rating = document.createElement("p");
    rating.innerText = `Rating: ${recomendation.rating}`;
    const description = document.createElement("p");
    description.innerText = `Description: ${recomendation.description}`;
    const imdbLink = document.createElement("a");
    imdbLink.innerText = `IMDB Link: ${recomendation.imdbLink}`;
    imdbLink.href = recomendation.imdbLink;
    recomendationCard.append(title, rating, description, imdbLink);
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", async () => {
      editRecommendation(recomendation.id);
    });
    recomendationCard.append(editButton);
    recomendationsWrapper.append(recomendationCard);
  });
};
