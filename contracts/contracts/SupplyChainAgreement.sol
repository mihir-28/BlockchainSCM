// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SupplyChainAgreement {
    enum Status { Created, InTransit, Delivered, Completed }
    
    struct Shipment {
        address sender;
        address receiver;
        uint256 productId;
        uint256 value;
        uint256 deliveryDeadline;
        Status status;
        bool isPaid;
    }
    
    mapping(uint256 => Shipment) public shipments;
    uint256 public shipmentCount;
    
    event ShipmentCreated(uint256 shipmentId, address sender, address receiver);
    event ShipmentInTransit(uint256 shipmentId, uint256 timestamp);
    event ShipmentDelivered(uint256 shipmentId, uint256 timestamp);
    event ShipmentCompleted(uint256 shipmentId, uint256 timestamp);
    event PaymentReleased(uint256 shipmentId, uint256 amount);
    
    function createShipment(
        address _receiver,
        uint256 _productId,
        uint256 _deliveryDeadline
    ) public payable returns (uint256) {
        shipmentCount++;
        
        shipments[shipmentCount] = Shipment({
            sender: msg.sender,
            receiver: _receiver,
            productId: _productId,
            value: msg.value,
            deliveryDeadline: _deliveryDeadline,
            status: Status.Created,
            isPaid: false
        });
        
        emit ShipmentCreated(shipmentCount, msg.sender, _receiver);
        return shipmentCount;
    }
    
    function startShipment(uint256 _shipmentId) public {
        Shipment storage shipment = shipments[_shipmentId];
        require(msg.sender == shipment.sender, "Only sender can start shipment");
        require(shipment.status == Status.Created, "Shipment already started");
        
        shipment.status = Status.InTransit;
        emit ShipmentInTransit(_shipmentId, block.timestamp);
    }
    
    function confirmDelivery(uint256 _shipmentId) public {
        Shipment storage shipment = shipments[_shipmentId];
        require(msg.sender == shipment.receiver, "Only receiver can confirm");
        require(shipment.status == Status.InTransit, "Shipment not in transit");
        
        shipment.status = Status.Delivered;
        emit ShipmentDelivered(_shipmentId, block.timestamp);
    }
    
    function completeTransaction(uint256 _shipmentId) public {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.status == Status.Delivered, "Delivery not confirmed");
        require(!shipment.isPaid, "Payment already released");
        
        shipment.status = Status.Completed;
        shipment.isPaid = true;
        
        payable(shipment.sender).transfer(shipment.value);
        
        emit PaymentReleased(_shipmentId, shipment.value);
        emit ShipmentCompleted(_shipmentId, block.timestamp);
    }
    
    function refundLateShipment(uint256 _shipmentId) public {
        Shipment storage shipment = shipments[_shipmentId];
        require(msg.sender == shipment.receiver, "Only receiver can refund");
        require(shipment.status == Status.InTransit, "Shipment not in transit");
        require(block.timestamp > shipment.deliveryDeadline, "Deadline not passed");
        
        shipment.status = Status.Completed;
        shipment.isPaid = true;
        
        payable(shipment.receiver).transfer(shipment.value);
        
        emit PaymentReleased(_shipmentId, shipment.value);
        emit ShipmentCompleted(_shipmentId, block.timestamp);
    }
    
    // Helper function to view shipment details
    function getShipment(uint256 _shipmentId) public view returns (
        address sender,
        address receiver,
        uint256 productId,
        uint256 value,
        uint256 deliveryDeadline,
        Status status,
        bool isPaid
    ) {
        Shipment storage shipment = shipments[_shipmentId];
        return (
            shipment.sender,
            shipment.receiver,
            shipment.productId,
            shipment.value,
            shipment.deliveryDeadline,
            shipment.status,
            shipment.isPaid
        );
    }
}