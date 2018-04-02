# Visit London's Parks

### Description
Webpage that finds the best routes from user's location to the most beautiful London's Parks. Users can choose their preferred mode of transport and select any of the 8 biggest London's Parks! 

Project built with Google Maps API.

Live demo available [here](https://rafmosiolek.github.io/visit-london-parks/).

---

### Screenshot

<img align="middle" width="371" height="660"
     title="Size Limit logo" src="https://raw.githubusercontent.com/rafmosiolek/visit-london-parks/master/assets/img/Nexus5X-screenshot.png">

--- 

## Installation

**Prerequisites:**
* [Node.js with its package ecosystem npm](https://nodejs.org/en/)

To run this app locally:
1. Clone the repository 
``` $ git clone https://github.com/rafmosiolek/visit-london-parks.git ``` 
and navigate into the folder ``` cd visit-london-parks ```
2. Install dependencies from package.json
``` $ npm install ```
3. Run the local server
``` $ gulp serve```
4. Navigate to ```localhost:8000/index.html``` in your browser

## Technology:

- JavaScript
- SCSS
- HTML5
- Google Maps JavaScript API
- Google Maps Directions API

### Ways to improve:
- refactor main.js code to reduce levels of abstraction in functions;
- refactor main.js code to reduce duplications in functions by creating more reusable functions;
- add unit and browser tests;
- improve page performance by minifing JavaScript and CSS;
- notify users their location hasn't been found yet when they try to find directions before their geolocation was received;
- allow users to select their starting location without the geolocation;
- display three best possible routes not one;

## Resources 
* [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript/)
* [Google Maps Directions API Documentation](https://developers.google.com/maps/documentation/directions/intro)
* [Google Maps Styling Wizard](https://mapstyle.withgoogle.com/)