import { Vehicle } from "./Vehicle";

export class Fleet {
  constructor(
    public readonly id: number,
    public readonly vehicles: Vehicle[]
  ) { }

  registerVehicle(vehicle: Vehicle) {
    if (this.vehicles.find((v) => v.id === vehicle.id)) {
      throw new Error(
        `Vehicle with plate ${vehicle.plateNumber} has already been registered into fleet ${this.id}`
      );
    }

    this.vehicles.push(vehicle);
  }
}
