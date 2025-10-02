import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
    const data = await req.formData();

    if (data.get("files")) {
        const file = data.get("files");

        const s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const ext = file.name.split(".").slice(-1)[0];
        const newFileName = uniqid() + "." + ext;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        const bucket = "food-orderring";
        await s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ACL: "public-read",
            ContentType: file.type,
            Body: buffer,
        }));

        const fileUrl = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
        console.log("Link from upload/page.js:", fileUrl);

        return Response.json(fileUrl);
    }
    return Response.json(true);
}
