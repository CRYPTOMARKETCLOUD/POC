
gen = (req, res, next) => {
    ContractData = {
    contractName: req.body.contractName,
    tokenName: req.body.tokenName,
    tokenSymbol: req.body.tokenSymbol,
    decimals: req.body.decimals,
    totalSupply: req.body.totalSupply
    }
    var html=`
        pragma solidity ^0.4.18;
        // -------------------------------------------------------------------------
        // ${ContractData.contractName} token contract
        // -------------------------------------------------------------------------
        
        contract ${ContractData.contractName}Token 
        {
        string public constant symbol = '${ContractData.tokenSymbol}';
        string public constant name = '${ContractData.tokenName}';
        uint8 public constant decimals = ${ContractData.decimals};
        uint256 _totalSupply = ${ContractData.totalSupply};
        
        // Owner of this contract
        address public owner;

        // Owner of the platform
        address public CMCowner = 0xBb165CdE6A1c60a10aed6135d9295788016030B8;
    
        // Balances for each account
        mapping(address => uint256) balances;
    
        // Owner of account approves the transfer of an amount to another account
        mapping(address => mapping (address => uint256)) allowed;

        // Triggered when tokens are transferred.
        event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
        // Triggered whenever approve(address _spender, uint256 _value) is called.
        event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
        // Functions with this modifier can only be executed by the owner
        modifier onlyOwner() {
            if (msg.sender != owner) {
                throw;
            }
            _;
        }
    
        // Constructor
        function ${ContractData.contractName}Token() {
            owner = msg.sender;
            
            balances[CMCowner] = (10 * _totalSupply)/100;
            balances[owner] = _totalSupply - balances[CMCowner];
            Transfer(0x00, CMCowner, balances[CMCowner]);
            Transfer(0x00, owner, balances[owner]);

        }
    
        function totalSupply() constant returns (uint256 totalSupply) {
            return _totalSupply;
        }
    
        // What is the balance of a particular account?
        function balanceOf(address _owner) constant returns (uint256 balance) {
            return balances[_owner];
        }
    
        // Transfer the balance from owner's account to another account
        function transfer(address _to, uint256 _amount) returns (bool success) {
            if (balances[msg.sender] >= _amount 
                && _amount > 0
                && balances[_to] + _amount > balances[_to]) {
                balances[msg.sender] -= _amount;
                balances[_to] += _amount;
                Transfer(msg.sender, _to, _amount);
                return true;
            } else {
                return false;}
        }
    
        // Send _value amount of tokens from address _from to address _to
        function transferFrom(
            address _from,
            address _to,
            uint256 _amount
        ) returns (bool success) {
            if (balances[_from] >= _amount
                && allowed[_from][msg.sender] >= _amount
                && _amount > 0
                && balances[_to] + _amount > balances[_to]) {
                balances[_from] -= _amount;
                allowed[_from][msg.sender] -= _amount;
                balances[_to] += _amount;
                Transfer(_from, _to, _amount);
                return true;
            } else {
                return false;}
        }

        function approve(address _spender, uint256 _amount) 
            returns (bool success) {
            allowed[msg.sender][_spender] = _amount;
            Approval(msg.sender, _spender, _amount);
            return true;
        }

        function allowance(address _owner, address _spender) 
            constant returns (uint256 remaining) {
            return allowed[_owner][_spender];}
        }






        

        `;

        var nsh      =  require('node-syntaxhighlighter')
        , language =  nsh.getLanguage('js')
        , code     =  html
        ;
       
        var html1 = nsh.highlight(code, language);
        res.json({codeData: html});
}

module.exports = {
	gen
}
