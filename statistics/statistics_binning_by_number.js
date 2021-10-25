/*** Calculate binned data distribution by number of bins ***/

// INFOTABLE:AnalyticsTimedValue
let it = DataShapes.AnalyticsTimedValue.CreateValues();
for (let ix = 0; ix < 1000; ix++) {
	it.AddRow({
    timestamp: ix,
    value: 100 * Math.random()
  });
}

// Split by number of bins - each bin having equal size
// Only consider a [min,max] subrange of the input
const NumberOfBins = 4;
let result = me.CalculateBinnedDataDistributionForNumberOfBins({
  timedValues: it,
  numBins: NumberOfBins,
  min: 0,
  max: 100
});

