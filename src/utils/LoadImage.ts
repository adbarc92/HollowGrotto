// Pure JS
// Should return a Promise which resolves to an image on-load
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
    // img.onerror = () => reject(new Error('Image failed to load'));
  });
};

export const loadImages = (
  imagePaths: string[]
): [HTMLImageElement[], boolean] => {
  let loaded = false;
  const retElems: HTMLImageElement[] = [];
  const imgPromises = imagePaths.map((str, i) => {
    return loadImage(str, i);
  });

  // Promise.all bundles promises, and will reject on any input promises rejecting
  Promise.all(imgPromises).then((results: HTMLImageElement[]) => {
    console.log(results); // for debugging
    results.forEach((elem: HTMLImageElement) => {
      retElems.push(elem);
    });
    loaded = true;
  });

  return [retElems, loaded];
};
