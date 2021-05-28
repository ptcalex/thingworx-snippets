/*** CREATE STREAM ENTRIES - MULTIPLE ENTRIES ***/

let infotable = getStreamInfotable(); // getStreamInfotable function defined below
let streamName = "..."; // name of Stream entity
let stream = Things[streamName];
while (/* your condition here */) {
    let values = stream.CreateValues(); // fields of Stream's DataShape
    values.AddRow({ /* DataShape fields */ });
    infotable.rows.push({
        timestamp: new Date(), // pick a date
        location: { latitude: 0, longitude: 0, elevation: 0, units: "WGS84" }, // pick a location
        source: me.name,
        tags: [], // array of tags where each tag is a string of the kind "Vocabulary:Tag"
        values: values // single-row intofable
    });
}
stream.AddStreamEntries({ values: infotable });


// supporting function
function getStreamInfotable() {
    let infotable = { dataShape: { fieldDefinitions: {} }, rows: [] };
    infotable.dataShape.fieldDefinitions['timestamp'] = { name: 'timestamp', baseType: 'DATETIME' };
    infotable.dataShape.fieldDefinitions['location'] = { name: 'location', baseType: 'LOCATION' };
    infotable.dataShape.fieldDefinitions['source'] = { name: 'source', baseType: 'STRING' };
    infotable.dataShape.fieldDefinitions['sourceType'] = { name: 'sourceType', baseType: 'STRING' };
    infotable.dataShape.fieldDefinitions['tags'] = { name: 'tags', baseType: 'TAGS' };
    infotable.dataShape.fieldDefinitions['values'] = { name: 'values', baseType: 'INFOTABLE' };
	  return infotable;
}

