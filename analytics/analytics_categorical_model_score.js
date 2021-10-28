/*
    TO    Score a categorical model
    I     Perform the actual scoring 
          Transform the result to flatten it
    PARAMETERS:
      ModelID: the job ID of the categorical model to score
    RESULT:
      INFOTABLE with scoring result
*/

const Goal = "BeltFrequencyLevel";

let result;
try {
  let modelOutput = scoreCategoricalModel(ModelID);
  result = transformModelOutput9(modelOutput);
}
catch (error) {
  result = DataShapes.GenericStringList.CreateValues();
  logger.error("ScoreCategoricalModel: " + error);
}


/* IMPLEMENTATION DETAILS */

function scoreCategoricalModel(jobID) {
  const PredictionThing = Things["AnalyticsServer_PredictionThing"];
  return PredictionThing.RealtimeScore({
    datasetRef: getDatasetToScore(),
    goalField: Goal,
    modelUri: "results:/models/" + jobID,
    causalTechnique: "FULL_RANGE"
  });
}

function transformModelOutput8(modelOutput) {
  let result = DataShapes.GenericStringList.CreateValues();
  modelOutput.rows.toArray().forEach(row => {
    let output = row.modelOutputs.Find({ fieldName: Goal }).fieldValue;
    result.AddRow({ item: output });
  });
  return result;
}

function transformModelOutput9(modelOutput) {
  let result = DataShapes.GenericStringList.CreateValues();
  modelOutput.rows.toArray().forEach((row,ix) => {
    result.AddRow({ item: "" + ix + "=" + row.BeltFrequencyLevel });
  });
  return result;
}

function getDatasetToScore() {
  let dataset = DataShapes.AnalyticsDatasetRef.CreateValues();
  dataset.AddRow({
    datasetUri: "body:/",
    data: synthesizeData(),
    metadata: synthesizeMetadata()
  });
  return dataset;
}

function synthesizeData() {
  let data = DataShapes["WS.CategoricalScoring.DS"].CreateValues();
  data.AddRow({
    Max: 2, Min: -2.8, Mean: 0.25, Peak2peak: 4.8, Var: 1.13, Std: 1.09, Rms: 1.88, Kurtosis: -0.14, Skewness: 1.09,
    Rms_LP: 1.09, Rms_HP: 0.02, Rms_LHP: 0, AbsMean: 0.96, DiffRealTrg: 0, Integral: 23.13
  });
  data.AddRow({
    Max: 1.97, Min: -2.74, Mean: 0.226, Peak2peak: 4.723, Var: 1.112, Std: 1.054, Rms: 1.078, Kurtosis: 1.78, Skewness: -0.08,
    Rms_LP: 1.07, Rms_HP: 0.0018, Rms_LHP: 0.007, AbsMean: 0.959, DiffRealTrg: 0, Integral: 22.9
  });
  return data;
}

function synthesizeMetadata() {
  let metadata = DataShapes.AnalyticsDatasetMetadata.CreateValues();
  metadata.AddRow({ fieldName:"Max", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Min", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Mean",dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Peak2peak", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Var", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Std", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Rms", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Kurtosis", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Skewness", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Rms_LP", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Rms_HP", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Rms_LHP", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"AbsMean", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"DiffRealTrg", dataType:"DOUBLE", opType:"CONTINUOUS" });
  metadata.AddRow({ fieldName:"Integral", dataType:"DOUBLE", opType:"CONTINUOUS" });
  return metadata;
}

