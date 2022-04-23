// Generate random number between 20 and 100
const maxNumber = Math.floor(Math.random() * (100 - 20 + 1)) + 20;

for (let i = 1; i <= maxNumber; i++) {
  switch (true) {
    case i % 3 === 0 && i % 5 === 0:
      console.log("FizzBuzz");
      break;
    case i % 3 === 0:
      console.log("Fizz");
      break;
    case i % 5 === 0:
      console.log("Buzz");
      break;
    default:
      console.log(i);
  }
}
