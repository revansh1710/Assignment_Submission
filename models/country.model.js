
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Country',
    tableName: 'countries',
    columns: {
        id: { type: Number, primary: true, generated: true },
        name: { type: String },
        country_code_two: { type: String },
        country_code_three: { type: String },
        mobile_code: { type: Number },
        continent_id: { type: Number },
    },
});
