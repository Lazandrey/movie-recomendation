import casual from "casual";

const variants = ["ROCK", "PAPER", "SCISSORS"];

const getRundomVariant = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

const isRPSGame1stWin = (bet1, bet2) => {
  if ((bet1 === "PAPER") & (bet2 === "ROCK")) {
    return true;
  } else {
    if ((bet1 === "ROCK") & (bet2 === "SCISSORS")) {
      return true;
    } else {
      if ((bet1 === "SCISSORS") & (bet2 === "PAPER")) {
        return true;
      } else {
        return false;
      }
    }
  }
};

const RPSgame = (bet1, bet2) => {
  if (bet1 == bet2) {
    return "draw";
  }
  if (isRPSGame1stWin(bet1, bet2)) {
    return "You win";
  } else {
    return "AI win";
  }
};

const myBet = variants[getRundomVariant(0, 2)];
const AIBet = variants[getRundomVariant(0, 2)];
console.log("My bet: ", myBet);
console.log("AI bet: ", AIBet);

console.log(RPSgame(myBet, AIBet));

const junks = casual.array_of_words(getRundomVariant(20, 30));

junks[getRundomVariant(0, junks.length)] = "needle";
console.log(junks);
const findNeedle = (junks) => {
  const index = junks.findIndex((junk) => junk === "needle");
  if (index >= 0) {
    return `found the needle at position ${index}`;
  } else {
    return `needle not found`;
  }
};

console.log(findNeedle(junks));
