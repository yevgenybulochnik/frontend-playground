export function greeter(greeting, color) {
  console.log('this is what should be added to the page '+greeting);
  var element = document.createElement('div');
  element.innerHTML = greeting;
  element.setAttribute("style","background-color: "+color);
  document.body.appendChild(element);
}
