import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { LinearProgress } from '@mui/material';

interface ImageProps {
  imagePath: string;
  imageHeight: string;
}

const FirebaseImage: React.FC<ImageProps> = ({ imagePath, imageHeight }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, imagePath);
      const url = await getDownloadURL(storageRef);
      setUrl(url);
    };

    fetchImage();
  }, [imagePath]);

  return url ? <img src={url} height={imageHeight} alt="Tech" /> : <LinearProgress />;
};

export default FirebaseImage;