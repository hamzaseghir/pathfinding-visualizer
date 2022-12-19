import styled from 'styled-components';

type Props = {
  highlighted?:boolean;
  bg?:number;
};

export const MatrixWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 2rem);
  grid-template-rows: repeat(5, 2rem);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  p {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px dashed;
    border-color: white;
    color: black;
    text-align: center;
    }
`;

export const Node = styled.p`
  display: inline-block;
  width: 100%;
  height: 100%;
  border: 1px dashed;
  border-color: white;
  color: black;
  text-align: center;
`

export const StateButton = styled.button<Props>`
  background-color:${props => props.highlighted == true ? "#001858" : "#1a1a1a" };
`