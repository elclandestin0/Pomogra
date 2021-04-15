//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
    @title Pomogra
    @author Memo Khoury
    @dev TODO: add description later
 */

contract Pomogra {
    Paper[] private _chain;
    address[] private _owners;
    mapping(address => bool) _ownerExists;
    enum PaperType {Positive, Motivational, Gratitude}
    struct Paper {
        string message;
        address owner;
        PaperType paperType;
    }

    function chain() public view returns(Paper[] memory){
        return _chain;
    }

    function owners() public view returns(address[] memory) {
        return _owners;
    }

    function ownerExists(address owner_) public view returns (bool) {
        return _ownerExists[owner_];
    } 

    function addPaper(string memory message_, PaperType paperType_) public {
        _chain.push(Paper(message_, msg.sender, paperType_));
        if (_ownerExists[msg.sender] == false) {
            _ownerExists[msg.sender] = true;
            _owners.push(msg.sender);
        }
    }
}
