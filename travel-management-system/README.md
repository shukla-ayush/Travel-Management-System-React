This is the Project repository for Travel Management System. This repsoitory is for the client side of the application which has been developed using React JS. As per the functionality, this application will allow a customer 

* to search for hotels in different cities and check their availability on the required dates,
* to view points of interests/attractions near a location,
* to search restaurants/cafes by their name or location.

The API's that we are using in the application are - 

* Amadeus' sandbox api for finding hotels at a given location (location is given in geographical latitudes, longitude and radius)
* Google's Places API (Geocoding API) to obtain Latitude/Longitude when user enters a location (so that the sandbox api can be given latitude and longitude.)
* Open Table API, to search for restaurants at a given location, or by keywords.

In the current prototype of the application, we have integrated the above mentioned API's into the application. We have been able to accept the user input for location/keywords and render the appropriate list of hotels/restaurants/attractions. 

Note - 
* The attractions take some time to load.
* As for the API key's, google and amadeus does not allow API keys to be public, which is why we cannot include them as such in this repository. Please ask any of the us to provide you the API key while you are testing the application. 
