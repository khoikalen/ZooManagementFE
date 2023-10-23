import PhotoAlbum from "react-photo-album";

const AlbumStyle = {
  width: "50%",
};

export default function Gallery() {
  return (
    <div className="album-show">
      <img style = {AlbumStyle} src="News1.jpg" alt="Album1"></img>
      <img style = {AlbumStyle} src="News2.jpg" alt="Album2"></img>
    </div>
  );
}