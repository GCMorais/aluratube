import { MdOutlineEmojiEvents } from "react-icons/md";
import styled from "styled-components";

const StyledFooter = styled.section`
  text-align: center;
  padding: 3rem 1rem 1rem;

  h4{
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0rem
  }
  div:nth-child(1){
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    padding-bottom: 1rem;

    span{
      color: ${({ theme }) => theme.textColorBase || "#222222"};
    }
  }
  strong{
    opacity: .7;
  }
`

const Footer = () =>{
  return (
    <StyledFooter>
      <div>
        <span><MdOutlineEmojiEvents size={23}/></span>
        <h4>Desenvolvido por Guilherme C.Morais - <strong>2022</strong></h4>
      </div>
    </StyledFooter>
  )
}

export default Footer