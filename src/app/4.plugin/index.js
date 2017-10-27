import _ from 'lodash';

const component = () => {
  var element = document.createElement('div');

  var rewire = "Test";

  if(rewire == true) {
    console.log("Hjsfhs")
  }

  // Lodash, now imported by this script
  element.innerHTML = _.join([
    'Hello', 
    'webpack', 
    'gskgs'], 
  ' ');

  return element;
}

document.body.appendChild(component());