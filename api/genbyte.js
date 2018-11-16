
var solc = require('solc');

data = (req, res, next) => {

   // console.log("data",req.body.contractCode);

   //var input = 'contract x { function g() {} }'

    var inputsourcecode = req.body.contractCode;
   // console.log("source code",inputsourcecode);
    var output = solc.compile(inputsourcecode, 1);

    for (var contractName in output.contracts) {
        // code and ABI that are needed by web3
    //    console.log(contractName + ': ' + output.contracts[contractName].bytecode)
    //    console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
     //   console.log("abia" ,bc);
        res.send({"bytecode":output.contracts[contractName].bytecode});

    }

    //var bc = output.contracts[contractName].bytecode;
    //var abi =  output.contracts[contractName].interface;

}
module.exports = {
	data
}