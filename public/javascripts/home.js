var name='';
var symbol='';
var symbol2='';
var decimal='';
var supply='';
var contract_name='';
var totalSupply='';
var byte ="";

var contractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "totalSupply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
]

function reset() 
{
    document.getElementById("tokenName").value = "";
    document.getElementById("tokenSymbol").value = "";
    document.getElementById("decimals").value = "";
    document.getElementById("totalSupply").value = "";
    
    var change = document.getElementById("bttn");
    if (change.innerText == "Edit & Regenerate")
    {
        change.innerText = "Generate";
    }
    document.getElementById("code_display").innerHTML="";
}

function generate() 
{
                    name = document.getElementById("tokenName").value;
                    if (name == "") {
                            alert("Token Name must be filled out.");
                            return false;
                        }
                        
                    symbol = document.getElementById("tokenSymbol").value;
                    if (symbol == "") {
                            alert("Token Symbol must be filled out.");
                            return false;
                        }

                    decimal = document.getElementById("decimals").value;
                    if (decimal == "") {
                        alert("Decimals must be filled out with a numeric value.");
                        return false;
                    }
                    else if(decimal<0 || decimal>18){
                        alert("Decimals range must be from 0 to 18.");
                        return false;    
                    }
                    else if(decimal%1!==0){
                        alert("Decimals must be a integer value.");
                        return false;
                    }

                    supply = document.getElementById("totalSupply").value;
                    if (supply == "") {
                        alert("Supply must be filled out with a numeric value.");
                        return false;
                    }
                    else if(supply%1!==0){
                        alert("Total Supply must be a integer value.");
                        return false;
                    }
                    else if(supply<=0){
                        alert("Total supply must be a positive value.");
                        return false;    
                    }


            var change = document.getElementById("bttn");
            if (change.innerHTML == "Generate")
            {
                change.innerHTML = "Edit & Regenerate";
            }

            symbol2 = symbol.toUpperCase();
            contract_name = name.charAt(0).toUpperCase()+name.substr(1);
            contract_name = contract_name.replace(/\s/g, '');
            totalSupply=supply*10**decimal;
            myFunction();
}


function myFunction() 
{
    var html='';
    html='<div id="loader"></div>';
    document.getElementById('spinner').innerHTML = html;
    var myVar = setTimeout(showPage, 500);
}

function myFunction2() 
{
    var html='';
    html='<div id="loader"></div>';
    document.getElementById('spinner').innerHTML = html;
    var myVar = setTimeout(bytecode, 500);
}

function showPage() 
{
    document.getElementById("loader").style.display = "none";
    axios.post('/api/tfGen', {
        contractName: contract_name,
        tokenName: name,
        tokenSymbol: symbol2,
        decimals: decimal,
        totalSupply: totalSupply
    })
    .then(function (response) {
        if (response) {
        //    console.log("code data",response.data.codeData);
            document.getElementById("code_display").innerHTML=response.data.codeData;
            //setTimeout(bytecode, 5000);
           // bytecode();
           myFunction2();
        }
    })
    .catch(function (error) {
        console.log(error);
    });

}

function deploy(){

    var contract_source = document.getElementById("code_display").innerText;
    // console.log("contract source",contract_source);
    if(web3) {
        console.log("web33") 
        var contract = web3.eth.contract(contractABI);

        contract.new(
           {
             from: web3.eth.accounts[0], 
             data: byte, 
             gas: '4700000',
             gasPrice:'20000000000'
           }, function (e, contract){
              console.log(e, contract);
              if (typeof contract.address !== 'undefined') {
                 console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                // document.getElementById("transacition_hash").innerHTML = contract.transactionHash;
               // document.getElementById("contract_address").innerHTML = contract.address ;
               }
               document.getElementById("transacition_hash").innerHTML = contract.transactionHash;
               

        });
    }
}

function bytecode()
{
    //myFunction();

    var contract_source = document.getElementById("code_display").innerText;

    //console.log("source code",contract_source);
    axios.post('/api/genbytecode', {
        contractCode: contract_source
    })
    .then(function (response) {
        if (response) {

            byte = response.data.bytecode;
         //   console.log("byte",byte);
           // document.getElementById("code_display").innerHTML=response.data.codeData;
           document.getElementById("loader").style.display = "none";

        }
    })
    .catch(function (error) {
        console.log(error);
    });

}

function getcontractAddress(){
    var transaction_hash = document.getElementById("transacition_hash").innerHTML;
    if(transaction_hash){
        console.log(transaction_hash);
    web3.eth.getTransactionReceipt(transaction_hash ,function(err, res) {

        console.log("response reciept",res," errrr  ", err); 
        if(res == null)
        {
            document.getElementById("contract_address").innerHTML = "mining ....";
        }
        if(res.contractAddress) 
        {
        document.getElementById("contract_address").innerHTML = res.contractAddress;
        }
       
    }
    )
}
}
