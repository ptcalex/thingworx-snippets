/*
    TO  Score a ThingWorx Analytics clustering model and persist the result to CSV
    I   Get a dataset reference to a scoring dataset represented by a job ID
        Determine which fields of the dataset shall be included in the scoring result
        Score the model
    SERVICE PARAMETERS:
      DatasetJobID: the jobid of a previously created dataset
      ClusteringJobID: the jobid of a previously created clustering model
    RESULT:
      NONE
*/

try {
  let modelOutput = score();
  // let scoringResult = transformModelOutput8(modelOutput);
  let scoringResult = transformModelOutput9(modelOutput);
  exportScoreToCSV(scoringResult);
}
catch (error) {
  logger.error("ScoreClusteringModel: " + error);
}



/* IMPLEMENTATION DETAILS */

function score() {
  const PredictionThing = Things["AnalyticsServer_PredictionThing"];
  let score = PredictionThing.RealtimeScore({
    modelUri: "results:/clusters/" + ClusteringJobID,
    datasetRef: getDatasetReference(DatasetJobID),
    identifierFields: getIdentifiersFromArray(["identifier"])
  });
}

function transformModelOutput8(modelOutput) {
    let result = { dataShape: { fieldDefinitions: {} }, rows: [] }; 
    result.dataShape.fieldDefinitions["_1"] = { name: "Identifier", baseType: "STRING" };
    result.dataShape.fieldDefinitions["_2"] = { name: "Cluster", baseType: "STRING" };
    modelOutput.rows.toArray().forEach(row => { 
        let identifier = row.identifiers.rows[0].item;
        let cluster = row.modelOutputs.Find({ fieldName: "Clustering_mo" }).fieldValue;    
        result.rows.push({ Identifier: identifier, Cluster: String.fromCharCode(65 + Number(cluster)) });
    });
    return result;
}

function transformModelOutput9(modelOutput) {
    let result = { dataShape: { fieldDefinitions: {} }, rows: [] }; 
    result.dataShape.fieldDefinitions["_1"] = { name: "Identifier", baseType: "STRING" };
    result.dataShape.fieldDefinitions["_2"] = { name: "Cluster", baseType: "STRING" };
    modelOutput.rows.toArray().forEach(row => { 
        let identifier = row.identifier_1;
        let cluster = row.Clustering_mo;    
        result.rows.push({ Identifier: identifier, Cluster: String.fromCharCode(65 + Number(cluster)) });
    });
    return result;
}

function exportScoreToCSV(scoringResult) {
  const Repository = "Dataset"; // FileRepository entity name
  Resources["CSVParserFunctions"].WriteCSVFile({
    fileRepository: Repository,
    path: "/clusters.csv",
    data: scoringResult,
    withHeader: true
  });
}

function getDatasetReference(jobID) {
  let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
  datasetRef.AddRow({ datasetUri: "dataset:/" + jobID, format: "parquet" });
  return datasetRef;  
}

function getIdentifiersFromArray(fieldArray) {
  let fields = DataShapes.GenericStringList.CreateValues();
  fieldArray.forEach(item => fields.AddRow({ item: item }));
  return fields;    
}

