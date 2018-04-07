using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace MuddledMemoriesWebApi.DataAccess {
	public class TemperatureReading : TableEntity {

		public TemperatureReading() {
		}

		public TemperatureReading(string systemName, string sensorId, int readingNumber) {
			PartitionKey = "TemperatureReading-" + systemName;
			RowKey = sensorId + "-" + readingNumber;
			SystemName = systemName;
			SensorId = sensorId;
			ReadingNumber = readingNumber;
		}

		public string SystemName {get; set; }

		public string SensorId {get; set; }

		public int ReadingNumber { get; set; }

		public DateTime UtcTime{ get; set; }

		public int TemperatureC { get; set; }

	}
}
