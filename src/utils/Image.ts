export const loadImage = (
  imagePath: string,
  index: number
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = new Image();
    img.src = imagePath;
    img.id = `img_${index}`;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => reject(new Error('Image failed to load'));
  });
};
