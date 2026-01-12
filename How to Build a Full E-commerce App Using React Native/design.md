# E-Commerce Grocery App Design Plan

## Overview
A comprehensive e-commerce mobile application similar to JioMart, enabling users to browse, search, and purchase groceries, kids items, clothes, books, and other products. The app includes user authentication, shopping cart management, payment processing, and OTP-based delivery verification.

---

## Screen List

### Authentication Screens
1. **Splash Screen** - App logo and loading indicator
2. **Login Screen** - Phone number/email and password input
3. **Registration Screen** - User registration with email, phone, password
4. **OTP Verification Screen** - OTP input for phone verification
5. **Forgot Password Screen** - Password recovery flow

### Main App Screens
6. **Home Screen** - Featured products, category banners, promotional offers
7. **Category Browse Screen** - Products filtered by category (Groceries, Kids, Clothes, Books, etc.)
8. **Product Detail Screen** - Product image, description, price, reviews, add to cart
9. **Search Screen** - Search products by name, filters by price/rating
10. **Shopping Cart Screen** - Cart items, quantity adjustment, total price calculation
11. **Checkout Screen** - Delivery address, payment method selection
12. **Payment Screen** - Payment gateway integration (Razorpay/PayPal)
13. **Order Confirmation Screen** - Order summary and OTP delivery verification
14. **Orders Screen** - User's order history and status tracking
15. **Wishlist Screen** - Saved products for later purchase
16. **Profile Screen** - User account details, addresses, preferences
17. **Settings Screen** - App settings, notifications, language, logout

---

## Primary Content and Functionality

### Home Screen
- **Hero Banner** - Rotating promotional banners
- **Category Grid** - 6-8 quick-access category tiles (Groceries, Kids, Clothes, Books, Electronics, Home & Garden, Beauty, Sports)
- **Featured Products** - Horizontal scrollable list of trending/new products
- **Flash Deals** - Limited-time offers section
- **Personalized Recommendations** - Based on browsing history

### Category Browse Screen
- **Category Header** - Selected category name and product count
- **Filter Options** - Price range, ratings, availability, brand
- **Sort Options** - Popularity, price (low-high), price (high-low), newest
- **Product Grid** - 2-column grid showing product image, name, price, rating
- **Load More** - Pagination for large product lists

### Product Detail Screen
- **Product Images** - Main image with thumbnail carousel
- **Product Info** - Name, brand, rating, number of reviews
- **Price Display** - Original price (strikethrough), discount percentage, final price in ₹
- **Description** - Product details and specifications
- **Quantity Selector** - Increment/decrement quantity
- **Add to Cart Button** - Primary action button
- **Add to Wishlist** - Secondary action (heart icon)
- **Reviews Section** - Customer reviews and ratings
- **Related Products** - Suggested similar items

### Shopping Cart Screen
- **Cart Items List** - Product image, name, price, quantity controls
- **Remove Item** - Swipe or delete button for each item
- **Subtotal Calculation** - Sum of all items
- **Discount Display** - Applied coupon/discount amount
- **Delivery Charges** - Shipping cost (free above threshold)
- **Total Price** - Final amount to pay
- **Proceed to Checkout** - Primary action button

### Checkout Screen
- **Delivery Address** - Select or add new address
- **Delivery Date/Time** - Estimated delivery window
- **Payment Method Selection** - Credit/Debit card, UPI, Wallet, COD
- **Coupon Code** - Apply discount code
- **Order Summary** - Item list with final total
- **Place Order Button** - Confirm and proceed to payment

### Payment Screen
- **Payment Gateway** - Razorpay/PayPal integration
- **Order Details** - Total amount and items
- **Payment Status** - Processing indicator

### Order Confirmation Screen
- **Order Number** - Unique order ID
- **OTP Input** - For delivery verification
- **Delivery Details** - Expected delivery date/time
- **Order Summary** - Items purchased and total
- **Track Order Button** - Navigate to order tracking

### Orders Screen
- **Active Orders** - Current orders with status
- **Order History** - Past orders with dates
- **Order Card** - Order ID, date, total, status, track button
- **Order Details** - Expandable section showing items and delivery info

### Wishlist Screen
- **Saved Items** - Grid of wishlist products
- **Move to Cart** - Quick add to cart from wishlist
- **Remove from Wishlist** - Delete button
- **Empty State** - Message when no items saved

### Profile Screen
- **User Avatar** - Profile picture
- **User Details** - Name, email, phone number
- **Saved Addresses** - List of delivery addresses with edit/delete
- **Payment Methods** - Saved cards and payment options
- **Preferences** - Notification settings, language
- **Help & Support** - Contact support, FAQs
- **Logout Button** - Sign out from app

---

## Key User Flows

### Registration & Login Flow
1. User opens app → Splash screen
2. If not logged in → Login screen
3. User enters phone/email and password
4. System sends OTP to phone/email
5. User enters OTP → OTP Verification screen
6. Verification successful → Home screen
7. If new user → Registration screen (name, email, phone, password)
8. Complete registration → OTP verification → Home screen

### Browse & Purchase Flow
1. User views Home screen with categories and featured products
2. User taps category → Category Browse screen
3. User applies filters/sorts → Product list updates
4. User taps product → Product Detail screen
5. User selects quantity and taps "Add to Cart"
6. User continues shopping or taps cart icon → Shopping Cart screen
7. User reviews items and taps "Proceed to Checkout"
8. User selects delivery address and payment method → Checkout screen
9. User taps "Place Order" → Payment screen
10. Payment successful → Order Confirmation screen
11. User enters OTP for delivery verification
12. Order placed successfully → Orders screen

### Search Flow
1. User taps search icon → Search screen
2. User types product name
3. Results display in real-time
4. User applies filters (price, rating, brand)
5. User taps product → Product Detail screen
6. User adds to cart and proceeds to checkout

### Order Tracking Flow
1. User navigates to Orders screen
2. User taps active order → Order details expand
3. User sees order status, delivery address, estimated time
4. User taps "Track Order" → Real-time tracking map (if available)
5. On delivery day, user receives OTP
6. Delivery person enters OTP for verification

---

## Color Scheme

### Primary Colors
- **Primary Brand Color**: #FF6B35 (Vibrant Orange) - Used for buttons, highlights, CTAs
- **Secondary Color**: #004E89 (Deep Blue) - Used for headers, important text
- **Accent Color**: #00A676 (Fresh Green) - Used for success states, delivery confirmations

### Neutral Colors
- **Background**: #FFFFFF (White) - Main app background
- **Surface**: #F8F9FA (Light Gray) - Card backgrounds, sections
- **Text Primary**: #1A1A1A (Dark Gray) - Main text
- **Text Secondary**: #666666 (Medium Gray) - Secondary text, labels
- **Border**: #E0E0E0 (Light Border) - Dividers, borders

### Semantic Colors
- **Success**: #00A676 (Green) - Order confirmation, successful actions
- **Warning**: #FFA500 (Orange) - Alerts, warnings
- **Error**: #E63946 (Red) - Errors, cancellations
- **Info**: #004E89 (Blue) - Information messages

### Dark Mode
- **Background**: #1A1A1A (Dark)
- **Surface**: #2D2D2D (Dark Gray)
- **Text Primary**: #FFFFFF (White)
- **Text Secondary**: #B0B0B0 (Light Gray)
- **Border**: #404040 (Dark Border)

---

## Typography

- **Headings (H1)**: Font size 28px, Font weight 700, Line height 1.3
- **Headings (H2)**: Font size 24px, Font weight 700, Line height 1.3
- **Headings (H3)**: Font size 20px, Font weight 600, Line height 1.4
- **Body Text**: Font size 16px, Font weight 400, Line height 1.5
- **Small Text**: Font size 14px, Font weight 400, Line height 1.4
- **Buttons**: Font size 16px, Font weight 600, Line height 1.2

---

## Layout & Spacing

- **Safe Area Padding**: 16px on sides, 12px top/bottom
- **Card Padding**: 16px internal padding
- **Component Gap**: 12px between elements
- **Section Gap**: 24px between major sections
- **Button Height**: 48px (touch-friendly for mobile)
- **Icon Size**: 24px (standard), 32px (large), 16px (small)

---

## Interaction Patterns

### Buttons
- **Primary Button**: Solid background (#FF6B35), white text, 48px height, rounded corners
- **Secondary Button**: Outline style, border color, transparent background
- **Tertiary Button**: Text-only, no background
- **Disabled State**: 50% opacity, no interaction

### List Items
- **Product Card**: Image, name, price, rating, add to cart button
- **Order Card**: Order ID, date, status badge, total price
- **Address Card**: Address text, edit/delete buttons

### Input Fields
- **Text Input**: Border on focus, placeholder text, error state styling
- **Quantity Selector**: Minus/plus buttons with current quantity display
- **Dropdown**: Chevron icon, expandable list

### Feedback
- **Loading**: Spinner or skeleton screens
- **Success**: Toast notification with checkmark
- **Error**: Toast notification with error icon and message
- **Empty State**: Illustration and message when no data available

---

## Navigation Structure

```
├── Splash Screen
├── Authentication Stack
│   ├── Login
│   ├── Registration
│   ├── OTP Verification
│   └── Forgot Password
└── Main App (Tab Navigation)
    ├── Home
    │   ├── Category Browse
    │   └── Product Detail
    ├── Search
    │   └── Product Detail
    ├── Cart
    │   ├── Checkout
    │   ├── Payment
    │   └── Order Confirmation
    ├── Orders
    │   └── Order Details
    ├── Wishlist
    │   └── Product Detail
    └── Profile
        ├── Addresses
        ├── Payment Methods
        └── Settings
```

---

## Performance Considerations

- **Image Optimization**: Use compressed images, lazy loading for product lists
- **Pagination**: Implement infinite scroll or pagination for product lists
- **Caching**: Cache product data, user preferences locally
- **API Optimization**: Batch requests, reduce payload size
- **State Management**: Use efficient state management (Context API or Redux)

---

## Accessibility

- **Touch Targets**: Minimum 48px for buttons and interactive elements
- **Color Contrast**: WCAG AA compliant text contrast ratios
- **Text Labels**: All inputs and icons have descriptive labels
- **Screen Reader Support**: Proper semantic HTML and ARIA labels
- **Font Sizes**: Minimum 14px for body text, 16px for inputs

---

## Responsive Design

- **Portrait Orientation**: Primary layout (9:16 aspect ratio)
- **Landscape Support**: Adapted layouts for landscape mode
- **Tablet Support**: Optimized for larger screens (if needed)
- **Web Support**: Responsive design for web browsers

