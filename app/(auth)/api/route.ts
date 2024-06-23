import { cloudinary } from "../../../utils/cloudinaryConfig";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { file } = req.body;

    try {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: "blog_images",
      });

      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Error uploading image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
