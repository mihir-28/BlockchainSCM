// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ProductTracking {
    struct Product {
        uint256 id;
        string name;
        string manufacturer;
        string origin;
        string description;
        address owner;
        uint256 createTime;
        uint256 updateTime;
        bytes32 dataHash;
    }
    
    mapping(uint256 => Product) public products;
    uint256 public productCount;
    
    // Events
    event ProductCreated(uint256 productId, address manufacturer);
    event ProductTransferred(address from, address to, uint256 productId);
    event ProductUpdated(uint256 productId, bytes32 newDataHash);
    
    function createProduct(
        string memory _name, 
        string memory _manufacturer, 
        string memory _origin, 
        string memory _description,
        bytes32 _dataHash
    ) public returns (uint256) {
        productCount++;
        
        products[productCount] = Product({
            id: productCount,
            name: _name,
            manufacturer: _manufacturer,
            origin: _origin,
            description: _description,
            owner: msg.sender,
            createTime: block.timestamp,
            updateTime: block.timestamp,
            dataHash: _dataHash
        });
        
        emit ProductCreated(productCount, msg.sender);
        return productCount;
    }
    
    function transferProduct(address _to, uint256 _productId) public {
        require(products[_productId].owner == msg.sender, "Not the product owner");
        
        products[_productId].owner = _to;
        products[_productId].updateTime = block.timestamp;
        
        emit ProductTransferred(msg.sender, _to, _productId);
    }
    
    function updateProductData(uint256 _productId, bytes32 _newDataHash) public {
        require(products[_productId].owner == msg.sender, "Not the product owner");
        
        products[_productId].dataHash = _newDataHash;
        products[_productId].updateTime = block.timestamp;
        
        emit ProductUpdated(_productId, _newDataHash);
    }
    
    function getProduct(uint256 _productId) public view returns (
        uint256 id,
        string memory name,
        string memory manufacturer,
        string memory origin,
        string memory description,
        address owner,
        uint256 createTime,
        uint256 updateTime,
        bytes32 dataHash
    ) {
        Product storage product = products[_productId];
        return (
            product.id,
            product.name,
            product.manufacturer,
            product.origin,
            product.description,
            product.owner,
            product.createTime,
            product.updateTime,
            product.dataHash
        );
    }
}