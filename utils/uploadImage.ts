export const uploadImage = async (formData: FormData) => {
  const CLOUD_NAME = "dtujpq8po";
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message);
    }

    const data = await res.json();
    const image = {
      id: data["public_id"],
      url: data["secure_url"],
    };

    return image;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
