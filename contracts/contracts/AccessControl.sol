// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    
    mapping(address => mapping(bytes32 => bool)) private roles;
    
    address public admin;

    event RoleGranted(address indexed account, bytes32 indexed role);
    event RoleRevoked(address indexed account, bytes32 indexed role);
    
    constructor() {
        admin = msg.sender;
        roles[msg.sender][ADMIN_ROLE] = true;
        emit RoleGranted(msg.sender, ADMIN_ROLE);
    }
    
    modifier onlyAdmin() {
        require(roles[msg.sender][ADMIN_ROLE], "AccessControl: caller is not admin");
        _;
    }
    
    modifier onlyRole(bytes32 role) {
        require(roles[msg.sender][role], "AccessControl: caller doesn't have required role");
        _;
    }
    
    function grantRole(address account, bytes32 role) external onlyAdmin {
        roles[account][role] = true;
        emit RoleGranted(account, role);
    }
    
    function revokeRole(address account, bytes32 role) external onlyAdmin {
        roles[account][role] = false;
        emit RoleRevoked(account, role);
    }
    
    function hasRole(address account, bytes32 role) external view returns (bool) {
        return roles[account][role];
    }
    
    function hasUserRole(address account, bytes32 role) external view returns (bool) {
        return roles[account][role];
    }
}