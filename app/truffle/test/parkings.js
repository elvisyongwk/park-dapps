const Parkings = artifacts.require("Parkings");
const assert = require('assert');

contract("Parkings", function (accounts) {
  const OWNER = accounts[1];
  const RENTER = accounts[2];

  describe('getAvailableParkings', () => {
    it('should have 0 available parkings by default', async () => {
      const instance = await Parkings.deployed();
      const { 0: parkingNumbers, 1: prices } = await instance.getAvailableParkings();
      assert.equal(parkingNumbers.length, 0, 'The available parkings number should be empty.');
      assert.equal(prices.length, 0, 'The available parkings prices should be empty.')
    });
  });

  describe('createParking & getParkingOwnerByParkingNumber', () => {
    it('should have 1 available parkings after create', async () => {
      const instance = await Parkings.deployed();
      const { 0: parkingNumbers, 1: prices } = await instance.getAvailableParkings();
      assert.equal(parkingNumbers.length, 0);
      assert.equal(prices.length, 0)

      await instance.createParking('A1', { from: OWNER, value: 1});

      const { 0: newParkingNumbers, 1: newPrices } = await instance.getAvailableParkings();
      assert.equal(newParkingNumbers.length, 1, 'The parking has been created.');
      assert.equal(newPrices.length, 1, 'The parking has been created.')
      assert.equal(newParkingNumbers[0], 'A1');
      assert.equal(newPrices[0], 1);
    });

    it('should set owner address for created parking', async () => {
      const instance = await Parkings.deployed();
      await instance.createParking('A1', { from: OWNER, value: 1});
      const owner = await instance.getParkingOwnerByParkingNumber('A1');
      assert.equal(owner, OWNER);
    });
  });

  describe('rentParking & getParkingRenterByParkingNumber', () => {
    it('should set renter address for rented parking', async () => {
      const instance = await Parkings.deployed();
      await instance.rentParking('A1', { from: RENTER, value: 1});
      const renter = await instance.getParkingRenterByParkingNumber('A1');
      assert.equal(renter, RENTER);
    });
  });
});
