import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { MatrixWrapper , StateButton, Node} from './PathfindingVisualizer.style';
import styled from 'styled-components';
import water from '../img/water.png';
import dirt from '../img/dirt.png'
import brick from '../img/brickwall.jpg'
import grass from '../img/grass.png';
import flag from '../img/flag.webp'



const useMatrix = () => {
  const [matrix, setMatrix] = useState<Array<Array<Node>>>([[]]);
  const [startFlag, setStartFlag] = useState({state:false});
  const [startNode, setStartNode] = useState(-1)
  const [prevStartNode, setPrevStartNode] = useState(-1);
  const [endFlag, setEndFlag] = useState({state:false});
  const [endNode, setEndNode] = useState(-1);
  const [prevEndNode, setPrevEndNode] = useState(-1);
  const [pressed, setPressed] = useState(false);
  const [triggered, setTriggered] = useState(false);

  type Node = {
    value:number,
    state:number
  }
  
  const generateMatrix = () => {
    // 28 x 75 ?
    const arr:Array<Array<Node>> = [];
    let count = 0;
    for(let i = 0 ; i < 5;i++){
      let arri:Array<Node> = []
      for(let j =0; j < 5; j++){
        arri.push({value:count++, state:0})
      }
      arr.push(arri);
    }
    return arr;
  };

  useEffect(() => {
    setMatrix(generateMatrix());
  }, []);


  useEffect(() => {
    if(startNode != -1 && prevStartNode != -1 
      && prevStartNode != startNode
      && prevStartNode != endNode )cleanUpNode(prevStartNode,);
  },[startNode])

  useEffect(() => {
    if(endNode != -1 && prevEndNode != -1 
      && prevEndNode != startNode
      && prevEndNode != endNode )cleanUpNode(prevEndNode);
  },[endNode])

  const cleanUpMatrix = () => {
    setStartNode(-1);
    setPrevEndNode(-1);
    setPrevEndNode(-1);
    setEndNode(-1);
    setMatrix(matrix.map(arr => {
      const n:Node[] = [];
      arr.map(node => {
        n.push({value:node.value,state:0})
      })
      return n;
    }))
  }

  const cleanUpNode = (value:number) => {
    setMatrix(
      matrix.map((arr, arrayIndex) => {
        const n:Node[] = [];
        arr.map((node, nodeIndex) => {
          if (node.value == value) {
            n.push({value:node.value, state:0});
        }else{
          n.push(node);
        }
      })
      return n;
  }))
}

  const updateMatrix =(value:number) =>{
    const prev = startNode;
    setMatrix(
      matrix.map((arr, arrayIndex) => {
        const n:Node[] = [];
        arr.map((node, nodeIndex) => {
          if (node.value == value) {
            if (startFlag.state) {
              n.push({value:node.value,state:3});
              if(endNode == value){
                setPrevEndNode(-1);
                setEndNode(-1);
              }
              setPrevStartNode(startNode)
              setStartNode(value);
              handleStartFlag();
            } else if (endFlag.state) {
              n.push({value:node.value,state:4});
              if(startNode == value){
                setStartNode(-1);
                setPrevStartNode(-1);
              }
              setPrevEndNode(endNode)
              setEndNode(value);
              handleEndFlag();
            } else {
              n.push({value:node.value,state:node.state > 2 ? 0 : (node.state + 1) % 3});
            }
          } else {
            n.push(node);
          }
        });
        return n;
      })
    );
  }

  const handleNodeClick = (event:BaseSyntheticEvent) => {
    const value = event.currentTarget.dataset.value;
    updateMatrix(value);
  };

  const handleNodeHover = (event:BaseSyntheticEvent) => {
    if(!triggered){
      setTriggered(true);
      const value = event.currentTarget.dataset.value;
      setMatrix(
        matrix.map((arr, arrayIndex) => {
          const n:Node[] = [];
          arr.map((node, nodeIndex) => {
            if (node.value == value) {
              n.push({value:node.value,state:node.state > 2 ? 0 : (node.state + 1) % 2});
          }else {
            n.push(node);
          }
        })
        return n;
      }))
    }
    return null;
};

  const handleStartFlag = () => {
    setStartFlag({state:!startFlag.state});
    if(startFlag.state == false)setEndFlag({state:false})
  };

  const handleEndFlag = () => {
    setEndFlag({state:!endFlag.state});
    if(endFlag.state == false)setStartFlag({state:false})
  };

  const StartButton = () => {
    return <StateButton onClick={handleStartFlag} highlighted={startFlag.state} >Start 🎯</StateButton>;
  };

  const EndButton = () => {
    return <StateButton onClick={handleEndFlag} highlighted={endFlag.state} >End 🏁</StateButton>;
  };

  const CleanUpButton = () => {
    return <StateButton onClick={cleanUpMatrix} >Clean up !</StateButton>
  }


  const handleMouseOver = (event:BaseSyntheticEvent) => {
    if(pressed){
      handleNodeHover(event);
    }
  }

  const handleMouseDown = (event:BaseSyntheticEvent) =>{
      setPressed(true);
      setTriggered(true);
      handleNodeClick(event);
  }

  const handleMouseUp = () => {
    setPressed(false);
    setTriggered(false);
  }
  const handleMouseLeave = () => {
    setTriggered(false);
  }

  const nodeImgList = [dirt, brick, grass, water, flag]

  const matrixNode = (value: number, state:number, y:number ,x:number) => {
    const nodeImg = nodeImgList[state];

    return (
      <Node
        data-value={value}
        key={y + ' ' + x}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleNodeClick}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: `url(${nodeImg})`, backgroundSize:'cover'}}
      >
      </Node>
    );
  };

  const Matrix = (array: Node[][]) => {
    const arr = [];
    for (let y = 0; y < Object.keys(array).length; y++) {
      for (let x = 0; x < array[y].length; x++) {
        arr.push(matrixNode(array[y][x].value, array[y][x].state, y,x));
      }
    }

    return <MatrixWrapper>{arr}</MatrixWrapper>;
  };

  return { Matrix, matrix, StartButton, EndButton , CleanUpButton};
};

const PathfindingVisualizer = () => {
  const { Matrix, matrix, StartButton, EndButton, CleanUpButton } =
    useMatrix();

  return (
    <>
      <h1>Pathfindig Visualizer 🚀</h1>
      <StartButton />
      <EndButton />
      <CleanUpButton  />
      <Matrix {...matrix} />
    </>
  );
};

export default PathfindingVisualizer;
