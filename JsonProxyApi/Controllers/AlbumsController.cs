using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace JsonProxyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumsController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public AlbumsController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        // Get all photos for a specific album ID 
        [HttpGet("{id}/photos")]
        public async Task<IActionResult> GetPhotosForAlbum(int id)
        {
            var response = await _httpClient.GetAsync($"https://jsonplaceholder.typicode.com/albums/{id}/photos");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch photos");
            }

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
    }
}