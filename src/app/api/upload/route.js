import {json} from "node:stream/consumers";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

export async function POST(req) {
    const data = await req.formData();
    console.log(data);
    if(data.get("file")){
        const file = data.get("file");

        const s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });

        const ext = file.name.split(".").slice(-1)[0];

        s3Client.send(new PutObjectCommand({
            Bucket: "food-orderring",
            Key: ""
        }))
    }
    return Response.json(true);
}