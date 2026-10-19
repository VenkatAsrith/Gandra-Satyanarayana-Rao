const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  console.log('[Media Service] Cloudinary configured and active');
} else {
  console.log('[Media Service] Cloudinary credentials not configured. Running in local/mock storage mode.');
}

/**
 * Upload a file buffer to Cloudinary (or fallback to local disk storage in dev)
 */
const uploadMedia = async (fileBuffer, originalFilename, folder = 'sathenna_profile') => {
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif'],
          transformation: [{ quality: 'auto', fetch_format: 'auto' }]
        },
        (error, result) => {
          if (error) {
            console.error('[Cloudinary Upload Error]', error);
            return reject(new Error('Cloudinary upload failed: ' + error.message));
          }
          resolve({
            publicId: result.public_id,
            secureUrl: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
          });
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  // Local filesystem fallback
  const uploadsDir = path.join(__dirname, '../../public/uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(originalFilename) || '.jpg';
  const cleanName = path.basename(originalFilename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${Date.now()}-${cleanName}${ext}`;
  const filepath = path.join(uploadsDir, filename);

  fs.writeFileSync(filepath, fileBuffer);

  return {
    publicId: `local_${filename}`,
    secureUrl: `/uploads/${filename}`,
    width: 1200,
    height: 800,
    format: ext.replace('.', ''),
    bytes: fileBuffer.length
  };
};

/**
 * Delete a media asset by canonical public_id
 */
const deleteMedia = async (publicId) => {
  if (!publicId) return { success: false, message: 'No publicId provided' };

  if (isCloudinaryConfigured && !publicId.startsWith('local_')) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return { success: result.result === 'ok', raw: result };
    } catch (err) {
      console.error('[Cloudinary Delete Error]', err);
      return { success: false, error: err.message };
    }
  }

  // Local filesystem deletion
  if (publicId.startsWith('local_')) {
    const filename = publicId.replace('local_', '');
    const filepath = path.join(__dirname, '../../public/uploads', filename);
    if (fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath);
        return { success: true, message: 'Local asset removed' };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  }

  return { success: true, message: 'Static or unmanaged asset ignored' };
};

module.exports = {
  isCloudinaryConfigured: () => isCloudinaryConfigured,
  uploadMedia,
  deleteMedia
};
