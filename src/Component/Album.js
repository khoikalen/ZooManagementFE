import PhotoAlbum from "react-photo-album";

const AlbumShow = {
  backgroundColor: "rgb(254, 240, 191)",
};

const AlbumStyle = {
  height: "100%",
  width: "50%",
};

const ConnectionAlbumUs = {
  height: '5vh',
  backgroundImage: 'linear-gradient(rgb(254, 240, 191), white)'
}

export default function Gallery() {
  return (
    <div style={AlbumShow}>
      <img style = {AlbumStyle} src="News1.jpg" alt="Album1"></img>
      <img style = {AlbumStyle} src="News2.jpg" alt="Album2"></img>
      <div style={ConnectionAlbumUs} ></div>
    </div>
    
  );
}