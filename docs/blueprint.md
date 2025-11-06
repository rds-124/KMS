# **App Name**: Tulunadu E-Store

## Core Features:

- Product Catalog: Browse and filter products by category, sub-category, price, and other attributes.
- Product Details: View detailed product information, including images, description, pricing, stock status, and customer reviews.
- Shopping Cart: Add products to a shopping cart and manage quantities.
- Checkout Process: Complete the checkout process with secure payment integration via Razorpay or Cashfree, including shipping calculation based on order subtotal and delivery location.
- Order Management: Cloud Function to create an order in Firestore after stock validation and total calculation. Razorpay webhook updates order status upon successful payment, triggering email and optional WhatsApp notifications. COD option available.
- Admin Panel: A secure admin UI for managing products, viewing orders, changing order status, and importing products from CSV files.
- Out-of-Stock Notification: Capture user emails via a Firestore trigger for out-of-stock items, notifying them when the items are restocked.

## Style Guidelines:

- Primary color: A warm, earthy saffron (#FFB347) reflecting Tulunadu's cultural richness.
- Background color: Light beige (#F5F5DC), providing a neutral and calming backdrop that highlights the products and other visual elements.
- Accent color: A deep, natural green (#2E8B57) for highlights and calls to action, connecting to the region's landscape and conveying trust and stability.
- Body font: 'PT Sans', a humanist sans-serif, offering a blend of modernity and approachability, suitable for a wide audience and comfortable reading.
- Headline font: 'Playfair', a modern sans-serif offering elegance and readability, to be paired with 'PT Sans'.
- Simple, clear icons for categories, cart, account, and other key functions.
- Category-first navigation with a prominent announcement bar. Trust tiles should build confidence. Product grid with clear discount indicators. WhatsApp support button for direct communication.