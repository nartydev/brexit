export default class Country {
    constructor() {
        this.data = {} 

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

