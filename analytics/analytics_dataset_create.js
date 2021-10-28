/*
    TO  Create a ThingWorx Analytics dataset
    I   Get a dataset reference to a CSV file located in a repository (9.x)
        Infer dataset metadata from the dataset reference, and it to a file in the repository (9.x)
        Get tags for the dataset
        Create the dataset tagged by the tags

    PARAMETERS: DatasetName (mydataset), DataSetPath (/data.csv), MetadataPath (/metadata.json)
    RETURN:     Job ID
*/

const DatasetRepository = "Dataset"; // name of a ThingWorx File Repository entity
const DataThing = Things["AnalyticsServer_DataThing"];

// let datasetref = getDatasetReference(DatasetPath); // 9.x
// let metadata = inferMetadataFromDatasetRef(datasetref); // 9.x
// saveMetadata(metadata); // 9.x
let tags = getDatasetTags(DatasetName);
let jobid = createDatasetTaggedBy(tags);
let result = jobid;


// ---------- IMPLEMENTATION DETAILS ---------- //

function getDatasetReference() {
  let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
  datasetRef.AddRow({ datasetUri: encodeURI("thingworx://" + DatasetRepository + DatasetPath), format: "csv" });
  return datasetRef;
}

function inferMetadataFromDatasetRef(datasetRef) {
  return DataThing.DetectMetadataJSON({ datasetRef: datasetRef });
}

function saveMetadata(metadata) {
  Things[DatasetRepository].SaveText({ path: MetadataPath, content: JSON.parse(metadata) });
}

function getDatasetTags() {
  let tags = DataShapes.GenericStringList.CreateValues();
  tags.AddRow({ item: "builderdataset" });
  tags.AddRow({ item: "builderdatasetname:" + DatasetName });
  return tags;
}

function createDatasetTaggedBy(tags) {
  return DataThing.CreateDataset({
    csvURI: encodeURI("thingworx://" + DatasetRepository + DatasetPath),
    csvHasHeaders: true,
    metadataFileURI: encodeURI("thingworx://" + DatasetRepository + MetadataPath),
    tags: tags
  });
}

