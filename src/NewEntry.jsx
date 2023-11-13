import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "12212121212" } },
  { id: "2", position: { x: 0, y: 70 }, data: { label: "212121212121212" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function NewEntry() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //   const onConnect = useCallback(
  //     (params) => setEdges((eds) => addEdge(params, eds)),
  //     [setEdges]
  //   );
  return (
    <>
      <h3>Add new entry to your journal</h3>
      <div>Date: </div>
      <div style={{ width: "80vw", height: "80vh", border: "2px solid black" }}>
        Stop name:
        <ReactFlow
          nodes={nodes}
          edges={edges}
          //   onNodesChange={onNodesChange}
          //   onEdgesChange={onEdgesChange}
          //   onConnect={onConnect}
        />
      </div>
      <div>Upload photo:</div>
    </>
  );
}

export default NewEntry;
