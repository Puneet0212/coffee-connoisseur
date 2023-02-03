const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores');

const getMinifiedRecord = (record) => {
    return {
        recordId: record.id,        // This recordId is not the id which we created, but it's the id which is defined for each row BY THE AIRTABLE.
        ...record.fields,
    }
}
const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
}

const findRecordByFilter = async (id) => {
    // find a record
    const findCoffeeStoreRecords = await table
    .select({ 
        filterByFormula: `id="${id}"`,
    })
    .firstPage();


    return getMinifiedRecords(findCoffeeStoreRecords);
    
} 

export { table, getMinifiedRecords, findRecordByFilter };