var express = require('express');
var router = express.Router();
var CoinPayments = require('coinpayments');

var tfGen = require('../api/tfGenerator')
var genbyte = require('../api/genbyte')


router.post('/tfGen',tfGen.gen)
router.post('/genbytecode',genbyte.data)

let middleware = [
    CoinPayments.ipn({
      'merchantId': 'd21cee6c37dd420900cedd1d7480df57',
      'merchantSecret': 'oyVUQaLFaYeTnhgcVHHfFjZBEh0kNFz6vzNGMVDkO7I0Pe4sNea7CF3SNQEn1K0DXnHX7qLVkwLqj7F1vV1vdvjAwWTxkI5lFFDWXqmxFyIFlzXkjXrimgxK9cHCJ4gzrm7ctMCbNAo2XQPesQfIyvAe5vOOgcMK3NcMkbxE2DW9Hi5pLE99BRaBDDO01uOSBgpVnPSXHFklDnxQveBPIqgjBVm8'
    })   , function(req,res){
        console.log(req,res);
    } ]

    CoinPayments.on('ipn_fail', function(data){
        // Handle failed transaction
        console.log("IPN FAIL");
        console.log(data);
      });
      CoinPayments.on('ipn_pending', function(data){
        // Handle pending payment
        console.log("IPN PENDING");
        console.log(data);
      });
      CoinPayments.on('ipn_complete', function(data){
        // Handle completed payment
        console.log("IPN COMPLETE");
        console.log(data);
      });

    router.get('/getaa',middleware)

module.exports = router;
