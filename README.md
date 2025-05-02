# Banking Simulation Application - Frontend

This project is the frontend for a banking simulation application that provides a variety of online banking services. It is designed to offer users a seamless and intuitive experience for managing their financial activities.

## Features

The application includes the following functionalities:

- **Paying Bills and Fees**: Easily pay school fees, utility bills, and other expenses.
- **Buying Airtime**: Purchase airtime for mobile phones directly from your account.
- **Requesting Balance Information**: View your account balance in real-time.
- **Topping Up Funds**: Add funds to your account using PayPal integration.
- **AI Integration**: Leverages TensorFlow.js for advanced money-lending services.

The backend is powered by a Java-based REST API that handles all core functionalities and data processing.

---

## Technologies Used

The frontend of this application is built using modern web technologies:

<div>
  <img src="./src/LoginPage/Images/Css-logo.jpeg" alt="CSS Logo" width="50" height="50" />
  <img src="./src/LoginPage/Images/html-logo.png" alt="HTML Logo" width="50" height="50" />
  <img src="./src/LoginPage/Images/Untitled.png" alt="Java Logo" width="50" height="50" />
  <img src="./src/LoginPage/Images/Java-script-Logo.png" alt="JavaScript Logo" width="50" height="50" />
</div>

- **React.js**: For building the user interface.
- **React Router**: For managing navigation between pages.
- **Axios**: For making HTTP requests to the backend API.
- **Bootstrap**: For responsive and modern UI components.
- **Google Maps API**: For ATM location services.
- **HTML2Canvas & jsPDF**: For generating downloadable PDFs of transaction and loan histories.

---

## Project Highlights

- **Java Backend**: Handles all core functionalities and data processing using a RESTful API.
- **PayPal Integration**: Provides secure and convenient top-up options for users.
- **Interactive Interface**: Offers a user-friendly interface for essential banking services.
- **ATM Finder**: Locate nearby ATMs using Google Maps integration.
- **PDF Export**: Download transaction and loan histories as PDF files.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/banking-simulation-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd banking-simulation-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

The project is organized as follows:

```
banking-simulation-frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Favicon for the application
├── src/
│   ├── App.js              # Main React component
│   ├── index.js            # Entry point for the React application
│   ├── LoginPage/          # Components related to user authentication
│   │   ├── LoginForm.js    # Login form component
│   │   ├── RegisterForm.js # Registration form component
│   │   └── Images/         # Images used in the login page
│   ├── OptionsRouting/     # Components for banking services
│   │   ├── Transactions.js # Transaction-related components
│   │   ├── Loans.js        # Loan-related components
│   │   └── Payments.js     # Payment-related components
│   ├── styles/             # CSS and styling files
│   └── utils/              # Utility functions and helpers
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## Future Enhancements

- **Dark Mode**: Add a dark mode toggle for better accessibility.
- **Multi-Language Support**: Provide support for multiple languages.
- **Enhanced Security**: Implement two-factor authentication for added security.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- **React.js**: For providing a robust framework for building the frontend.
- **Google Maps API**: For enabling ATM location services.
- **PayPal**: For seamless payment integration.

---

## Contact

For any inquiries or contributions, please contact:
- **Email**: musungaretanaka@gmail.com
- **Website**: [Accute Banking](https://front-end-gray-one.vercel.app/)
