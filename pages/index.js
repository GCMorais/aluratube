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
  }
  .user-info{
    
    margin-top: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
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
        <img src={`https://github.com/${config.github}.png`} />
        <div>
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
        console.log(playlistNames);
        console.log(videos);
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
                    })};
                </div>
            </section>
        )
      })}
    </StyledTimeline>
  )
}