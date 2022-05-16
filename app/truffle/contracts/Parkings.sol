// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Parkings {
    address public owner = msg.sender;

    struct Parking {
        string parkingNumber;
        uint256 price;
        address owner;
        address renter;
        bool hasValue;
    }

    mapping(string => Parking) private parkingMap;
    Parking[] public parkings;

    constructor() {}

    function getAvailableParkings()
        public
        view
        returns (string[] memory, uint256[] memory)
    {
        string[] memory availableParkingsNumber = new string[](parkings.length);
        uint256[] memory availableParkingsPrice = new uint256[](
            parkings.length
        );

        for (uint256 i = 0; i < parkings.length; i++) {
            Parking memory parking = parkings[i];
            if (parking.renter == address(0x0)) {
                availableParkingsNumber[i] = parking.parkingNumber;
                availableParkingsPrice[i] = parking.price;
            }
        }

        return (availableParkingsNumber, availableParkingsPrice);
    }

    function getParkingOwnerByParkingNumber(string memory _parkingNumber)
        public
        view
        returns (address)
    {
        return parkingMap[_parkingNumber].owner;
    }

    function getParkingRenterByParkingNumber(string memory _parkingNumber)
        public
        view
        returns (address)
    {
        return parkingMap[_parkingNumber].renter;
    }

    function createParking(string memory _parkingNumber) public payable {
        if (!parkingMap[_parkingNumber].hasValue) {
            parkingMap[_parkingNumber] = Parking({
                parkingNumber: _parkingNumber,
                price: msg.value,
                owner: msg.sender,
                renter: address(0x0),
                hasValue: true
            });
            parkings.push(parkingMap[_parkingNumber]);
        }
    }

    function rentParking(string memory _parkingNumber) public payable {
        require(parkingMap[_parkingNumber].renter == address(0x0));
        require(msg.value >= parkingMap[_parkingNumber].price);
        parkingMap[_parkingNumber].renter = msg.sender;
    }
}
