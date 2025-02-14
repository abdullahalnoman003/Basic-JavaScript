function converter(temp) {
    const fer = (temp * 9 / 5) + 32;
    return fer;
}
const final = converter(4);
console.log("Temp = ", final);
