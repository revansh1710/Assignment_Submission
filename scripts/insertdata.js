
const { AppDataSource } = require('../datasource.js');
const City = require('../models/city.model.js');
const Country = require('../models/country.model.js');
const Airport = require('../models/airport.model.js');

async function insertAllData() {
    try {

        await AppDataSource.initialize();
        console.log('Database connection established');
        const cityRepository = AppDataSource.getRepository(City);
        const countryRepository = AppDataSource.getRepository(Country);
        const airportRepository = AppDataSource.getRepository(Airport);
        const country = countryRepository.create({
            id: 76,
            name: 'India',
            country_code_two: 'IN',
            country_code_three: 'IND',
            mobile_code: 91,
            continent_id: 1,
        });
        await countryRepository.save(country);
        console.log('Country data inserted');

        const city = cityRepository.create({
            id: 1,
            name: 'Agra',
            country_id: country.id,
            is_active: true,
            lat: 27.18,
            long: 78.02,
        });
        await cityRepository.save(city);
        console.log('City data inserted');

        const airport = airportRepository.create({
            id: 145,
            icao_code: 'VIAG',
            iata_code: 'AGR',
            name: 'Agra Airport / Agra Air Force Station',
            type: 'medium_airport',
            latitude_deg: 27.157683,
            longitude_deg: 77.960942,
            elevation_ft: 551,
            city: city,
        });
        await airportRepository.save(airport);
        console.log('Airport data inserted');

    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await AppDataSource.destroy();
        console.log('Database connection closed');
    }
}

insertAllData();
