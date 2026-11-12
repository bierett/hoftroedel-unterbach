// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

export interface DemoAddress {
    id: string;
    street: string;
    houseNumber: string;
    postcode: string;
    city: string;
    coordinates: [number, number];
    source: string;
}

// Existing addresses from OpenStreetMap; no actual flea market participation is implied.
export const demoAddresses: DemoAddress[] = [
    {
        "id": "osm-N-4745274013",
        "street": "Gerresheimer Landstraße",
        "houseNumber": "91",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.9012642, 51.2033831],
        "source": "https://www.openstreetmap.org/node/4745274013"
    },
    {
        "id": "osm-N-1917441148",
        "street": "Gerresheimer Landstraße",
        "houseNumber": "163",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8886894, 51.204311],
        "source": "https://www.openstreetmap.org/node/1917441148"
    },
    {
        "id": "osm-N-6617384820",
        "street": "Breidenplatz",
        "houseNumber": "8",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8950012, 51.2047369],
        "source": "https://www.openstreetmap.org/node/6617384820"
    },
    {
        "id": "osm-N-1557043690",
        "street": "Breidenplatz",
        "houseNumber": "5",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8942033, 51.2045178],
        "source": "https://www.openstreetmap.org/node/1557043690"
    },
    {
        "id": "osm-N-1917441132",
        "street": "Gerresheimer Landstraße",
        "houseNumber": "123",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8948453, 51.2041695],
        "source": "https://www.openstreetmap.org/node/1917441132"
    },
    {
        "id": "osm-N-1917441149",
        "street": "Gerresheimer Landstraße",
        "houseNumber": "117",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8958897, 51.2041638],
        "source": "https://www.openstreetmap.org/node/1917441149"
    },
    {
        "id": "osm-N-2475940355",
        "street": "Gerresheimer Landstraße",
        "houseNumber": "84",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.900639, 51.2030335],
        "source": "https://www.openstreetmap.org/node/2475940355"
    },
    {
        "id": "osm-N-1916989850",
        "street": "Gerresheimer Landstraße",
        "houseNumber": "56",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.9038688, 51.2015491],
        "source": "https://www.openstreetmap.org/node/1916989850"
    },
    {
        "id": "osm-W-414479437",
        "street": "Brorsstraße",
        "houseNumber": "5",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8992068, 51.2048994],
        "source": "https://www.openstreetmap.org/way/414479437"
    },
    {
        "id": "osm-W-414479438",
        "street": "Brorsstraße",
        "houseNumber": "5a",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8989387, 51.2048524],
        "source": "https://www.openstreetmap.org/way/414479438"
    },
    {
        "id": "osm-W-126087386",
        "street": "Vennstraße",
        "houseNumber": "68",
        "postcode": "40627",
        "city": "Düsseldorf",
        "coordinates": [6.8975775, 51.1989967],
        "source": "https://www.openstreetmap.org/way/126087386"
    }
];
