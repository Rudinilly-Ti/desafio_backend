import App from './App';
require("dotenv").config({
  path:process.env.NODE_ENV == 'test' ? ".env.test" : ".env"
});


App.listen(process.env.PORT || 3333, () => {
  console.log('Server startet!');
});


