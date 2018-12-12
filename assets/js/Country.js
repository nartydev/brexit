export default class Country {
    
    constructor(country) {
        this.data = {} 
        this.countrySelect = country

        getData()
    }

    getData() {
        window
        .fetch('../data/data-country.json')
        .then(_response => _response.json())
        .then(_data =>
        {
            this.data = _data
        })
    }


}

