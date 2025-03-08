
// Mock data for purchases and payment methods
export const MOCK_PURCHASES = [
  {
    id: "order-1",
    date: new Date().toISOString(),
    restaurant: "Bella Pasta",
    foodName: "Mystery Box - Mixed Italian Food",
    originalPrice: 24.99,
    paidPrice: 8.99,
    saved: 16.00,
    status: "completed",
    rating: 5
  },
  {
    id: "order-2",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    restaurant: "Golden Crust Bakery",
    foodName: "Bakery Surprise Pack",
    originalPrice: 15.99,
    paidPrice: 5.99,
    saved: 10.00,
    status: "completed",
    rating: 4
  },
  {
    id: "order-3",
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    restaurant: "Fresh Greens",
    foodName: "Veggie Rescue Box",
    originalPrice: 18.99,
    paidPrice: 6.99,
    saved: 12.00,
    status: "pending",
    pickupCode: "1234",
    pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  }
];

export const MOCK_PAYMENT_METHODS = [
  {
    id: "pm-1",
    cardNumber: "4242",
    cardholderName: "John Doe",
    expiryDate: "12/25",
    isDefault: true,
  },
  {
    id: "pm-2",
    cardNumber: "8888",
    cardholderName: "John Doe",
    expiryDate: "08/24",
    isDefault: false,
  }
];
