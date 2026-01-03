using Microsoft.EntityFrameworkCore;
using PetjadesApi.Dtos;
using PetjadesApi.Models;

namespace PetjadesApi.Repositories;

public class RequestRepository : IRequestRepository
{
    private readonly ApplicationDbContext _context;

    public RequestRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Request>> GetAllAsync()
    {
        return await _context.Requests
            .Include(r => r.Animal)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<Request?> GetByIdAsync(int id)
    {
        return await _context.Requests
            .Include(r => r.Animal)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<Request> CreateAsync(Request request)
    {
        _context.Requests.Add(request);
        await _context.SaveChangesAsync();
        return request;
    }

    public async Task UpdateAsync(Request request)
    {
        _context.Requests.Update(request);
        await _context.SaveChangesAsync();
    }
}
