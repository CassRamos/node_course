function a() {
  console.log("Call a()");
}

function b() {
  console.log("Call b()");
}
function c() {
  console.log("Call c()");
  a();
  b();
}

c()