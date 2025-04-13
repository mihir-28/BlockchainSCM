// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    
    mapping(address => mapping(bytes32 => bool)) public roles;
    
    event RoleGranted(bytes32 indexed role, address indexed account);
    event RoleRevoked(bytes32 indexed role, address indexed account);
    
    constructor() {
        // Assign admin role to deployer
        roles[msg.sender][ADMIN_ROLE] = true;
        emit RoleGranted(ADMIN_ROLE, msg.sender);
    }
    
    modifier onlyAdmin() {
        require(roles[msg.sender][ADMIN_ROLE], "Requires admin role");
        _;
    }
    
    modifier hasRole(bytes32 _role) {
        require(roles[msg.sender][_role], "Does not have required role");
        _;
    }
    
    function grantRole(address _account, bytes32 _role) public onlyAdmin {
        roles[_account][_role] = true;
        emit RoleGranted(_role, _account);
    }
    
    function revokeRole(address _account, bytes32 _role) public onlyAdmin {
        roles[_account][_role] = false;
        emit RoleRevoked(_role, _account);
    }
    
    function hasUserRole(address _account, bytes32 _role) public view returns (bool) {
        return roles[_account][_role];
    }
    
    // For testing - grant self a role
    function grantSelfRole(bytes32 _role) public {
        require(!roles[msg.sender][_role], "Already has role");
        roles[msg.sender][_role] = true;
        emit RoleGranted(_role, msg.sender);
    }
}