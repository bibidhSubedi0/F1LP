using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using F1B.Models;

namespace F1B.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredictionsController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public PredictionsController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet]
        [Route("get-predictions")]
        public async Task<IActionResult> GetPredictions()
        {
            try
            {
                var response = await _httpClient.GetAsync("http://localhost:8000/predictions");

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Error calling external API");
                }

                var jsonString = await response.Content.ReadAsStringAsync();

                var result = JsonConvert.DeserializeObject<PredictionsResponse>(jsonString);

                return Ok(result.Predictions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
    public class PredictionsResponse
    {
        public List<ResultModel> Predictions { get; set; }
    }
}
