import {json} from "node:stream/consumers";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from "uniqid";
export async function POST(req) {
    const data = await req.formData();
    console.log(data);
    if(data.get("files")){
        const file = data.get("files");

        const s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });

        const ext = file.name.split(".").slice(-1)[0];
        console.log("EXT in profile/page.js",ext);
        const newFileName = uniqid() + "." + ext;
        console.log(newFileName);

        const chunks =[];
        for await (const chunk of file.stream()){
            chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);
        console.log("buffer",buffer);

        const bucket = "food-orderring";
        s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ACL: "public-read",
            ContentType: file.type,
            Body: buffer,
        }))

        const link = "https://"+bucket+ "food-orderring.s3.amazonaws.com/"+newFileName;
        console.log("Link",link);
        return Response.json(link);
    }
    return Response.json(true);
}