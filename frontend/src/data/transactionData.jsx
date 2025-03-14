const transactionData = [
  {
    id: "0xf7b8c5d3a4e9f0b1c6d2e8a7b9c4d5e6f7a8b9c1",
    type: "product",
    description: "New product batch registered: Organic Coffee Beans (SKU: CFE-ORG-001)",
    user: "John Smith",
    userRole: "Manufacturer",
    walletAddress: "0x1234567890123456789012345678901234567890",
    timestamp: "2025-03-12T10:30:45Z",
    status: "confirmed",
    blockNumber: "14356789",
    gasUsed: "134,567",
    authMethod: "Multi-signature Authentication",
    verified: true,
    data: {
      productId: "CFE-ORG-001",
      batchNumber: "B2025-03-12-001",
      quantity: "500kg",
      manufacturingDate: "2025-03-12",
      expiryDate: "2026-03-12",
      certificates: ["Organic", "Fair Trade"],
      origin: {
        country: "Colombia",
        region: "Huila",
        farm: "La Esperanza"
      }
    }
  },
  {
    id: "0xe6f7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
    type: "shipment",
    description: "Shipment created for product batch CFE-ORG-001 to Distribution Center",
    user: "Maria Rodriguez",
    userRole: "Logistics Manager",
    walletAddress: "0x2345678901234567890123456789012345678901",
    timestamp: "2025-03-13T08:15:22Z",
    status: "pending",
    blockNumber: "-",
    gasUsed: "-",
    authMethod: "Digital Signature",
    verified: true,
    data: {
      shipmentId: "SHP-2025-03-13-007",
      productIds: ["CFE-ORG-001"],
      origin: "Bogotá Warehouse",
      destination: "Miami Distribution Center",
      carrier: "Global Logistics Inc.",
      estimatedArrival: "2025-03-20T14:00:00Z",
      temperatureControl: true,
      conditions: {
        minTemp: "15°C",
        maxTemp: "21°C",
        humidity: "40-60%"
      },
      status: "In transit - awaiting customs clearance"
    }
  },
  {
    id: "0xf0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    type: "shipment",
    description: "Shipment created for premium tea to European market",
    user: "Maria Rodriguez",
    userRole: "Logistics Manager",
    walletAddress: "0x2345678901234567890123456789012345678901",
    timestamp: "2025-03-10T09:20:18Z",
    status: "failed",
    blockNumber: "-",
    gasUsed: "-",
    authMethod: "Digital Signature",
    verified: false,
    data: {
      shipmentId: "SHP-2025-03-10-031",
      productIds: ["TEA-PREM-001"],
      origin: "Mumbai Warehouse",
      destination: "Amsterdam Distribution Hub",
      carrier: "Ocean Freight Solutions",
      estimatedArrival: "2025-03-30T00:00:00Z",
      failureReason: "Documentation error: Missing export permit",
      status: "Cancelled - Rescheduled for 2025-03-15"
    }
  },
  {
    id: "0xa8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8",
    type: "certificate",
    description: "Organic certification verification for product batch CFE-ORG-001",
    user: "Elena Gomez",
    userRole: "Quality Control",
    walletAddress: "0x3456789012345678901234567890123456789012",
    timestamp: "2025-03-14T11:42:17Z",
    status: "confirmed",
    blockNumber: "14356999",
    gasUsed: "75,230",
    authMethod: "Digital Signature",
    verified: true,
    data: {
      certificateId: "CERT-ORG-2025-112",
      productId: "CFE-ORG-001",
      certifyingBody: "Global Organic Certification",
      validFrom: "2025-03-14",
      validUntil: "2026-03-14",
      standards: ["USDA Organic", "EU Organic"],
      verificationMethod: "Document Review and Laboratory Testing",
      results: {
        pesticides: "None detected",
        chemicals: "Within organic standards",
        gmo: "Not detected"
      }
    }
  },
  {
    id: "0xa5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
    type: "sale",
    description: "Eastern Region: Products received by retailers",
    user: "Jennifer Parker",
    userRole: "Regional Sales Manager",
    walletAddress: "0x6789012345678901234567890123456789012345",
    timestamp: "2025-03-26T09:30:42Z",
    status: "failed",
    blockNumber: "-",
    gasUsed: "-",
    authMethod: "Digital Signature",
    verified: false,
    data: {
      receiptId: "REC-ER-2025-03-26-008",
      shipmentId: "SHP-2025-03-23-012",
      retailers: [
        { name: "Urban Brews", quantity: "100kg" },
        { name: "Coffee World", quantity: "75kg" },
        { name: "Morning Bean", quantity: "75kg" }
      ],
      failureReason: "Signature validation error: Unauthorized transaction attempt",
      notes: "Security alert triggered. Transaction rejected."
    }
  },
  {
    id: "0xe9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    type: "certificate",
    description: "Quality testing for Premium Tea Leaves (TEA-PREM-001)",
    user: "Elena Gomez",
    userRole: "Quality Control",
    walletAddress: "0x3456789012345678901234567890123456789012",
    timestamp: "2025-03-06T13:42:55Z",
    status: "pending",
    blockNumber: "-",
    gasUsed: "-",
    authMethod: "Digital Signature",
    verified: true,
    data: {
      certificateId: "CERT-QT-2025-089",
      productId: "TEA-PREM-001",
      certifyingBody: "International Tea Quality Institute",
      testResults: {
        purity: "98.5%",
        aroma: "Strong",
        flavor: "Rich, malty",
        moisture: "3.2%",
        colorimetry: "Golden amber"
      },
      notes: "Premium quality tea leaves. Exceptional flavor profile.",
      pendingReason: "Awaiting secondary lab verification"
    }
  },
  {
    id: "0xc7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    type: "verification",
    description: "Consumer verification of product authenticity",
    user: "Sarah Williams",
    userRole: "Consumer",
    walletAddress: "0x8901234567890123456789012345678901234567",
    timestamp: "2025-03-28T15:45:23Z",
    status: "pending",
    blockNumber: "-",
    gasUsed: "-",
    authMethod: "Mobile App Authentication",
    verified: true,
    data: {
      verificationId: "CONS-VER-2025-03-28-123",
      productId: "CFE-ORG-001",
      verificationMethod: "QR Code Scan",
      retailer: "Pacific Coffee Co.",
      productDetails: {
        name: "Organic Colombian Coffee",
        origin: "Huila, Colombia",
        batch: "B2025-03-12-001",
        certificates: ["Organic", "Fair Trade"]
      },
      verificationTime: "2025-03-28T15:45:23Z",
      location: "San Francisco, CA",
      pendingReason: "Network synchronization delay"
    }
  }
];

export default transactionData;