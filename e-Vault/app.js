const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "cid",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "DocumentRetrieved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "cid",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sharedWith",
          "type": "address"
        }
      ],
      "name": "DocumentShared",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "cid",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "link",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "DocumentUploaded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "link",
          "type": "string"
        }
      ],
      "name": "uploadDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "shareDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "retrieveDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "hasAccess",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "getDocumentOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "getDocumentLink",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
const contractAddress = '0x7E56AFAcdf2CB9015F0A505b45612b41D6F24E55';
async function init() {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
      displayMessage('Please install MetaMask!', 'error');
  }
}

async function uploadDocument() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
      displayMessage('Please select a file.', 'error');
      return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
      const response = await fetch('/upload', {
          method: 'POST',
          body: formData
      });

      const data = await response.json();
      const cid = data.cid;
      const ipfsLink = data.ipfsLink;

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      window.contract.methods.uploadDocument(cid, ipfsLink).send({ from: account })
          .on('receipt', function (receipt) {
              displayMessage(`Document uploaded successfully! CID: ${cid}, Link: ${ipfsLink}`, 'success');
          })
          .on('error', function (error) {
              displayMessage('Error uploading document to blockchain.', 'error');
              console.error('Error uploading document:', error);
          });
  } catch (error) {
      displayMessage('Error uploading file to server.', 'error');
      console.error('Error uploading file:', error);
  }
}

async function retrieveDocument() {
  const docId = document.getElementById('retrieveDocId').value;

  if (!docId) {
      displayMessage('Please enter a document ID.', 'error');
      return;
  }

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  try {
      const link = await window.contract.methods.getDocumentLink(docId).call({ from: account });
      window.open(link, '_blank');
      displayMessage('Document retrieved successfully!', 'success');
  } catch (error) {
      displayMessage('Document not found or access denied.', 'error');
      console.error('Error retrieving document:', error);
  }
}

function displayMessage(message, type) {
  const messageElement = document.getElementById('message');
  messageElement.innerText = message;
  messageElement.style.display = 'block';
  messageElement.style.color = type === 'success' ? 'green' : 'red';
}

document.getElementById('uploadBtn').addEventListener('click', uploadDocument);
document.getElementById('retrieveBtn').addEventListener('click', retrieveDocument);

window.addEventListener('load', init);
