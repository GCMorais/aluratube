import config from "../config.json";
import styled from "styled-components";
import {CSSReset} from "../src/components/global";
import Menu from "../src/components/menu";
import {StyledTimeline} from "../src/components/Timeline"

const Home = () => {
  return (
    <>
      <CSSReset />
    
      <div>
        <Menu />
        <Banner />
        <Header />
        <TimeLine lista={config.playlists} />
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

const BannerArea = styled.div`

  img{
    object-fit: cover;
    width: 100%;
    height: 18rem;
    left: 0px;
    top: 56px;
  }
`

const Banner = () => {
  return (
    <BannerArea>
      <img src="https://images.unsplash.com/photo-1636487658581-a7d60d465e35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80" />
    </BannerArea>
  )
}

const Header = () => {
  return (
    <StyledHeader>
      {/* <img src="banner" /> */}
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

const TimeLine = (props) => {

  const playlistNames = Object.keys(props.lista);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {

        const videos = props.lista[playlistNames];
        
        return (
            <section>
                <h2>{playlistNames}</h2>
                <div>
                    {videos.map((video) => {
                        return (
                            <a href={video.url}>
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
          <section>
            <h2>{favNames}</h2>
            <div className="fav-box">
              {itensFav.map((itensFav) =>{
                return(
                  <a href={itensFav.url} target="_blank">
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