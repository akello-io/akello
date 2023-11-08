

export class StateRate {
    name: string
    rate_99493: number
    medicaid: boolean
    medicaid_99493?: number

    constructor(name: string, rate_99493:number, medicaid: boolean, medicaid_99493?: number) {
        this.name = name
        this.rate_99493 = rate_99493
        this.medicaid = medicaid
        this.medicaid_99493 = medicaid_99493
    }

}

export class USARates {
    states: StateRate[]

    constructor() {
        this.states = [
            new StateRate('Alabama',133.21, false,0),
            new StateRate('Alaska',182.7, false,0),
            new StateRate('Arizona ',139.52, true,135.95),
            new StateRate('Arkansas',130.44, false,0),
            new StateRate('California',156.195483870968, true,112.14),
            new StateRate('Colorado',145.64, false,0),
            new StateRate('Connecticut',152.09, true,0),
            new StateRate('Delaware',143.38, false,0),
            new StateRate('Florida',145.67, false,0),
            new StateRate('Georgia',138.545, false,0),
            new StateRate('Hawaii',151.41, true,50.25),
            new StateRate('Idaho',132.99, false,0),
            new StateRate('Illinois',144.255, true,76.3),
            new StateRate('Indiana',134.38, false,0),
            new StateRate('Iowa',134.17, true,72.72),
            new StateRate('Kansas',134.2, false,0),
            new StateRate('Kentucky',133.36, true,97.56),
            new StateRate('Louisiana',136.985, true,128.88),
            new StateRate('Maine',138.14, true,102.94),
            new StateRate('Maryland',148.5, true,128.88),
            new StateRate('Massachusetts',153.375, true,97.28),
            new StateRate('Michigan',140.83, true,85.18),
            new StateRate('Minnesota',141.24, false,0),
            new StateRate('Mississippi',130.95, false,0),
            new StateRate('Missouri',137.096666666667, false,0),
            new StateRate('Montana',142.58, true,184.98),
            new StateRate('Nebraska',133.68, true,97.68),
            new StateRate('Nevada',143.06, false,0),
            new StateRate('New Hampshire',144.78, true,52.4),
            new StateRate('New Jersey',156.7, true,67.71),
            new StateRate('New Mexico',136.58, false,0),
            new StateRate('New York',157.608, true,112.5),
            new StateRate('North Carolina',136.57, true,171.3),
            new StateRate('North Dakota',140.53, true,152.25),
            new StateRate('Ohio',136.84, false,0),
            new StateRate('Oklahoma',133.96, false,0),
            new StateRate('Oregon',143.36, false,0),
            new StateRate('Pennsylvania',143.69, true,6.36),
            new StateRate('Rhode Island',146.96, true,0),
            new StateRate('South Carolina',135.31, false,0),
            new StateRate('South Dakota',140.08, false,0),
            new StateRate('Tennessee',133.38, false,0),
            new StateRate('Texas',142.4625, true,124.06),
            new StateRate('Utah',137, true,110.34),
            new StateRate('Vermont',140.6, true,121.31),
            new StateRate('Virginia',141.27, false,0),
            new StateRate('Washington',151.375, true,126.33),
            new StateRate('West Virginia',134.07, false,0),
            new StateRate('Wisconsin',136.42, true,96.9),
            new StateRate('Wyoming ',141.81, false,0)
        ]
    }

    getRate(state: string) {
        return this.states.find((stateObj) =>  stateObj.name == state)
    }
}