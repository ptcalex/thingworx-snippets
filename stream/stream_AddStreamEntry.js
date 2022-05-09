/*** CREATE STREAM ENTRY - SINGLE ENTRY ***/

let stream = ""; // name of Stream entity

let values = Things[stream].CreateValues();
values.AddRow({ /* fields of the Stream's Data Shape here */ });

Things[stream].AddStreamEntry({
    tags: [], // array of tags where each tag is a string of the kind "Vocabulary:Tag"
    timestamp: new Date(), // pick a date
    source: me.name,
    values: values, // as filled above
    location: { latitude: 0, longitude: 0, elevation: 0, units: "WGS84" } // pick a location
});

