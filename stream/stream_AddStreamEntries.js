/*** CREATE STREAM ENTRIES - MULTIPLE ENTRIES ***/

const STREAM_NAME = ""; // name of stream entity

const stream = Things[STREAM_NAME];
const infotable = DataShapes["StreamEntryWithValues"].CreateValues();

while (/* your condition here */) {
  const data = stream.CreateValuesWithData({ values: { /* Stream's DataShape */ } });
  infotable.AddRow({
    timestamp: new Date(), // pick a date
    values: data, // single-row intofable
    source: me.name,
    tags: [], // array of tags where each tag is a string of the kind "Vocabulary:Tag"
    location: { latitude: 0, longitude: 0, elevation: 0, units: "WGS84" } // pick a location
  });
}

stream.AddStreamEntries({ values: infotable });

