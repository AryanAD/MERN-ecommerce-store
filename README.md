# E-Commerce Store - Modern MERN Stack Application

A fully functional, production-ready e-commerce platform with role-based authentication, payment integration, and comprehensive store management capabilities.

## Navigation

- [Tech Stack](#tech-stack)
- [Roles and Features](#roles--features)
- [Key Features](#key-features)
- [Installation & Setup](#installation--setup)
- [Demo Pages](#demo-pages)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Tech Stack

- **Frontend**: React (Vite, TypeScript), Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js, MongoDB
- **State Management**: Redux Toolkit
- **Payment Integration**: PayPal
- **Authentication**: JWT, Role-based access control
- **Image Handling**: Cloudinary/Multer
- **Icons**: React Icons

## Roles & Features

### Admin

- Create and manage product categories
- Add, edit, and delete products
- View sales analytics and metrics
- Manage and process orders (approve/cancel)
- View and manage user accounts
- Access to comprehensive admin dashboard

### Registered Users

- Browse and search products
- Add products to cart and wishlist
- Complete purchases with PayPal integration
- View order history and tracking
- Manage personal profile and preferences
- Favorite products for later viewing

### Visitors (No Account Required)

- Browse products and categories
- View product details and reviews
- Favorite products (saved in local storage)
- Responsive shopping experience across devices

## Key Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Product Carousel**: Featured products showcase
- **Advanced Filtering**: Search by category, price range, ratings
- **Wishlist Functionality**: Save favorites without login
- **Payment Integration**: Secure PayPal checkout process
- **Order Management**: Complete order lifecycle tracking
- **Admin Dashboard**: Analytics, sales reports, and user insights
- **Role-Based Authentication**: Secure access control
- **Responsive Design**: Optimized for all device sizes

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/aryanad/mern-ecommerce-store.git
   cd mern-ecommerce-store
   ```

2. **Install dependencies**

   ```bash
   # Install backend and root dependencies
   npm i --legacy-peer-deps

   # Install frontend dependencies
   cd ../frontend
   npm i --legacy-peer-deps
   ```

3. **Set up environment variables**

   Create a `.env` file in the backend directory:

   ```text
   NODE_ENV=development
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PAYPAL_CLIENT_ID=<your_paypal_client_id>
   PORT=5000
   ```

4. **Run the development server**

   ```bash
   # Start the server
   npm run dev
   ```

5. **Open your browser**  
   Visit: [http://localhost:5173](http://localhost:5173)

## Demo Pages

`Admin Dashboard` ![Admin Dashboard](/screenshots/admin-dashboard.png)
`Edit Product` ![Edit Product](/screenshots/edit-product.png)
`Favorite Products` ![Favorite Products](/screenshots/favorite-products.png)
`Manage Users` ![Manage Users](/screenshots/manage-users.png)
`Order Placement` ![Order Placement](/screenshots/order-placement.png)
`Paypal Integration` ![Paypal Integration](/screenshots/paypal-integration.png)
`Product Detail` ![Product Detail](/screenshots/product-detail.png)
`Product List` ![Product List](/screenshots/product-list.png)

## Usage

- **Visitors**: Browse products, add to wishlist, create account to purchase
- **Users**: Complete purchases, track orders, manage wishlist and profile
- **Admins**: Manage inventory, process orders, view analytics, control users

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [PayPal](https://www.paypal.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
<hr>
🛒 <b>A complete e-commerce solution with modern features, secure payments, and intuitive management tools.</b>
