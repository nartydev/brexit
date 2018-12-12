class Country {
    
    constructor(country) {
        this.data = {} 
        this.countrySelect = country

        this.getData()
    }

    getData() {
        window
        .fetch('assets/data/data-country.json')
        .then(_response => _response.json())
        .then(_data =>
        {
            this.data = _data
        })
    }

    putDataInHTML() {
        // Select property 
        // Insert in 
    }

}

export { Country }
