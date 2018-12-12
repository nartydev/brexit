import { Country } from './Country.js'
<<<<<<< HEAD
import { Timeline } from './Timeline.js'
=======
>>>>>>> 4a5421811d9056aeffa9c81a07b45753b69a7676

const get = (param) => {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

let country = new Country(get('country'))
