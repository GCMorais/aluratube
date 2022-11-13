import { useRouter } from "next/router";
import styled from "styled-components";

const StyledVideoPlayer = styled.div`
  padding: 4.5rem 1rem 0 4rem;
  width: 100%;
  transition: none;

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
    cursor: pointer;
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
  .desable p {
    font-family: "Roboto", "Arial", sans-serif;
    font-size: 15px;
    line-height: 2rem;
    font-weight: 400;
    padding-top: 4rem;
    text-align: center;
    cursor: unset;
  }
  .desable a {
    color: #36a1e8;
    font-weight: 400;
    opacity: 0.9;
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
    .desable {
      visibility: unset;
    }
  }
`;

const VideoPlayer = () => {
  const router = useRouter();
  return (
    <StyledVideoPlayer>
      <div>
            <div className="ratio ratio-16x9">
                <iframe
                src={`https://www.youtube.com/embed/${router.query.v}`}
                title="Youtube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                ></iframe>
            </div>
            <div className="descricaoArea">
                <h1 className="title">{router.query.title}</h1>
            <div className="channelBox">
                <div className="profileTube">
                <img src={`https://github.com/GCMorais.png`} />
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
            <div className="desable">
                <p>
                Os comentários estão desativados.{" "}
                <a
                    target="_blank"
                    href="https://httpstatusdogs.com/404-not-found"
                >
                    Saiba mais
                </a>
                </p>
            </div>
            </div>
      </div>
    </StyledVideoPlayer>
  );
};

export default VideoPlayer;

