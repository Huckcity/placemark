import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from "fs";


const uploadObject = async (userid, image) => {
  
  const s3Client = new S3Client({
    endpoint: 'https://fra1.digitaloceanspaces.com',
    region: 'fra1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  
  const file = fs.readFileSync(image.path);
  
  const params = {
    Bucket: 'placemark-storage',
    Key: `${userid}/${image.filename}`,
    Body: file,
    ACL: 'public-read',
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    return data;
  } catch (err) {
    console.log("Error", err);
    return null
  }
};

export default uploadObject;