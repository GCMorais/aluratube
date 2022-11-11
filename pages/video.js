import React from "react";
import Menu from "../src/components/Menu";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../config.json";

const StyledMainSection = styled.section`
  display: flex;
  width: 100%;

  @media (max-width: 800px) {
    flex-flow: column;
  }
`;

const StyledVideoPage = styled.section`
  padding: 4.5rem 1rem 0 1rem;
  width: 65%;

  .descricaoArea h1 {
    font-family: "YouTube Sans", "Roboto", sans-serif;
    font-size: 1.3rem;
    line-height: 2.8rem;
    font-weight: 600;
    letter-spacing: 1px;
    padding-top: 0.3rem;
  }
  .descricaoArea p {
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 0;
  }
  .descricaoArea a {
    cursor: pointer;
    opacity: 0.4;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: green;
    padding: 3px;
    transition: 0.5s;
  }
  img:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.2);
    opacity: 0.8;
  }
  .channelBox {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
  }
  .channelBox span {
    display: flex;
    flex-flow: column;
  }
  .btn-container {
    display: flex;
    gap: 1rem;
  }
  .btn-chn {
    padding: 0.5rem 1rem;
    border-radius: 25px;
    border: none;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.textColorBase2 || "#000000"};
    background-color: ${({ theme }) => theme.backgroundLevel3 || "#FFFFFF"};
  }
  .btn-like-deslike {
    padding: 0.5rem 1rem;
    border-radius: 25px;
    border: none;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.textColorBase || "#FFFFFF"};
    background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
  }
  .btn-comp {
    padding: 0.5rem 1rem;
    border-radius: 25px;
    border: none;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.textColorBase || "#FFFFFF"};
    background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
  }
  .profileTube {
    display: flex;
    gap: 1rem;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding: 4rem 0 0 0;

    .channelBox {
      flex-flow: column;
      align-items: baseline;
    }
    .descricaoArea {
      padding: 1rem;
    }
    .descricaoArea h1 {
      font-size: 1.1rem;
    }
  }
`;

const StyledDesc = styled.section`
  display: flex;
  flex-flow: column;
  color: white;
  width: 30%;
  margin-top: 4.5rem;

  @media (max-width: 800px) {
    margin-top: 2rem;
    width: 100%;
  }
`;

const StyledComment = styled.section`
  width: 100%;

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

  @media (max-width: 800px) {
    padding: 1rem;
  }
`;

const VideoArea = (props) => {
  const playlistNames = Object.keys(props.comentario);

  return (
    <div>
      {playlistNames.map((playlistNames) => {
        const videos = props.comentario[playlistNames];
        return (
          <StyledComment>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <p>{video.title}</p>
                  </a>
                );
              })}
            </div>
          </StyledComment>
        );
      })}
    </div>
  );
};

export default function MainPage() {
  return (
    <StyledMainSection>
      <Menu />
      <Video dados={config.playlists} />
      <StyledDesc>
        <CommentList comentario={config.playlists} />
      </StyledDesc>
    </StyledMainSection>
  );
}

const Video = (props) => {

    const playlistNames = Object.keys(props.dados);
    console.log(playlistNames)
    return (
        <>
            <StyledVideoPage>
                <div className="ratio ratio-16x9">
                    <iframe
                    src={`https://www.youtube.com/embed/QsqatJxAUtk?rel=0`}
                    title="Never Too Much"
                    allowFullscreen
                    ></iframe>
                </div>
                <div className="descricaoArea">
                    <h1>Frostpunk - Neve e Steak tartare</h1>
                    <div className="channelBox">
                    <div className="profileTube">
                        <img src={`https://github.com/${config.github}.png`} />
                        <span>
                        <p>Guilherme C.Morais</p>
                        <a>FullStack Developer</a>
                        </span>
                    </div>
                    <div className="btn-container">
                        <button className="btn-chn" type="button">
                        Inscrever-se
                        </button>
                        <button className="btn-like-deslike" type="button">
                        👍 Like
                        </button>
                        <button className="btn-like-deslike" type="button">
                        👎 Deslike
                        </button>
                        <button className="btn-comp" type="button">
                        🔃 Compartilhar
                        </button>
                    </div>
                    </div>
                </div>
            </StyledVideoPage>
        </>
    );
}

// const Video = (props) => {
//   const playlistNames = Object.keys(props.dados);

//   return (
//     <>
//       {playlistNames.map((playlistNames) => {
//         const videos = props.dados[playlistNames];
//         return (
//           <StyledVideoPage>
//             <div>
//               {videos.map((video) => {
//                 return (
//                   <>
//                     <div className="ratio ratio-16x9">
//                       <iframe
//                         src={`https://www.youtube.com/embed/${video.videp}?rel=0`}
//                         title="Never Too Much"
//                         allowFullscreen
//                       ></iframe>
//                     </div>
//                     <div className="descricaoArea">
//                       <h1>{video.title}</h1>
//                       <div className="channelBox">
//                         <div className="profileTube">
//                           <img
//                             src={`https://github.com/${config.github}.png`}
//                           />
//                           <span>
//                             <p>Guilherme C.Morais</p>
//                             <a>FullStack Developer</a>
//                           </span>
//                         </div>
//                         <div className="btn-container">
//                           <button className="btn-chn" type="button">
//                             Inscrever-se
//                           </button>
//                           <button className="btn-like-deslike" type="button">
//                             👍 Like
//                           </button>
//                           <button className="btn-like-deslike" type="button">
//                             👎 Deslike
//                           </button>
//                           <button className="btn-comp" type="button">
//                             🔃 Compartilhar
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 );
//               })}
//             </div>
//           </StyledVideoPage>
//         );
//       })}
//     </>
//   );
// };

const CommentList = (props) => {
  const playlistNames = Object.keys(props.comentario);

  return (
    <div>
      {playlistNames.map((playlistNames) => {
        const videos = props.comentario[playlistNames];
        return (
          <StyledComment>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <p>{video.title}</p>
                  </a>
                );
              })}
            </div>
          </StyledComment>
        );
      })}
    </div>
  );
};
