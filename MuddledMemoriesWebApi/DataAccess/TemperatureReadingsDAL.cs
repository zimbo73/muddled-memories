using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.Extensions.Configuration;

namespace MuddledMemoriesWebApi.DataAccess {
	public class TemperatureReadingsDAL {
		public IConfiguration Config { get; }
		private static object _sync = new object();
		private Microsoft.WindowsAzure.Storage.Table.CloudTable _cached_table;
		private string _systemName;
		private string _sensorId;

		public TemperatureReadingsDAL(IConfiguration config) {
			Config = config;
			_systemName = Config["systemName"];
			_sensorId = Config["sensorId"];
		}

		private async Task CreateTableClientAsync() {

			//var connectionString = ConfigurationManager.ConnectionStrings["TemperatureTableStorage"].ConnectionString;
			//var storageAccount = CloudStorageAccount.Parse(connectionString);
			//var tableClient = storageAccount.CreateCloudTableClient();
			//var table = tableClient.GetTableReference("Temperature");

			//Application ID: c684f0d9-3358-47e0-a19b-d8bc5029b97c
			//Key: AccessKey 7W05xPogJ5Ryn1D8rX+6TnwyX5h3EyLHihlKV8MSZiM=

			CloudTable table;
			lock(_sync) {
				if(_cached_table == null) {
					try {
						var connectionString = Config.GetConnectionString("TemperatureTableStorage");
						var storageAccount = CloudStorageAccount.Parse(connectionString);
						var tableClient = storageAccount.CreateCloudTableClient();
						table = tableClient.GetTableReference("Temperature");
					}
					catch(Exception ex) {
						_cached_table = null;
						return;
					}
				}
				else {
					return;
				}
			}
			await table.CreateIfNotExistsAsync();
			lock(_sync) {
				if(_cached_table == null) {
					_cached_table = table;
				}
			}
		}
		private async Task<CloudTable> GetTableClient() {
			if(_cached_table == null) {
				await CreateTableClientAsync();
			}

			lock(_sync) {
				return _cached_table;
			}
		}

		public async Task<IList<TemperatureReading>> GetAllEntriesAsync() {
			var results = new List<TemperatureReading>();

			var table = await GetTableClient();
			if(table != null) {
				var continuationToken = default(TableContinuationToken);
				var query = new TableQuery<TemperatureReading>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "TemperatureReading-" + _systemName));

				do {
					var tableQuerySegment = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
					continuationToken = tableQuerySegment.ContinuationToken;
					results.AddRange(tableQuerySegment.Results);
				} while(continuationToken != null);

			}
			return results;
		}
	}
}
