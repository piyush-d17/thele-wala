interface Locality {
    district: string;
    localities: string[];
    _id: string;
}

interface Location {
    _id: string;
    state: string;
    districts: Locality[];
}

interface ApiResponse {
    message: string;
    locations: Location[];
}