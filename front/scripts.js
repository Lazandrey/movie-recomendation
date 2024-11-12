import { buildRecomendations } from "./src/builders.js";
import {
  btnInsertListener,
  btnDeleteAllListener,
  btnGetAllListener,
  btnGetAllByImdbListener,
  btnBestByImdbListener,
  btnGetMoreThanListener,
} from "./src/listeners.js";

const btnInsert = document.getElementById("btn-insert");
const btnGetAll = document.getElementById("btn-get-all");
const btnGetAllByImdb = document.getElementById("btn-get-all-by-imdb");
const btnDeleteAll = document.getElementById("btn-delete-all");
const btnBestByImdb = document.getElementById("btn-best-by-imdb");
const btnGetMoreThan = document.getElementById("btn-get-more-than");

btnInsert.addEventListener("click", btnInsertListener);
btnDeleteAll.addEventListener("click", btnDeleteAllListener);
btnGetAll.addEventListener("click", btnGetAllListener);
btnGetAllByImdb.addEventListener("click", btnGetAllByImdbListener);
btnBestByImdb.addEventListener("click", btnBestByImdbListener);
btnGetMoreThan.addEventListener("click", btnGetMoreThanListener);

const createNumArray = (a, b) => {
  if ((typeof a !== "number") | (typeof b !== "number") | (b <= a)) {
    console.log("invalid  paramenetrs");
    return;
  }
  const numArray = Array.from({ length: b - a + 1 }, (v, i) => i + a);
  return numArray;
};

console.log(createNumArray(5, 10));
