import { greeter } from './greeter';
import { Button } from '.button.component';

var element = document.createElement('div');
element.innerHTML = 'Welcome to webpack demo!';
document.body.appendChild(element);

greeter("Hello this is a greeting", "red");
greeter("This is another greeting", "lightblue");
$('body').append('<div> jquery test </div>');

var button_test = new Button('helloworld');
console.log(button_test);
