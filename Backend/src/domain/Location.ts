export class Location {
  constructor(
    public readonly longitude: number,
    public readonly latitude: number
  ) {
    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be between -180 and 180");
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be between -90 and 90");
    }
  }

  equals(other: Location): boolean {
    return (
      this.longitude === other.longitude && this.latitude === other.latitude
    );
  }
}
