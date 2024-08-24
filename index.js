require('reflect-metadata');
const express = require('express');
const { AppDataSource } = require('./datasource.js');
const Airport = require('./models/airport.model.js');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

        app.get('/api/airport', async (req, res) => {
            const { iata_code } = req.query;

            if (!iata_code) {
                return res.status(400).json({ error: 'iata_code is required' });
            }

            const airportRepository = AppDataSource.getRepository(Airport);
            const airport = await airportRepository.findOne({
                where: { iata_code: iata_code },
                relations: ['city', 'city.country'],
            });

            if (!airport) {
                return res.status(404).json({ error: 'Airport not found' });
            }

            return res.json({
                airport: {
                    id: airport.id,
                    icao_code: airport.icao_code,
                    iata_code: airport.iata_code,
                    name: airport.name,
                    type: airport.type,
                    latitude_deg: airport.latitude_deg,
                    longitude_deg: airport.longitude_deg,
                    elevation_ft: airport.elevation_ft,
                    address: {
                        city: {
                            id: airport.city.id,
                            name: airport.city.name,
                            country_id: airport.city.country.id,
                            is_active: airport.city.is_active,
                            lat: airport.city.lat,
                            long: airport.city.long,
                        },
                        country: airport.city.country
                            ? {
                                id: airport.city.country.id,
                                name: airport.city.country.name,
                                country_code_two: airport.city.country.country_code_two,
                                country_code_three: airport.city.country.country_code_three,
                                mobile_code: airport.city.country.mobile_code,
                                continent_id: airport.city.country.continent_id,
                            }
                            : null,
                    },
                },
            });
        });

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        });
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });
