import { Fleet } from "./Fleet";
import { Location } from "./Location";

export class Vehicle {
  constructor(
    public readonly id: number,
    public readonly plateNumber: string,
    public location: Location,
    public readonly fleets: Fleet[]
  ) {
    const plateRegex = /^[A-Z]{1,3}-[A-Z]{1,2}-[0-9]{1,4}$/;

    if (!plateNumber) {
      throw new Error("Plate number is required");
    }

    if (!plateRegex.test(plateNumber)) {
      throw new Error("Plate number is not valid");
    }
  }

  park(location: Location) {
    if (this.location.equals(location)) {
      throw new Error(
        `Vehicle with plate ${this.plateNumber} is already parked here`
      );
    }

    this.location = location;
  }
}
