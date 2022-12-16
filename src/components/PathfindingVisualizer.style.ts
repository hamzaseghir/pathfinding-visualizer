import styled from 'styled-components';

type Props = {
  value: number;
};

export const MatrixWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 2rem);
  grid-template-rows: repeat(10, 2rem);
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
  
  }
`;