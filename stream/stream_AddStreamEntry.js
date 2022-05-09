/*** CREATE STREAM ENTRY - SINGLE ENTRY ***/

const STREAM_NAME = ""; // name of Stream entity

const stream = Things[STREAM_NAME];
const values = stream.CreateValuesWithData({ values: {/* Stream's Data Shape */} });
stream.AddStreamEntry({
  timestamp: new Date(), // pick a date
  values: values, // as filled above
  source: me.name,
  tags: [], // array of tags where each tag is a string of the kind "Vocabulary:Tag"
  location: { latitude: 0, longitude: 0, elevation: 0, units: "WGS84" } // pick a location
});

