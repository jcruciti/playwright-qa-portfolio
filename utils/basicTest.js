require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env'),
});

console.log('USER:', process.env.SAUCE_USER);
console.log('PASSWORD:', process.env.SAUCE_PASSWORD);
