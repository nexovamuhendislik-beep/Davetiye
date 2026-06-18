/** public/ klasöründeki dosyalar — GitHub Pages base path ile uyumlu */
export function publicAsset(path: string) {
  const file = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${file}`;
}
