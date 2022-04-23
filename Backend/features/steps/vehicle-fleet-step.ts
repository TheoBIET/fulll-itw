import { Given, When, Then } from "@cucumber/cucumber";
import { Fleet } from "../../src/domain/Fleet";
import { Vehicle } from "../../src/domain/Vehicle";
import { Location } from "../../src/domain/Location";
import { expect } from "chai";

const LOC = [43.1275054, 3.2349681];
const VALID_PLATE_NUMBER = "AA-AA-1234";

Given("my fleet", function () {
  this.fleet = new Fleet(1, []);
});

Given("a vehicle", function () {
  this.vehicle = new Vehicle(1, VALID_PLATE_NUMBER, new Location(1, 1), []);
});

// Scenario: I can register a vehicle
When("I register this vehicle into my fleet", function () {
  this.fleet.registerVehicle(this.vehicle);
});

Then("this vehicle should be part of my vehicle fleet", function () {
  expect(this.fleet.vehicles).contain(this.vehicle);
});

// Scenario: I can't register same vehicle twice
Given("I have registered this vehicle into my fleet", function () {});

When("I try to register this vehicle into my fleet", function () {
  this.fleet.registerVehicle(this.vehicle);
});

Then(
  "I should be informed if this vehicle has already been registered into my fleet",
  function () {}
);

// Scenario: Same vehicle can belong to more than one fleet
Given("the fleet of another user", function () {
  this.otherFleet = new Fleet(2, []);
});

Given("a vehicle of another user", function () {
  this.otherVehicle = new Vehicle(2, VALID_PLATE_NUMBER, new Location(1, 1), []);
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    this.otherFleet.registerVehicle(this.otherVehicle);
  }
);

// Background
Given("a location", function () {
  this.location = new Location(LOC[0], LOC[1]);
});

// Scenario: Successfully park a vehicle
When("I park my vehicle at this location", function () {
  this.vehicle.park(this.location);
});

Then(
  "the known location of my vehicle should verify this location",
  function () {
    expect(this.vehicle.location).to.deep.equal(this.location);
  }
);

// Scenario: Can't localize my vehicle to the same location two times in a row
Given("my vehicle has been parked into this location", function () {});

When("I try to park my vehicle at this location", function () {
  this.vehicle.park(this.location);
});

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {}
);
