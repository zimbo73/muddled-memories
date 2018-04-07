using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MuddledMemoriesWebApi.DataAccess;

namespace MuddledMemoriesWebApi.Controllers {
	[Route("api/[controller]")]
	public class TemperatureReadingsController: Controller {

		private DataAccess.TemperatureReadingsDAL _dal;

		public TemperatureReadingsController(IConfiguration config): base() {
			_dal = new DataAccess.TemperatureReadingsDAL(config);
		}

		// GET api/temperatureReadings
		[HttpGet]
		public async Task<IList<TemperatureReading>> Get() {
			return await _dal.GetAllEntriesAsync();
		}

		// GET api/temperatureReadings/5
		[HttpGet("{id}")]
		public string Get(int id) {
			return "value";
		}

		// POST api/temperatureReadings
		[HttpPost]
		public void Post([FromBody]string value) {
		}

		// PUT api/temperatureReadings/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value) {
		}

		// DELETE api/temperatureReadings/5
		[HttpDelete("{id}")]
		public void Delete(int id) {
		}
	}
}
