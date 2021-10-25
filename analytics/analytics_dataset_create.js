/***
  Create a ThingWorx Analytics dataset

TO  create a ThingWorx Analytics dataset
I   get a dataset reference to a CSV file located in a repository (9.x)
    infer dataset metadata using the dataset reference, and save the metadata to a file in the repository (9.x)
    get tags for the dataset
    create a dataset tagged by the tags 

PARAMETERS: DatasetName (mydataset), DataSetPath (/data.csv), MetadataPath (/metadata.json)
PROPERTIES: me.DatasetRepository (a FileRepository), me.DataThing (AnalyticsServer_DataThing), me.DatasetJobID
RETURN:     Job ID

***/

// let datasetref = getDatasetReference(DatasetPath); // 9.x
// let metadata = inferMetadataFromDatasetRef(datasetref); // 9.x
// saveMetadata(metadata); // 9.x
let tags = getDatasetTags(DatasetName);
let jobid = createDatasetTaggedBy(tags);
let result = me.DatasetJobID = jobid;

// ---------- IMPLEMENTATION DETAILS ---------- //

function getDatasetReference() {
	let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
	datasetRef.AddRow({ datasetUri: encodeURI("thingworx://" + me.DatasetRepository + DatasetPath), format: "csv" });
	return datasetRef;    
}

function inferMetadataFromDatasetRef(datasetRef) {
	return me.DataThing.DetectMetadataJSON({ datasetRef: datasetRef });
}

function saveMetadata(metadata) {
	Things[me.DatasetRepository].SaveText({ path: MetadataPath, content: JSON.parse(metadata) });
}

function getDatasetTags() {
    let tags = DataShapes.GenericStringList.CreateValues();
    tags.AddRow({ item: "builderdataset" });
    tags.AddRow({ item: "builderdatasetname:" + DatasetName });    
    return tags;
}

function createDatasetTaggedBy(tags) {
	return Things[me.DataThing].CreateDataset({
        csvURI: encodeURI("thingworx://" + me.DatasetRepository + DatasetPath),
        csvHasHeaders: true,
        metadataFileURI: encodeURI("thingworx://" + me.DatasetRepository + MetadataPath),
        tags: tags
	});
}
