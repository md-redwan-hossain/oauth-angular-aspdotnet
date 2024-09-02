using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OAuthBackend;

[ApiController]
public class AuthController : ControllerBase
{
    [HttpGet("ping")]
    [Authorize(Roles = "read_data")]
    public IActionResult Ping()
    {
        return Ok("works");
    }
}