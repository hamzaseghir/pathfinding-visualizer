const BreadthFirstSearch = (matrix:Map<number, number[]>, startNode:number, endNode:number) => {
  let visited:Array<number> = [];
  let queue:number[] = [];
  queue.push(startNode);
  visited.push(startNode);

  while(queue.length > 0){
    let s = queue.pop()!;
    console.log( "visited = ", visited[visited.length-1]);
    if(visited[visited.length-1] == endNode){
      console.log("break")
      break;
    }
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
