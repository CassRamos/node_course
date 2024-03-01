const x = 999;
const y = "Some text";
const z = [9, 9];

console.log(x, y, z);

console.count(`x value is ${x}, this method is called `);
console.count(`x value is ${x}, this method is called `);
console.count(`x value is ${x}, this method is called `);
console.count(`x value is ${x}, this method is called `);

console.log(`Other style of log %s`, y);

setTimeout(() => {
  console.clear();
}, 30000);
