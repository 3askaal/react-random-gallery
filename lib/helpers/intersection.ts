export const contains = (img1: any, img2: any) => {
  return !(
    img2.x1 < img1.x1 ||
    img2.y1 < img1.y1 ||
    img2.x2 > img1.x2 ||
    img2.y2 > img1.y2
  );
}

export const overlaps = (img1: any, img2: any, offset: number) => {
  if (img1.x1 >= img2.x2 + offset || img2.x1 >= img1.x2 + offset) return false;
  if (img1.y1 >= img2.y2 + offset || img2.y1 >= img1.y2 + offset) return false;

  return true;
}
