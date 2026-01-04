using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace PetjadesApi.Services;

public class CloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IConfiguration config)
    {
        var account = new Account(
            config["CLOUDINARY_CLOUD_NAME"],
            config["CLOUDINARY_API_KEY"],
            config["CLOUDINARY_API_SECRET"]
        );

        _cloudinary = new Cloudinary(account);
    }

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "animals"
        };

        var result = await _cloudinary.UploadAsync(uploadParams);

        return result.SecureUrl.AbsoluteUri;
    }
}
