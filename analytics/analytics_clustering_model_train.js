/*
    TO  Train a ThingWorx Analytics clustering model
    I   Get a dataset reference to a dataset represented by a job ID
        Create a clustering model job
    PARAMETERS:
        DatasetJobID: the jobid of a previously created dataset
    RESULT:
        The Job ID of the clustering model being created
*/

const ClusteringThing = Things["AnalyticsServer_ClusteringThing"];

let datasetRef = getDatasetReference(DatasetJobID);
let jobid = createClusteringModelJobFromDatasetReference(datasetRef);
let result = jobid;


/*** IMPLEMENTATION DETAILS ***/

function getDatasetReference(jobID) {
  let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
  datasetRef.AddRow({ datasetUri: "dataset:/" + jobID, format: "parquet" });
  return datasetRef;  
}

function createClusteringModelJobFromDatasetReference(datasetRef) {
  return ClusteringThing.CreateJob({ 
  jobName: "Cluster Job " + Math.floor(100 + 900 * Math.random()),
  clusterCount: 3,
  description: "Clustering Model",
  datasetRef: datasetRef,
  tags: undefined
  });
}

