import React from "react";
import config from "../config.json";
import styled from "styled-components";
import {CSSReset} from "../src/components/global";
import Menu from "../src/components/Menu";
import {StyledTimeline} from "../src/components/Timeline"

const Home = () => {

  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <CSSReset />

      <div>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
        <Header />
        <TimeLine filtro={valorDoFiltro} lista={config.playlists} />
        <Favorites favlist={config.favorites}/>
      </div>
    </>
  )
}
export default Home;

const StyledHeader = styled.div`  
  img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: green;
    padding: 3px;
    transition: .5s;
  }
  img:hover{
    transition: all .3s ease-in-out;
    transform: scale(1.2);
    opacity: .8;
  }
  a{
    text-decoration: none;
    opacity: 1;
    transition: .3s;
  }
  .user-info{
    margin-top: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
  .userInfos p{
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #666666;
  }
`;

const StyledBanner = styled.div`
  background-image: url(${config.bg});
  background-position: 0cm;
  background-repeat: no-repeat;
  background-size: cover;
  height: 230px;
`

const Header = () => {
  return (
    <StyledHeader>
      <StyledBanner />
      <section className="user-info">
        <a href="https://www.linkedin.com/in/guilhermecmorais/" target="_blank"><img src={`https://github.com/${config.github}.png`}/></a>
        <div className="userInfos">
          <h1>{config.name}</h1>
          <p>{config.description}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

const TimeLine = ({filtro, ...props}) => {

  const playlistNames = Object.keys(props.lista);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = props.lista[playlistNames];
        return (
            <section key={playlistNames}>
                <h2>{playlistNames}</h2>
                <div>
                    {videos
                    .filter((video) => {
                      const titleNormalized = video.title.toLowerCase();
                      const searchValueNormalized = filtro.toLowerCase();
                      return titleNormalized.includes(searchValueNormalized)
                    })
                    .map((video) => {
                        return (
                            <a key={video.url} href={video.url}>
                                <img src={video.thumb} />
                                <span>
                                    {video.title}
                                </span>
                            </a>
                        )
                    })}
                </div>
            </section>
        )
      })}
    </StyledTimeline>
  )
}

const FavArea = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 2rem;
    
    section{
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    section h2{
      font-family: Helvetica, sans-serif;
      font-weight: 700;
      line-height: 18.4px;
      font-size: 16px;
      margin-bottom: 16px;
      text-transform: capitalize;
    }
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .fav-box{
      display: flex;
      gap: 3rem;
      width: 100%;
    }
    .fav-box h3{
      font-size: 15px;
      font-family: sans-serif;
      letter-spacing: 1px;
    }
    .fav-box a{
      color: #000;
      display: flex;
      flex-flow: column;
      align-items: center;
    }

  
`
const Favorites = (props) => {

  const favNames = Object.keys(props.favlist);
  
  return (
    <FavArea>
      {favNames.map((favNames) => {

        const itensFav = props.favlist[favNames]
        
        return (
          <section key={favNames}>
            <h2>{favNames}</h2>
            <div className="fav-box">
              {itensFav.map((itensFav) =>{
                return(
                  <a key={itensFav.url} href={itensFav.url} target="_blank">
                    <img src={itensFav.image} />
                    <h3>{itensFav.arroba}</h3>
                  </a>
                )
              })}
            </div>
          </section>
        )
        
      })}
    </FavArea>
  )
}