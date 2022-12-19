import styled from 'styled-components';
import water from '../img/water.png';
import dirt from '../img/dirt.png'
import brick from '../img/brickwall.jpg'
import grass from '../img/grass.png';
import flag from '../img/flag.webp'

type Flag = {
  highlighted?:boolean;
};

type Node = {
  state:number;
}

export const MatrixWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 2rem);
  grid-template-rows: repeat(5, 2rem);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const nodeImgList = [dirt, brick, grass, water, flag]

export const Node = styled.p<Node>`
  display: inline-block;
  width: 100%;
  height: 100%;
  border: 1px dashed;
  border-color: white;
  color: black;
  text-align: center;
  background-image: url(${node => nodeImgList[node.state]});
  background-size:cover
`

export const StateButton = styled.button<Flag>`
  background-color:${flag => flag.highlighted == true ? "#001858" : "#1a1a1a" };
`