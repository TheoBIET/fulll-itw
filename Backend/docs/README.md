# Fulll - Backend

### Steps
1 - Install application dependencies
```js
yarn
```

2 - Initialize Database
```js
yarn db:init
```

3 - Test Application
```js
yarn test
```

### Command Line Tools
- Create a new fleet
```shell
./fleet create <userId> # returns fleetId on the standard output
```

- Register a new vehicle
```shell
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
```

- Localize a vehicle
```shell
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```