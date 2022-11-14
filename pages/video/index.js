import React from "react";
import { useState } from "react";
import Menu from "../../src/components/Menu";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../../config.json";
import VideoPlayer from "./videoplayer";
import Footer from "../../src/components/footer";



const StyledMainSection = styled.section`
  display: flex;
  flex-flow: column;
  width: 100%;

  @media (max-width: 800px) {
    flex-flow: column;
  }
`;

const StyledDesc = styled.section`
  display: flex;
  flex-flow: column;
  color: white;
  width: 30%;
  margin-top: 4.5rem;
  gap: 1rem;

  @media (max-width: 800px) {
    margin-top: 2rem;
    width: 100%;
  }
`;

const StyledComment = styled.section`
  width: 90%;

  img {
    aspect-ratio: 16/9;
    object-fit: cover;
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 10px;
  }
  div {
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }
  div a {
    display: flex;
    gap: 0.5rem;
    text-align: left;
    color: ${({ theme }) => theme.textColorBase || "#FFFFFF"};
  }

  a section{
    p{
      font-size: 12px;
      opacity: .5;
    }
    h4{
      font-size: 15px;
      margin-bottom: 5px;
    }
  }

  @media (max-width: 800px) {
    padding: 1rem;
  }
`;


const CommentList = (props) => {
  const playlistNames = Object.keys(props.comentario);

  return (
    <>
      {playlistNames.map((playlistNames) => {
        const videos = props.comentario[playlistNames];
        return (
          <StyledComment>
            <div key={playlistNames}>
              {videos.map((video) => {
                let idVideo;
                  const linkFormat =
                    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                  const match = video.url.match(linkFormat);
                  if (match && match[2].length == 11) {
                    idVideo = match[2];
                  }
                return (
                  <a key={video.urlp} href={video.urlp}>
                    <img src={video.thumb} />
                    <section>
                      <h4>{video.title}</h4>
                      <p>{video.channel}</p>
                    </section>
                  </a>
                );
              })}
            </div>
          </StyledComment>
        );
      })}
    </>
  );
};

const StyledVideoAndDescript = styled.div`
display: flex;
  width: 100%;

  @media (max-width: 800px) {
    flex-flow: column;
  }
`

export default function MainPage() {
  return (
      <StyledMainSection>
        <Menu />
        <StyledVideoAndDescript >
          <Video />
          <StyledDesc>
            <CommentList comentario={config.playlists} />
          </StyledDesc>
        </StyledVideoAndDescript>
        <Footer />
      </StyledMainSection>
  );
}

const StyledVideoContainer = styled.div`
  width: 68%;
  @media (max-width: 800px) {
    width: 100%;
  }
`

const Video = () => {
    const [searchValue, setSearchValue] = useState("");
    return (
        <StyledVideoContainer>
            <VideoPlayer />
        </StyledVideoContainer>
    )
}

