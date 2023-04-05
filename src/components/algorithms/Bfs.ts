let visited:Array<number> = [];
let queue:number[] = [];

const BreadthFirstSearch = (matrix:Map<number, number[]>, startNode:number, endNode:number) => {
  console.log("Start node : ", startNode, 'type of :' , typeof(startNode));
  visited.push(startNode);
  queue.push(startNode)

  while(queue.length > 0){
    let s = queue.pop()!;
    if(visited[visited.length-1] == endNode)break;

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
