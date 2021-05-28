/*** Create INFOTABLE without an existing DATASHAPE entity ***/

let infotable = { dataShape: { fieldDefinitions: {} }, rows: [] };
infotable.dataShape.fieldDefinitions['timestamp'] = { name: 'timestamp', baseType: 'DATETIME' };
infotable.dataShape.fieldDefinitions['location'] = { name: 'location', baseType: 'LOCATION' };
infotable.dataShape.fieldDefinitions['source'] = { name: 'source', baseType: 'STRING' };
infotable.dataShape.fieldDefinitions['sourceType'] = { name: 'sourceType', baseType: 'STRING' };
infotable.dataShape.fieldDefinitions['tags'] = { name: 'tags', baseType: 'TAGS' };
infotable.dataShape.fieldDefinitions['values'] = { name: 'values', baseType: 'INFOTABLE' };

