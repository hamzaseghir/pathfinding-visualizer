let visited:Array<number> = [];
let queue:number[] = [];

const BreadthFirstSearch = (matrix:Map<number, number[]>, startNode:number, endNode:number) => {

  for(let node of matrix.get(startNode)!)visited.push(node)
  for(let node of matrix.get(startNode)!)queue.push(node)

  while(queue.length > 0){
    let s = queue.pop()!;
    console.log(s);

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
