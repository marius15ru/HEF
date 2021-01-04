using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;
using System.Net.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public AuthController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        // POST api/auth
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] User model)
        {
            if (model == null)
                return BadRequest("Invalid client request");

            var account = (await _repository.User.Get(x => x.Email == model.Email)).SingleOrDefault();
            
            if(account != null && BC.Verify(model.Password, account.Password))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345")); // Environment variable
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                
                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5001",
                    audience: "http://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString });
            }

            return Unauthorized("Username or password incorrect.");
        }

        // PUT api/auth/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePassword(int id)
        {
            var account = await _repository.User.GetByID(id);
            var newp = HttpContext.Request.Form["new_password"];
            var oldp = HttpContext.Request.Form["old_password"];

            if (account != null && (String.IsNullOrEmpty(account.Password) || BC.Verify(oldp, account?.Password)))
            {
                var hashed_password = BC.HashPassword(newp, BC.GenerateSalt());
                account.Password = hashed_password;
                _repository.User.Update(account);
                await _repository.Save();
                return Ok();
            }

            return NoContent();
        }

        public bool sendEmail(string from, string to, string subject, string body, string server)
        {
            MailMessage message = new MailMessage(from, to, subject, body);
            SmtpClient client = new SmtpClient(server)
            {
                UseDefaultCredentials = true
            };
            
            try
            {
                client.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caucht in createTestMessage: {0}", ex.ToString());
            }

            return false;
        }
    }
}