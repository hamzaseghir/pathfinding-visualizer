import { useEffect, useState } from 'react';
import { MatrixWrapper } from './PathfindingVisualizer.style';
import styled from 'styled-components';

const useMatrix = () => {
  const [matrix, setMatrix] = useState<Array<Array<number>>>([[]]);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const generateMatrix = () => {
    const arr = Array(2).fill(Array(2).fill(0));
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

  const nodeStyleList = ['#FFFF', '#FFF2', '#02ff05', '#ff0202', '#0226ff'];

  const matrixNode = (value: number, x: number, y: number) => {
    const nodeStyle = nodeStyleList[value];
    return (
      <p
        className="node"
        data-y={y}
        data-x={x}
        key={y + ' ' + x}
        onClick={handleNodeClick}
        style={{ backgroundColor: nodeStyle }}
      >
        {value}
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
