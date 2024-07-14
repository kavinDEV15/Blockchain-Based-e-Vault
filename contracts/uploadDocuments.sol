// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract LegalEVault {
    struct Document {
        string cid;
        string link;
        address owner;
        bool exists;
        mapping(address => bool) sharedWith;
    }

    mapping(string => Document) private documents;

    event DocumentUploaded(string indexed cid, string link, address indexed owner);
    event DocumentShared(string indexed cid, address indexed owner, address indexed sharedWith);
    event DocumentRetrieved(string indexed cid, address indexed requester);

    modifier onlyOwner(string memory cid) {
        require(documents[cid].owner == msg.sender, "Caller is not the owner");
        _;
    }

    modifier documentExists(string memory cid) {
        require(documents[cid].exists, "Document does not exist");
        _;
    }

    function uploadDocument(string memory cid, string memory link) public {
        require(!documents[cid].exists, "Document already exists");

        Document storage newDocument = documents[cid];
        newDocument.cid = cid;
        newDocument.link = link;
        newDocument.owner = msg.sender;
        newDocument.exists = true;

        emit DocumentUploaded(cid, link, msg.sender);
    }

    function shareDocument(string memory cid, address user) public onlyOwner(cid) documentExists(cid) {
        documents[cid].sharedWith[user] = true;
        emit DocumentShared(cid, msg.sender, user);
    }

    function retrieveDocument(string memory cid) public documentExists(cid) {
        emit DocumentRetrieved(cid, msg.sender);
    }

    function hasAccess(string memory cid, address user) public view documentExists(cid) returns (bool) {
        return documents[cid].owner == user || documents[cid].sharedWith[user];
    }

    function getDocumentOwner(string memory cid) public view documentExists(cid) returns (address) {
        return documents[cid].owner;
    }

    function getDocumentLink(string memory cid) public view documentExists(cid) returns (string memory) {
        return documents[cid].link;
    }
}
