import { greeter } from './greeter';

var element = document.createElement('div');
element.innerHTML = 'Welcome to webpack demo!';
document.body.appendChild(element);

greeter("Hello this is a greeting", "red");
greeter("This is another greeting", "lightblue");
