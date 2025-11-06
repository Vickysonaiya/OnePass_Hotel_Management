export const tableData = [
  {
    "period": "Last 7 Days",
    "totalCredits": 67 ,
    "averagePerDay": "9.6/day",
    "remainingCredits": 16,
    "efficiency": "Excellent"
  },
  {
    "period": "Last 30 Days",
    "totalCredits": 246,
    "averagePerDay": "8.2/day",
    "remainingCredits": 18,
    "efficiency": "Good"
  },
  {
    "period": "Last 90 Days",
    "totalCredits": 753,
    "averagePerDay": "8.4/day",
    "remainingCredits": 22,
    "efficiency": "Good"
  },
  {
    "period": "This Billing Cycle",
    "totalCredits": 492,
    "averagePerDay": "7.8/day",
    "remainingCredits": 19,
    "efficiency": "Excellent"
  }
]

export const consumptionData = [
  {
    "id": 1,
    "propertyName": "Grand Plaza Hotel",
    "propertyId": "GP001",
    "creditsAllocated": 300,
    "creditsUsed": 285,
    "remainingCredits": 15,
    "averageDailyUsage": 3.2,
    "lastTopupDate": "2024-11-15",
    "creditStatus": "critical",
    "utilization": 95
  },
  {
    "id": 2,
    "propertyName": "Sunset Resort",
    "propertyId": "SR002",
    "creditsAllocated": 250,
    "creditsUsed": 180,
    "remainingCredits": 70,
    "averageDailyUsage": 2.1,
    "lastTopupDate": "2024-11-20",
    "creditStatus": "low",
    "utilization": 72
  },
  {
    "id": 3,
    "propertyName": "Mountain View Inn",
    "propertyId": "MV003",
    "creditsAllocated": 150,
    "creditsUsed": 89,
    "remainingCredits": 61,
    "averageDailyUsage": 1.5,
    "lastTopupDate": "2024-11-10",
    "creditStatus": "normal",
    "utilization": 59
  },
  {
    "id": 4,
    "propertyName": "Ocean Breeze Suites",
    "propertyId": "OB004",
    "creditsAllocated": 200,
    "creditsUsed": 145,
    "remainingCredits": 55,
    "averageDailyUsage": 2.8,
    "lastTopupDate": "2024-11-18",
    "creditStatus": "normal",
    "utilization": 72.5
  },
  {
    "id": 5,
    "propertyName": "City Center Hotel",
    "propertyId": "CC005",
    "creditsAllocated": 100,
    "creditsUsed": 95,
    "remainingCredits": 5,
    "averageDailyUsage": 1.8,
    "lastTopupDate": "2024-11-22",
    "creditStatus": "critical",
    "utilization": 95
  }
]

export const billingData = [
  {
      id: 1,
      invoiceNo: "INV-2024-001",
      invoiceDate: '2024-11-15',
      creditsPurchased: 500,
      paymentMode: "Credit Card",
      amountPaid: 25000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 2,
      invoiceNo: "INV-2024-002",
      invoiceDate: '2024-10-28',
      creditsPurchased: 300,
      paymentMode: "UPI",
      amountPaid: 15000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 3,
      invoiceNo: "INV-2024-003",
      invoiceDate: '2024-10-15',
      creditsPurchased: 200,
      paymentMode: "Credit Card",
      amountPaid: 10000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 4,
      invoiceNo: "INV-2024-004",
      invoiceDate: '2024-09-30',
      creditsPurchased: 400,
      paymentMode: "Bank Transfer",
      amountPaid: 20000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 5,
      invoiceNo: "INV-2024-005",
      invoiceDate: '2024-09-15',
      creditsPurchased: 150,
      paymentMode: "Credit Card",
      amountPaid: 7500,
      status: "failed",
      downloadUrl: "#"
    },
    {
      id: 6,
      invoiceNo: "INV-2024-006",
      invoiceDate: '2024-08-28',
      creditsPurchased: 250,
      paymentMode: "UPI",
      amountPaid: 12500,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 7,
      invoiceNo: "INV-2024-007",
      invoiceDate: '2024-08-15',
      creditsPurchased: 350,
      paymentMode: "Credit Card",
      amountPaid: 17500,
      status: "pending",
      downloadUrl: "#"
    },
    {
      id: 8,
      invoiceNo: "INV-2024-008",
      invoiceDate: '2024-07-30',
      creditsPurchased: 100,
      paymentMode: "Bank Transfer",
      amountPaid: 5000,
      status: "paid",
      downloadUrl: "#"
    }
]

export const initialTableData = [
  {
    id: 1,
    propertyName: "Grand Plaza Hotel",
    location: "New York, NY",
    propertyId: "GP001",
    totalRooms: 150,
    activeCheckins: 45,
  },
  {
    id: 2,
    propertyName: "Sunset Resort",
    location: "Miami, FL",
    propertyId: "SR002",
    totalRooms: 200,
    activeCheckins: 89,
  },
  {
    id: 3,
    propertyName: "Mountain View Inn",
    location: "Denver, CO",
    propertyId: "MV003",
    totalRooms: 80,
    activeCheckins: 32,
  },
  {
    id: 4,
    propertyName: "Ocean Breeze Suites",
    location: "San Diego, CA",
    propertyId: "OB004",
    totalRooms: 120,
    activeCheckins: 67,
  },
  {
    id: 5,
    propertyName: "City Center Hotel",
    location: "Chicago, IL",
    propertyId: "CC005",
    totalRooms: 180,
    activeCheckins: 54,
  },
  {
    id: 6,
    propertyName: "Heritage Palace",
    location: "Boston, MA",
    propertyId: "HP006",
    totalRooms: 95,
    activeCheckins: 28,
  },
  {
    id: 7,
    propertyName: "Lakeside Retreat",
    location: "Seattle, WA",
    propertyId: "LR007",
    totalRooms: 60,
    activeCheckins: 18,
  },
  {
    id: 8,
    propertyName: "Desert Oasis",
    location: "Phoenix, AZ",
    propertyId: "DO008",
    totalRooms: 110,
    activeCheckins: 42,
  },
];