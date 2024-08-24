
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Airport',
    tableName: 'airports',
    columns: {
        id: { type: Number, primary: true, generated: true },
        icao_code: { type: String },
        iata_code: { type: String },
        name: { type: String },
        type: { type: String },
        latitude_deg: { type: 'decimal' },
        longitude_deg: { type: 'decimal' },
        elevation_ft: { type: 'int' },
        city_id: { type: Number },
    },
    relations: {
        city: {
            target: 'City',
            type: 'many-to-one',
            joinColumn: { name: 'city_id' },
        },
    },
});
