import styled from "styled-components";

export const StyledTimeline = styled.div`
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
    padding: 32px 0 0 32px;

    div {
      padding-bottom: 1rem;
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