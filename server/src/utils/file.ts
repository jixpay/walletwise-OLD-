import { v4 } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import { BadRequestException } from "@nestjs/common";


export const uploadImage = async ( file: any , path: string) => {
  try {
    const storageRef = ref(storage, `${path}/${v4()}`);
    const metadata = {
      contentType: file.minetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const imageUrl = await getDownloadURL(snapshot.ref);
    return imageUrl;
  } catch (error) {
    throw new BadRequestException('There was an ERROR uploading the image')
  }
};