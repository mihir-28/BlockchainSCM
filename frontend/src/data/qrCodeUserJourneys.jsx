const qrCodeUserJourneys = {
  consumer: {
    title: "Consumer Verification",
    description: "Consumers can verify product authenticity and view the complete supply chain journey",
    phoneFrame: "/images/phone-consumer.png", // Replace with actual image path
    steps: [
      {
        title: "Scan QR Code",
        description: "Use your phone camera or app to scan the QR code on the product"
      },
      {
        title: "Verify Authenticity",
        description: "Instantly see if the product is authentic with blockchain verification"
      },
      {
        title: "View Product Journey",
        description: "Explore the complete supply chain history from origin to store"
      },
      {
        title: "Access Product Details",
        description: "View certifications, sustainability information, and usage recommendations"
      }
    ],
    demoProduct: {
      name: "Premium Colombian Coffee",
      origin: "Huila, Colombia",
      producer: "La Esperanza Farm",
      certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
      harvestDate: "February 2025",
      batchId: "B2025-02-145"
    }
  },
  business: {
    title: "Business Operations",
    description: "Streamline inventory, transfers and quality control with QR tracking",
    phoneFrame: "/images/phone-business.png", // Replace with actual image path
    steps: [
      {
        title: "Scan Shipments",
        description: "Quickly receive or transfer inventory with batch QR scanning"
      },
      {
        title: "Verify Credentials",
        description: "Confirm authorized personnel with secure blockchain identity"
      },
      {
        title: "Update Status",
        description: "Record quality checks, temperature logs, and transfer of custody"
      },
      {
        title: "Generate Reports",
        description: "Create compliance documentation and audit trails instantly"
      }
    ],
    demoProduct: {
      name: "Batch Transfer: BT-24-03184",
      items: "250 units - Premium Colombian Coffee",
      sender: "Miami Distribution Center",
      receiver: "Northeast Regional Warehouse",
      transferDate: "March 14, 2025",
      transportConditions: "Temperature: 18-22°C, Humidity: 40-60%"
    }
  },
  manufacturing: {
    title: "Manufacturing & Production",
    description: "Track components, batches, and compliance from raw materials to finished products",
    phoneFrame: "/images/phone-manufacturing.png", // Replace with actual image path
    steps: [
      {
        title: "Material Registration",
        description: "Register incoming raw materials with component-level tracking"
      },
      {
        title: "Production Batching",
        description: "Link materials to production batches for complete traceability"
      },
      {
        title: "Quality Control",
        description: "Record testing results and compliance certifications"
      },
      {
        title: "Finished Product QR",
        description: "Generate unique QR codes for each product containing its full history"
      }
    ],
    demoProduct: {
      name: "Production Batch: PB-25-03045",
      components: ["Green Coffee Beans (COF-GB-2025-02)", "Packaging (PKG-ECO-25)"],
      productionDate: "March 10, 2025",
      expiryDate: "March 10, 2026",
      qualityScore: "94/100",
      certifications: ["ISO 9001", "HACCP", "Organic Production"]
    }
  }
};

export default qrCodeUserJourneys;