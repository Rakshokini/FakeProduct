var express = require('express');
var app = express();


var express = require('express');
var app = express();
app.use(express.static('src'));
app.use(express.static('../fakeProduct-contract/build/contracts'));

app.get('/', function (req, res) {
//   res.send('Hello World!');
res.sendFile('./src/index.html', { root: __dirname });
});

  // Routes for webpages
  app.use(express.static(__dirname + '/src'));
  // app.use(express.static(__dirname + '/views/davidshimjs-qrcodejs-04f46c6'));
  
  // Manufacturer Registartion
  app.get('/manufactureCreation', (req, res) => {

      console.log('manufacturer is hitted');
      res.sendFile('./src/manufactureCreation.html', { root: __dirname });
  });
  
  app.get('/app.js',(req,res) =>
  {
    console.log('manufacturer is hitted');
    res.sendFile('./src/js/app.js', { root: __dirname });

  });

  app.get('/truffle-contract.js',(req,res) =>
  {
    console.log('manufacturer is hitted');
    res.sendFile('./src/js/dist/truffle-contract.js', { root: __dirname });

  });

  app.get('/web3',(req,res)=>
  {
    console.log('manufacturer is hitted');
    res.sendFile('./src/js/dist/web3.min.js', { root: __dirname });

  })
  // Retailer creation
  app.get('/retailerCreation', (req, res) => {
      console.log('reatailer is hitted');
      res.sendFile('./src/retailerCreation.html', { root: __dirname });
  });

  // login Retailer
  app.get('/loginUser', (req, res) => {
    console.log('reatailer is logged');
    res.sendFile('./src/loginuser.html', { root: __dirname });
});
  
  // customer Creation
  app.get('/customerCreation', (req, res) => {
      console.log('customer is hitted');
      res.sendFile('./src/customerCreation.html', { root: __dirname });
  });





app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});