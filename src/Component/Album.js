import PhotoAlbum from "react-photo-album";

const photos = [
  {
    src: "News1.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "News1.jpg", width: 400, height: 300 },
      { src: "News1.jpg", width: 200, height: 150 },
    ],
  },
  {
    src: "News2.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "News2.jpg", width: 800, height: 450 },
      { src: "News2.jpg", width: 400, height: 225 },
    ],
  },
];

export default function Gallery() {
  return <PhotoAlbum layout="rows" photos={photos} />;
}