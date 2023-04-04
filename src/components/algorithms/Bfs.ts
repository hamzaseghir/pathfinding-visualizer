let visited:Array<number> = [];
let queue:number[] = [];

const BreadthFirstSearch = (matrix:Map<number, number[]>, startNode:number, endNode:number) => {

  visited.push(Number(startNode));
  queue.push(Number(startNode))

  while(queue.length > 0){
    let s = queue.pop()!;
    console.log("s:", matrix.get(s));
    console.log("visited:", visited);

    for(let node of matrix.get(s)!){
      if(!visited.includes(node)){
        visited.push(node);
        queue.push(node);
      }
    }
  }
  return visited;
}

export default BreadthFirstSearch;
