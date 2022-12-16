import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { MatrixWrapper , StateButton} from './PathfindingVisualizer.style';
import styled from 'styled-components';
import water from '../img/water.png';
import dirt from '../img/dirt.png'
import brick from '../img/brickwall.jpg'
import grass from '../img/grass.png';
import flag from '../img/flag.webp'

const useMatrix = () => {
  const [matrix, setMatrix] = useState<Array<Array<number>>>([[]]);
  const [startFlag, setStartFlag] = useState({state:false});
  const [startNode, setStartNode] = useState([-1,-1])
  const [prevStartNode, setPrevStartNode] = useState([-1,-1]);
  const [endFlag, setEndFlag] = useState({state:false});
  const [endNode, setEndNode] = useState([-1,-1]);
  const [prevEndNode, setPrevEndNode] = useState([-1,-1]);
  const [pressed, setPressed] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const generateMatrix = () => {
    // 28 x 75 ?
    const arr = Array(10).fill(Array(20).fill(0));
    return arr;
  };

  useEffect(() => {
    setMatrix(generateMatrix());
  }, []);


  useEffect(() => {
    if(startNode[0] != -1 && prevStartNode[0] != -1)cleanUpNode(prevStartNode[0],prevStartNode[1]);
  },[startNode])

  useEffect(() => {
    if(endNode[0] != -1 && prevEndNode[0] != -1)cleanUpNode(prevEndNode[0],prevEndNode[1]);
  },[endNode])

  const cleanUpMatrix = () => {
    setMatrix(matrix.map(arr => {
      const n:number[] = [];
      arr.map(node => {
        n.push(0)
      })
      return n;
    }))
  }

  const cleanUpNode = (y:number,x:number) => {
    setMatrix(
      matrix.map((arr, arrayIndex) => {
        const n:number[] = [];
        arr.map((node, nodeIndex) => {
          if (arrayIndex == y && nodeIndex == x) {
            n.push(0);
        }else{
          n.push(node);
        }
      })
      return n;
  }))
}

  const updateMatrix =(y:number,x:number) =>{
    const prev = startNode;
    setMatrix(
      matrix.map((arr, arrayIndex) => {
        const n:number[] = [];
        arr.map((node, nodeIndex) => {
          if (arrayIndex == y && nodeIndex == x) {
            if (startFlag.state) {
              n.push(3);
              setPrevStartNode([startNode[0],startNode[1]])
              setStartNode([y,x]);
              handleStartFlag();
            } else if (endFlag.state) {
              n.push(4);
              setPrevEndNode([endNode[0],endNode[1]])
              setEndNode([y,x]);
              handleEndFlag();
            } else {
              n.push(node > 2 ? 0 : (node + 1) % 3);
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
    const xNode = event.currentTarget.dataset.x;
    const yNode = event.currentTarget.dataset.y;
    updateMatrix(yNode,xNode);
  };

  const handleNodeHover = (event:BaseSyntheticEvent) => {
    if(!triggered){
      setTriggered(true);
      const xNode = event.currentTarget.dataset.x;
      const yNode = event.currentTarget.dataset.y;
      setMatrix(
        matrix.map((arr, arrayIndex) => {
          const n:number[] = [];
          arr.map((node, nodeIndex) => {
            if (arrayIndex == yNode && nodeIndex == xNode) {
              n.push(node > 2 ? 0 : (node + 1) % 2);
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

  //const nodeStyleList = ['#FFFF', '#FFF2', '#02ff05', '#ff0202', '#0226ff'];
  const nodeImgList = [dirt, brick, grass, water, flag]

  const matrixNode = (value: number, x: number, y: number) => {
    //const nodeStyle = nodeStyleList[value];
    const nodeImg = nodeImgList[value];

    return (
      <p
        className="node"
        data-y={y}
        data-x={x}
        key={y + ' ' + x}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleNodeClick}
        onMouseLeave={handleMouseLeave}
        //style={{ backgroundColor: nodeStyle }}
        style={{ backgroundImage: `url(${nodeImg})`, backgroundSize:'cover'}}
      >
      </p>
    );
  };

  const Matrix = (array: number[][]) => {
    const arr = [];
    for (let y = 0; y < Object.keys(array).length; y++) {
      for (let x = 0; x < array[y].length; x++) {
        arr.push(matrixNode(array[y][x], x, y));
      }
    }

    return <MatrixWrapper>{arr}</MatrixWrapper>;
  };

  return { Matrix, generateMatrix, matrix, StartButton, EndButton };
};

const PathfindingVisualizer = () => {
  const { Matrix, generateMatrix, matrix, StartButton, EndButton } =
    useMatrix();

  return (
    <>
      <h1>Pathfindig Visualizer 🚀</h1>
      <StartButton />
      <EndButton />
      <Matrix {...matrix} />
    </>
  );
};

export default PathfindingVisualizer;
