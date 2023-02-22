
# Vehicle Scenario Manager

This application allows users to create, display, update, and delete scenarios and vehicles. A scenario can have multiple vehicles, and vehicles can be moved based on the scenario and vehicle parameters.

## Features
* Create, display, update, and delete scenarios
* Create, display, update, and delete vehicles
* Move vehicles when the user clicks a button based on the direction and speed 
* Vehicles will be hidden if they go outside of the container. Proper validation when adding vehicles to prevent positions greater than the graph container size

## Technologies
* React
* Axios for API calls
* CSS for styling
* json-server for data storage

# Installation
To install and run the application, follow these steps:

### Clone the repository to your local machine using the following command:

**git clone** 

https://github.com/Visishta-ch/vehicle-scenario-manager.git

**Navigate to the project directory**

*cd vehicle-scenario-manager*

**Install the required dependencies**

*npm install*

**Start the application**

*npm start*

**Start the json-server**

*json-server --watch db.json --port 3006*

## Usage

Once the application is running, you can access it at http://localhost:3000.

You can create, display, update, and delete scenarios and vehicles from the sidebar. When you are ready to start the simulation, select a scenario and click the "Start Simulation" button. The vehicles will start moving based on their direction and speed until the scenario time is up.

If a vehicle goes outside of the container, it will be hidden.

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.




