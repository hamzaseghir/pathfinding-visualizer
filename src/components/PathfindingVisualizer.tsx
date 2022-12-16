import { useEffect, useState } from 'react';
import { MatrixWrapper } from './PathfindingVisualizer.style';
import styled from 'styled-components';
import water from '../img/water.png';
import dirt from '../img/dirt.png'
import brick from '../img/brickwall.jpg'
import grass from '../img/grass.png';
import flag from '../img/flag.webp'

const useMatrix = () => {
  const [matrix, setMatrix] = useState<Array<Array<number>>>([[]]);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
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

  const handleNodeClick = (event) => {
    const xNode = event.currentTarget.dataset.x;
    const yNode = event.currentTarget.dataset.y;
    setMatrix(
      matrix.map((arr, arrayIndex) => {
        const n = [];
        arr.map((node, nodeIndex) => {
          if (arrayIndex == yNode && nodeIndex == xNode) {
            if (start) {
              n.push(3);
              handleStartFlag();
            } else if (end) {
              n.push(4);
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
  };

  const handleNodeHover = (event) => {
    if(!triggered){
      setTriggered(true);
      const xNode = event.currentTarget.dataset.x;
      const yNode = event.currentTarget.dataset.y;
      setMatrix(
        matrix.map((arr, arrayIndex) => {
          const n = [];
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
    setStart(!start);
  };

  const handleEndFlag = () => {
    setEnd(!end);
  };

  const StartButton = () => {
    return <button onClick={handleStartFlag}>Start node</button>;
  };

  const EndButton = () => {
    return <button onClick={handleEndFlag}>End node</button>;
  };

  const handleMouseOver = (event) => {
    if(pressed){
      handleNodeHover(event);
    }
  }

  const handleMouseDown = (event) =>{
      setPressed(true);
      setTriggered(true);
      handleNodeClick(event);
      console.log(triggered);
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
