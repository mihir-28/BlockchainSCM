// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ProductTracking {
    struct Product {
        uint256 id;           // Unique identifier
        string manufacturer;   // Entity that created the product
        string origin;         // Country/location of origin
        address owner;         // Current owner address
        uint256 createTime;    // When product was registered
        uint256 updateTime;    // Last update timestamp
        string dataHash;       // Hash of off-chain data for verification
    }
    
    mapping(uint256 => Product) public products;
    uint256 public productCount;
    
    // Events
    event ProductCreated(
        uint256 indexed productId,
        address indexed owner,
        string manufacturer,
        string origin,
        string dataHash
    );
    
    event ProductTransferred(
        uint256 indexed productId,
        address indexed from,
        address indexed to
    );
    
    event ProductUpdated(
        uint256 indexed productId,
        string dataHash
    );
    
    // Create new product - simplified to only essential data
    function createProduct(
        string memory _manufacturer,
        string memory _origin,
        string memory _dataHash
    ) public returns (uint256) {
        productCount++;
        
        products[productCount] = Product({
            id: productCount,
            manufacturer: _manufacturer,
            origin: _origin,
            owner: msg.sender,
            createTime: block.timestamp,
            updateTime: block.timestamp,
            dataHash: _dataHash
        });
        
        emit ProductCreated(
            productCount,
            msg.sender,
            _manufacturer,
            _origin,
            _dataHash
        );
        
        return productCount;
    }
    
    // Transfer product ownership
    function transferProduct(uint256 _productId, address _to) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        require(msg.sender == product.owner, "Only owner can transfer");
        
        address previousOwner = product.owner;
        product.owner = _to;
        product.updateTime = block.timestamp;
        
        emit ProductTransferred(_productId, previousOwner, _to);
    }
    
    // Update product data hash (when off-chain data changes)
    function updateProductData(uint256 _productId, string memory _newDataHash) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        require(msg.sender == product.owner, "Only owner can update");
        
        product.dataHash = _newDataHash;
        product.updateTime = block.timestamp;
        
        emit ProductUpdated(_productId, _newDataHash);
    }
    
    // Get product details
    function getProduct(uint256 _productId) public view returns (
        uint256 id,
        string memory manufacturer,
        string memory origin,
        address owner,
        uint256 createTime,
        uint256 updateTime,
        string memory dataHash
    ) {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        
        return (
            product.id,
            product.manufacturer,
            product.origin,
            product.owner,
            product.createTime,
            product.updateTime,
            product.dataHash
        );
    }
}