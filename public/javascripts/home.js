var name='';
var symbol='';
var symbol2='';
var decimal='';
var supply='';
var contract_name='';
var totalSupply='';

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
            document.getElementById("code_display").innerHTML=response.data.codeData;
        }
    })
    .catch(function (error) {
        console.log(error);
    });

}
