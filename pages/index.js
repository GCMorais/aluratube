import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine/Timeline";
import Link from "next/link";
import { GoMarkGithub } from "react-icons/go";
import { GrLinkedin, GrRobot } from "react-icons/gr";
import Footer from "../src/components/footer";
import { videoService } from "../src/services/videoService";



const OldTimeLine = ({ searchValue, ...props }) => {
  const playlistNames = Object.keys(props.comentario);

  return (
    <StyledOldTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = props.comentario[playlistNames];
        return (
          <section key={playlistNames}>
            <h2>{playlistNames}</h2>
            <div className="video-container">
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map((video) => {
                  let idVideo;
                  const linkFormat =
                    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                  const match = video.url.match(linkFormat);
                  if (match && match[2].length == 11) {
                    idVideo = match[2];
                  }
                  return (
                    <Link
                      key={video.url}
                      href={{
                        pathname: "/video",
                        query: {
                          v: idVideo,
                          title: video.title,
                        },
                      }}
                    >
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                      <h4><strong>{video.channel}</strong></h4>
                    </Link>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledOldTimeline>
  );
};

const StyledOldTimeline = styled.section`
  flex: 1;
  width: 100%;
  overflow: hidden;

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: grey;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 7px;
    height: 5px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
    overflow: hidden;
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
    border-radius: 10px;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 32px;

    div {
      padding-bottom: 2rem;
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      overflow: auto;
      
      a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 10px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
          font-family: sans-serif;
          font-size: 14px;
          text-align: left;
          height: 60px;
        }
        h4{
          padding-top: 8px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
          
          font-size: 12px;
          text-align: left;
        }
      }
    }
  }
  section:nth-child(2){
    background-color: ${({ theme }) => theme.backgroundLevel1};
  }
`;

const Home = () => {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const service = videoService();
  const [playlists, setPlaylists] = React.useState({  });

  React.useEffect(() => {
    console.log("useEffect");
    service
        .getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            // Forma imutavel
            const novasPlaylists = {};
            dados.data.forEach((video) => {
                if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                novasPlaylists[video.playlist] = [
                    video,
                    ...novasPlaylists[video.playlist],
                ];
            });

            setPlaylists(novasPlaylists);
        });
}, []);

  return (
    <>
      <div>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <TimeLine filtro={valorDoFiltro} lista={playlists}/>
        <OldTimeLine comentario={config.playlists} searchValue={valorDoFiltro}/>
        <Favorites favlist={config.favorites} />
        <Footer />
      </div>
    </>
  );
};
export default Home;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: green;
    padding: 3px;
    transition: all 0.2s ease-out;
  }
  img:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.2);
    opacity: 0.8;
  }
  a {
    text-decoration: none;
    opacity: 1;
    transition: 0.3s;
  }
  .user-info {
    display: flex;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
    justify-content: space-between;

    div{
      display: flex;
    }
  }
  .userDescript p {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #666666;
  }
  .userDescript{
    display: flex;
    flex-flow: column;
    padding: 1.3rem 0 0 1rem;
  }
  .userDescript h1, p{
    letter-spacing: 1px;
    font-size: 20px;
  }
  ul{
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  li a{
    color: ${({ theme }) => theme.textColorBase || "#222222"};
  }
  .userSocials{
    align-items: center;
  }
`;

const StyledBanner = styled.div`
  background-image: url(${config.bg});
  background-position: 0cm;
  background-repeat: no-repeat;
  background-size: cover;
  height: 230px;
`;

const Header = () => {
  return (
    <>
      <StyledBanner />
      <StyledHeader>
        <section className="user-info">
          <div>
            <a href="https://www.linkedin.com/in/guilhermecmorais/" target="_blank">
              <img src={`https://github.com/${config.github}.png`} />
            </a>
            <div className="userDescript">
              <h1>{config.name}</h1>
              <p>{config.description}</p>
            </div>
          </div>
          
          <div className="userSocials">
            <ul>
              <li><a target="_blank" href="https://github.com/GCMorais"><GoMarkGithub size={30}/></a></li>
              <li><a target="_blank" href="https://www.linkedin.com/in/guilhermecmorais/"><GrLinkedin size={30}/></a></li>
            </ul>
          </div>
        </section>
      </StyledHeader>
    </>
  );
};

const TimeLine = ({ filtro, ...props }) => {
  const playlistNames = Object.keys(props.lista);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = props.lista[playlistNames];
        return (
          <section key={playlistNames}>
            <h2>{playlistNames}</h2>
            <div className="video-container">
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = filtro.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  let idVideo;
                  const linkFormat =
                    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                  const match = video.url.match(linkFormat);
                  if (match && match[2].length == 11) {
                    idVideo = match[2];
                  }
                  return (
                    <Link
                      key={video.url}
                      href={{
                        pathname: "/video",
                        query: {
                          v: idVideo,
                          title: video.title,
                        },
                      }}
                    >
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                      <h4><strong>{video.channel}</strong></h4>
                    </Link>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
};

const FavArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  gap: 2rem;
  background-color: ${({ theme }) => theme.backgroundLevel1};

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: grey;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 7px;
    height: 5px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }

  section {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  section h2 {
    font-family: Helvetica, sans-serif;
    font-weight: 700;
    line-height: 18.4px;
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
  .fav-box {
    padding-bottom: 2rem;
    width: calc(100vw - 16px * 4);
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-auto-flow: column;
    grid-auto-columns: minmax(100px, 1fr);
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    overflow: auto;
  }
  .fav-box h3 {
    font-size: 15px;
    font-family: sans-serif;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.textColorBase || "#FFFFFF"};
  }
  .fav-box a {
    color: #000;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
`;
const Favorites = (props) => {
  const favNames = Object.keys(props.favlist);

  return (
    <FavArea>
      {favNames.map((favNames) => {
        const itensFav = props.favlist[favNames];

        return (
          <section key={favNames}>
            <h2>{favNames}</h2>
            <div className="fav-box">
              {itensFav.map((itensFav) => {
                return (
                  <a key={itensFav.url} href={itensFav.url} target="_blank">
                    <img src={itensFav.image} />
                    <h3>{itensFav.arroba}</h3>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </FavArea>
  );
};


