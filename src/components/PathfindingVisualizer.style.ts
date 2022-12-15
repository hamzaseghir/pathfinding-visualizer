import styled from 'styled-components';

type Props = {
  value: number;
};

export const MatrixWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2rem);
  grid-template-rows: repeat(2, 2rem);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  p {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 2px solid;
    border-color: red;
    color: black;
    text-align: center;
    }
  
  }
`;

const NodeStyle = ['#FFF2', '#ff0202', '#02ff05'];

export const Node = styled.p<Props>`
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 2px solid;
    border-color: red;
    background:purple;
    color: black;
    text-align: center;
}`;
