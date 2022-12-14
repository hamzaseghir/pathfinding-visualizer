import { useEffect, useState } from 'react';
import './node.css';

const useMatrix = () => {
  const [matrix, setMatrix] = useState<Array<Array<number>>>([[]]);

  const generateMatrix = () => {
    const arr = Array(2).fill(Array(2).fill(0));
    return arr;
  };

  useEffect(() => {
    setMatrix(generateMatrix());
  }, []);

  const handleClick = (event) => {
    event.currentTarget.style.backgroundColor = 'salmon';
    const xNode = event.currentTarget.dataset.x;
    const yNode = event.currentTarget.dataset.y;
    setMatrix(
      matrix.map((arr, arrayIndex) => {
        const n = [];
        arr.map((node, nodeIndex) => {
          if (arrayIndex == yNode && nodeIndex == xNode) {
            n.push(node + 1);
          } else {
            n.push(node);
          }
        });
        return n;
      })
    );
    /* setMatrix((prevState) => {
      const m = [...prevState];
      m[yNode][xNode] += 1;
      return [...m];
    }); */
  };

  const MatrixNodeStyle = {
    0: {
      ['--background-color']: '#FFFF',
    },
    1: {
      ['--background-color']: '#ff0202',
    },
    2: {
      ['--background-color']: '#02ff05',
    },
  };

  const matrixNode = (value: number, x: number, y: number) => {
    const nodeStyle = MatrixNodeStyle[value as keyof typeof MatrixNodeStyle];
    return (
      <p
        className="node"
        data-y={y}
        data-x={x}
        key={y + ' ' + x}
        onClick={handleClick}
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

    return <div className="matrixWrapper">{arr}</div>;
  };

  return { Matrix, generateMatrix, matrix };
};

const PathfindingVisualizer = () => {
  const { Matrix, generateMatrix, matrix } = useMatrix();

  return (
    <>
      <h1>Pathfindig Visualizer 🚀</h1>
      <Matrix {...matrix} />
    </>
  );
};

export default PathfindingVisualizer;
