# Blockchain Based e-Vault
# eVault System: Blockchain-based Document Management

## Overview
Welcome to eVault System, a cutting-edge platform leveraging blockchain technology for secure and efficient document management. Our system ensures the highest level of security, integrity, and accessibility for your sensitive legal documents.

## Features
- **Secure Uploads**: Upload documents securely to IPFS via Pinata.
- **Blockchain Integration**: Ethereum smart contracts handle document metadata and access control.
- **Easy Retrieval**: Retrieve documents using their CID with ensured access control.
- **User-Friendly Interface**: Intuitive and responsive design for seamless user experience.

## Architecture
### Platform Components
- **Frontend**: Developed with HTML, CSS, and JavaScript, providing an intuitive interface for users.
- **Backend**: Powered by Express.js to handle HTTP requests, file uploads, and IPFS interactions.
- **Blockchain**: Ethereum blockchain for storing document metadata and managing access control through smart contracts.

### Workflow
#### Document Upload
1. **User Action**: Select and upload a document through the frontend.
2. **Backend Processing**: The file is uploaded to IPFS via Pinata.
3. **Blockchain Storage**: The file's CID is stored on the Ethereum blockchain, ensuring immutable and secure storage.

#### Document Retrieval
1. **User Action**: Input the CID to retrieve a document.
2. **Backend Processing**: Verify access rights through the blockchain.
3. **Document Access**: If authorized, the document link is fetched from IPFS and provided to the user.

## Technology Stack
### Blockchain
- **Ethereum**: Decentralized platform for smart contracts.
- **Ganache**: Personal blockchain for local development and testing.
- **Truffle**: Framework for smart contract lifecycle management.
- **MetaMask**: Browser extension for secure Ethereum transactions.

### Storage
- **Pinata**: IPFS pinning service for reliable file storage and retrieval.

### Backend
- **Express.js**: Web framework for handling requests and managing file uploads.
- **Web3.js**: JavaScript library for Ethereum blockchain interactions.
- **Axios**: Promise-based HTTP client for API requests.

### Frontend
- **HTML/CSS/JavaScript**: Building blocks for a responsive and user-friendly interface.

## Design and User Experience
- **Typography**: Consistent use of "Courier New" for a monospaced, professional look.
- **Color Scheme**: Complementary grey and blue tones to align with the Societe Generale brand.
- **Responsive Design**: Ensures the platform is accessible on all devices.

## Getting Started
### Prerequisites
- Install [MetaMask](https://metamask.io/) for Ethereum transactions.
- Set up [Ganache](https://www.trufflesuite.com/ganache) for local blockchain development.

### Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/eVault-System.git
    cd eVault-System
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Server**:
    ```bash
    nodemon server.js
    ```

4. **Open in Browser**:
    Navigate to `http://localhost:3000` to access the platform.

## Usage
1. **Upload Document**: Select a file and click "Upload Document". The document will be uploaded to IPFS, and the CID will be stored on the blockchain.
2. **Retrieve Document**: Enter the CID of the document and click "Retrieve Document". The system will verify access and provide a link to the document.

## Support
For support, contact [nivakved05@gmail.com](mailto:nivakved05@gmail.com).

---

© 2024 eVault System. All rights reserved.

