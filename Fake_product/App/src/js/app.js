App = {
  web3Provider: null,
  contracts: {},
  names: new Array(),
  url: 'http://127.0.0.1:7545',
  chairPerson:null,
  currentAccount:null,
  init: function() {
 
    return App.initWeb3();
  },

initWeb3: function() {
      // Is there is an injected web3 instance?
  if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
  } else {
    // If no injected web3 instance is detected, fallback to the TestRPC
    // App.web3Provider = new Web3.providers.HttpProvider(App.url);
    App.web3Provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/8be35611b7f24f81bbd44f1155c3ba22');
    web3 = new Web3(App.web3Provider);
  }
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(App.web3Provider);

  ethereum.enable();

  App.populateAddress();
  return App.initContract();
},

initContract: function() {
$.getJSON('Fakeproduct2.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var voteArtifact = data;
  App.contracts.vote = TruffleContract(voteArtifact);

  // Set the provider for our contract
  App.contracts.vote.setProvider(App.web3Provider);
  
  return App.bindEvents();
});
$.getJSON('Token.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var voteArtifact = data;
    App.contracts.token = TruffleContract(voteArtifact);
    

    // Set the provider for our contract
    App.contracts.token.setProvider(App.web3Provider);
    
    // return App.bindEvents();
  });

},

bindEvents: function() {
  // $(document).on('click', '#register_manufacture', App.getManufacturerInfo);
  $(document).ready(function(){
    // Get value on button click and show alert
    $("#register_manufacture").click(function(){
        var brand = $("#manu_brand").val();
        var model = $("#manu_model").val();
        var desc = $("#manu_description").val();
        var name = $("#manufacturerName").val();
        var loc = $("#manufacturerLocation").val();
        var price = $("#productPrice").val();
        // var email = $("#manu_email").val();
        // var pwd = $("#manu_password").val();
        // var confirm_pwd = $("#manu_pass").val();
        var code =  $("#manu_code").val();
        // alert(brand+model+ desc);
        App.RegisterManufacturer(code, brand, model, desc, name, loc, 0, price);
    });
});
$(document).ready(function(){
  // Get value on button click and show alert
  $("#register_retailer").click(function(){
    var name = $("#ret_name").val();
    var email = $("#ret_email").val();
    var loc = $("#ret_location").val();
    var pwd = $("#ret_password").val();
    var confirm_pwd = $("#ret_confirm_pass").val();
      // alert(brand+model+ desc);
      App.RegisterRetailer(email, name, loc, pwd, confirm_pwd);
  });
});
$(document).ready(function(){
// Get value on button click and show alert
$("#login_user").click(function(){
  var name = $("#user_name").val();
  var pwd = $("#login_password").val();
    // alert(brand+model+ desc);
    App.LoginUser(name,pwd);
});
});
$(document).ready(function(){
// Get value on button click and show alert
$("#register_customer").click(function(){
    var name = $("#cust_name").val();
    var email = $("#cust_email").val();
    var pwd = $("#cust_password").val();
    var confirm_pwd = $("#cust_pass").val();
    // alert(brand+model+ desc);
    App.RegisterCustomer(email, name);
});
});
$(document).ready(function(){
// Get value on button click and show alert
$("#sell_product").click(function(){
  var product_code = $("#product_code").val();
  var new_price = $("#new_price").val();
    // alert(brand+model+ desc);
    App.SellProduct(product_code,new_price);
});
});
$(document).ready(function(){
  // Get value on button click and show alert
  $("#manu_creation").click(function(){
      App.CheckManufacturer();
  });
  });
$(document).ready(function(){
  // Get value on button click and show alert
  $("#nav-acct-tab").click(function(){
      App.CheckAccBalance();
  });
  });
$(document).ready(function(){
  // Get value on button click and show alert
  $("#m_nav-acct-tab").click(function(){
      App.CheckManuAccBalance();
  });
  });
$(document).ready(function(){
  // Get value on button click and show alert
  $("#get_product").click(function(){
      var product_code = $("#detail_product_code").val();
      App.GetManuProduct(product_code);
  });
  });
},


populateAddress : function(){
  new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts((err, accounts) => {
    web3.eth.defaultAccount=web3.eth.accounts[0]
    
  });
},

CheckManufacturer: function(){
  var voteInstance;
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.checkManufacturer({from: account});
  }).then(function(result, err){
    console.log('res manufacturer',result)
      if(result === true){
        window.location.href = "http://localhost:3000/manufactureCreation.html";
      } else {
        jQuery('#owner_failure').css('display','block');
      }   
  })
  })
},
RegisterManufacturer: function(code, brand, model, desc, name, loc, status, price){
  var voteInstance;
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
      // return voteInstance.checkManufacturer({from: account});
    return voteInstance.createManufacturer(code, brand, model, desc, name, loc, status, price, {from: account});
  }).then(function(result, err){
    console.log('res manufacturer',result)
      if(result){
          if(result.receipt.status === true)
          jQuery('#manu_success').css('display','block');
      } else {
          jQuery('#manu_failure').css('display','block');
      }   
  })
  })
},


RegisterRetailer: function(email, name, loc, pwd, confirm_pwd){
  var voteInstance;
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.CreateRetailer(email, name, loc, pwd, {from: account});
  }).then(function(result, err){
    console.log('res',result)
    if(result){
       
      if(result.receipt.status === true)
      jQuery('#ret_success').css('display','block');
      else
      jQuery('#ret_failure').css('display','block');
  } else {
      jQuery('#ret_failure').css('display','block');
  }  
  })
  })
  // const fs = require('fs');
  // var data = fs.readFileSync('Retailer.json');
  // var myObject= JSON.parse(data);
  // console.log('myObject>>>>', myObject);
//   let retailer_data = {
//     "email": email,
//     "pwd": pwd,
//     "confirm_pwd": confirm_pwd
// } 
// myObject.push(retailer_data);
// var newData = JSON.stringify(myObject);
// fs.writeFile('Retailer.json', newData, err => {
//     // error checking
//     if(err) throw err;
    
//     console.log("New data added");
// });

},

GetRetailer: function(){
  var voteInstance;
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.Getretailer('rakso@mail.com', {from: account});
  }).then(function(result, err){
    // console.log('res',Object.entries(result)?.length > 0)
      if(result){
     
          if(Object.entries(result)?.length > 0)
          alert(" registrated information is received")
          else
          alert( "  registrated information is received due to revert")
      } else {
          alert(" registrated failed")
      }   
  })
  })
},

LoginUser: function(name,pwd){
  var voteInstance;
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.loginuser(name, pwd, {from: account});
  }).then(function(result, err){
    console.log('res',result)
    if(result === true){
      jQuery('#login_page').css('display','none');
      jQuery('#dashboard_page').css('display','block');
      // window.location.href = "http://localhost:3000/dashboard.html";
      App.GetCodes();
  } else {
      jQuery('#dashboard_page').css('display','none');
      jQuery('#login_failure').css('display','block');
  }  
  })
  })
},
GetManuProduct: function(code){
  var voteInstance;
  var price = '';
  var status = '';
  var status_word = '';
  var product_design = '';
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getproductdetails(code, {from: account});
  }).then(function(result, err){
    console.log('res',result)
    if(result){
      var items = Object.values(result);
      price = Object.values((Object.values(result[3]))[1])[0];
      status = Object.values((Object.values(result[2]))[1])[0];
      if(status == 0) {
        status_word = 'product created';
      } else if(status == 1) {
        status_word = 'product bought';
      } else if(status == 2) {
        status_word = 'product sold';
      }
      console.log('items>>>', items);
      product_design += `<div style="display: block;transition: 0.3s;box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);margin-top: 70px;padding: 45px; margin-bottom: 30px">
                  <div style="margin-left: 20px;margin-top: 10px;font-size:18px">
                    <p><strong>Brand Name:</strong> ${items[0]}
                    <span style="float:right;"><strong>Model Name:</strong> ${items[1]}</span></p>
                  </div>
                  <div style="margin-left: 20px;margin-top: 10px;font-size:19px">
                    <p><strong>Status:</strong> ${status_word}
                    <span style="float:right;"><strong>Price:</strong> ${price}</span></p>
                  </div>
                  <div style="margin-left: 20px;margin-top: 10px;font-size:19px">
                    <p><strong>Retailer Name:</strong> ${items[4]}
                    <span style="float:right;"><strong>Retailer location:</strong> ${items[6]}</span></p>
                  </div>
                  <div style="margin-left: 20px;margin-top: 10px;font-size:19px">
                  <p><strong>Retailer address:</strong> ${items[5]}</p>
                  </div>
                  </div>`
      document.getElementById('product_detail').innerHTML = product_design;
  } else {
      jQuery('#detail_product_failure').css('display','block');
  }  
  })
  })
},
GetCodes: function(){
  var voteInstance;
  var codes;
  var design = '';
  var price = '';
  var email = '';
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getcodes({from: account});
  }).then(function(result, err){
    console.log('res>>> codes',result)
    codes = result?.filter(ele => ele);
    console.log('codes',codes)
    if(result?.length > 0){
      jQuery('#empty_div').css('display','none');
      codes?.map((item) => {
         App.contracts.vote.deployed().then(function(instance) {
          voteInstance = instance;
          return voteInstance.getCodeDetailsforowner(item, {from: account});
        }).then(function(response, err){
          console.log('item>>>', item);
            if (response) {
              var items = Object.values(response);
              price = Object.values((Object.values(response[6]))[1])[0];
              email = document.getElementById('user_name').value;
             
              design += `<div style="display: block;transition: 0.3s;box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);margin-top: 70px;padding: 45px;">
                  <div style="margin-left: 20px;font-size:21px; font-weight: bold; margin-top: 10px;">
                  <p>${items[0]}</p>
                  </div>
                  <div style="margin-left: 60px;margin-top: 10px;font-size:19px">
                  <p>${items[2]}</p>
                  </div>
                  <div style="margin-left: 60px;margin-top: 10px;font-size:18px">
                  <p style="text-align:left;">${items[1]}
                  <span style="float:right;">$${price}</span></p>
                  </div>
                  <div>
                  <button
                  type="button"
                  style="float:right;border: 1px solid black; background-color: black; color: white; padding: 6px 26px;text-align: center; text-decoration: none; font-size: 16px; margin: 4px 2px; transition-duration: 0.4s;cursor: pointer;"
                  onclick='App.BuyProduct("${item}", "${email}","${price}")'>BUY</button> 
                  </div>
                  </div>`
              document.getElementById('buy_tab').innerHTML = design;
            }
        })
      })
  } else {
      jQuery('#buy_sell_div').css('display','block');
      jQuery('#login_failure').css('display','block');
  }  
  })
  })
},
BuyProduct: function (code, email, price) {
  // console.log('res>> buy product11',code, email);
  var voteInstance;
  var accountInstance;
  var acct_address;
  web3.eth.getAccounts(function (error, accounts) {
    var account = accounts[0];

    App.contracts.token.deployed().then(function (instance) {
      voteInstance = instance;
      return voteInstance.approve(account, price, { from: account });

    }).then(function (result, err) {
      console.log('res>> buy product', result)
      if (result.receipt.status === true) {
        App.contracts.vote.deployed().then(function (acct_instance) {
          accountInstance = acct_instance;
          return accountInstance.getaccount(code, { from: account });
    
        }).then(function (acct_result, err) {
          if(acct_result) {
            acct_address = acct_result;
            return accountInstance.checkbalance(code, { from: account }).then(function(balance_result, err) {
              if (balance_result === true) {
                return voteInstance.transferFrom(account, acct_address , price, { from: account }).then(function (result, err) {
                  console.log('res>> buy product', result);
                  if (result.receipt.status === true) {
                    App.contracts.vote.deployed().then(function (acct_instance) {
                      accountInstance = acct_instance;
                      return accountInstance.changeownership(code, email, {from: account});
                    }).then (function(owner_result, error) {
                      if(owner_result?.receipt?.status === true){
                          // alert("You have successfully bought the item");
                          jQuery('#bought_success').css('display','block');
                          console.log('buy product is successful');
                          App.GetCodes();
                        } else {
                          jQuery('#bought_failure').css('display','block');
                          // alert("Something went wrong");
                        } 
                    });
                  } else {
                    jQuery('#bought_failure1').css('display','block');
                    // alert("Product purchase is not successful");
                  }
                });
              } else {
                jQuery('#bought_failure2').css('display','block');
                // alert("Insufficient balance");
              }
            });
          } else {
            jQuery('#bought_failure3').css('display','block');
            // alert("This product is not owned by anyone");
          }
        })
      }
      else {
        alert("The transaction is not approved");
      }
    })
  })
},
// BuyProduct: function(code,email,price){
//   // console.log('res>> buy product11',code, email);
//   var voteInstance;
//   web3.eth.getAccounts(function(error, accounts) {
//   var account = accounts[0];
//   App.contracts.vote.deployed().then(function(instance) {
//     voteInstance = instance;

//   //   return voteInstance.checkbalance(code, {from: account});
//   //   }).then(function(result, err){
//   //     console.log('res>> buy product',result)
//   //     if(result === true){
//   //       alert("You have successfully bought the item");
//   //       console.log('buy product is successful');
//   //   } else {
//   //     alert("Please enter valid information");
//   //web3.utils.toWei(String(10), "ether")
//   //      }  
//   console.log("-----", code, email, price);
//   return voteInstance.changeownership(code, email, price, {from: account});
//   //  })
//   }).then(function(result, err){
//     console.log('res>> buy product',result)
//     if(result.receipt.status === true){
//       alert("You have successfully bought the item");
//       console.log('buy product is successful');
//   } else {
//     alert("Please enter valid information");
//   }  
//   });
//   })
// },
SellProduct: function(product_code,new_price){
  var voteInstance;
  var email = document.getElementById('user_name').value;
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    console.log('product_code>>', product_code, email, new_price);
    return voteInstance.sell(product_code, email, new_price, {from: account});
  }).then(function(result, err){
    console.log('res>> sell',result)
    // console.log('res>> sell',result.logs.length)
    if(result.receipt.status === true){
      App.contracts.vote.deployed().then(function(instance) {
        voteInstance = instance;
        console.log('product_code>>11', product_code);
        return voteInstance.issold(product_code, {from: account});
        //  return voteInstance.getCodeDetailsforowner(product_code, {from: account});
      }).then(function(result, err){
        console.log('res',result)
        if(result === true){
          // alert("You have successfully sold the item");
          jQuery('#sell_product_success').css('display','block');
          console.log('sell product is successful');
      } else {
        // alert("Please enter valid information");
        jQuery('#sell_product_failure').css('display','block');
        console.log('sell product is unsuccessful');
      }  
      })
  } else {
    jQuery('#sell_product_failure').css('display','block');
  }  
  })
  })
},
RegisterCustomer: function(email, name){
  var voteInstance;
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.createCustomer(email, name, {from: account});
  }).then(function(result, err){
    console.log('res',result)
    if(result){
       
      if(result.receipt.status === true)
      jQuery('#cust_success').css('display','block');
      else
      jQuery('#cust_failure').css('display','block');
  } else {
      jQuery('#cust_failure').css('display','block');
  }   
  })
  })
},

CheckManuAccBalance: function(){
  var voteInstance;
  var balance_design = '';
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getBalance({from: account});
  }).then(function(result, err){
      if(result){
        // alert(result)
        balance_design += `<div style="margin-left: 20px;font-size:21px; font-weight: bold; margin-top: 30px;">
                  <p>Your account balance is ${result}</p>
                  </div>`
        document.getElementById('m_acc_tab').innerHTML = balance_design;
      } else {
        balance_design += `<div style="margin-left: 20px;font-size:16px; font-weight: bold; margin-top: 30px;">
                  <p>There is a problem loading the info, please try again later</p>
                  </div>`
        document.getElementById('m_acc_tab').innerHTML = balance_design;
      }   
  })
  })
},
CheckAccBalance: function(){
  var voteInstance;
  var balance_design = '';
  web3.eth.getAccounts(function(error, accounts) {
  var account = accounts[0];
  App.contracts.vote.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getBalance({from: account});
  }).then(function(result, err){
      if(result){
        // alert(result)
        balance_design += `<div style="margin-left: 20px;font-size:21px; font-weight: bold; margin-top: 30px;">
                  <p>Your account balance is ${result}</p>
                  </div>`
              document.getElementById('acc_tab').innerHTML = balance_design;
      } else {
        balance_design += `<div style="margin-left: 20px;font-size:16px; font-weight: bold; margin-top: 30px;">
                  <p>There is a problem loading the info, please try again later</p>
                  </div>`
        document.getElementById('acc_tab').innerHTML = balance_design;
      }   
  })
  })
},

};

$(function() {
  $(window).load(function() {
    // alert("hello")
    App.init();
  });
});
