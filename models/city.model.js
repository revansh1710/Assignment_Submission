// city.model.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'City',
    tableName: 'cities',
    columns: {
        id: { type: Number, primary: true, generated: true },
        name: { type: String },
        country_id: { type: Number },
        is_active: { type: Boolean },
        lat: { type: 'decimal' },
        long: { type: 'decimal' },
    },
    relations: {
        country: {
            target: 'Country',
            type: 'many-to-one',
            joinColumn: { name: 'country_id' },
        },
        airports: {
            target: 'Airport',
            type: 'one-to-many',
            mappedBy: 'city',
        },
    },
});
