import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UtilityService {
  constructor() {}

  async fileUpload(file: Express.Multer.File): Promise<{ result: string }> {
    if (!file) {
      throw new Error('File is required');
    }
    const result = await this.uploadToCloudinary(file);
    return { result };
  }

  async filesUpload(
    files: Express.Multer.File[],
  ): Promise<{ results: string[] }> {
    const uploadedPromise = files.map((file) => this.uploadToCloudinary(file));
    const results = await Promise.all(uploadedPromise);
    return { results };
  }

  private uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resorce_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }
}
