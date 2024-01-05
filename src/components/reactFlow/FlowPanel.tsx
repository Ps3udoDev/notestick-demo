import 'reactflow/dist/style.css';

import useStore from '../../store/store';
import ReactFlow, { Background, Controls, MiniMap, Node, NodeTypes, ReactFlowInstance } from 'reactflow';
import InputNode from './Nodes/InputNode';
import { useCallback, useRef, useState } from 'react';
import PanelTypes from '../panels/PanelTypes';
import InputModal from '../modals/InputModal';

const nodeTypes: NodeTypes = {
  inputNode: InputNode,
}

let id = 0;
const getId = () => `Node_${id++}`;

const FlowPanel = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, selectNode } = useStore();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  console.log(nodes)


  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      interface CustomNode extends Node {
        data: {
          label: string;
          description?: string;
          trigger?: string;
          variables?: [];
          time?: {
            units: string,
            value: string
          };
          query?: string;
        }
      }
      const NODE_HEIGHT = 100;
      const columnWidth = reactFlowBounds.width / 4;
      // Calcula en qué columna cayó el nodo
      const column = Math.floor(position.x / columnWidth);
      // Ajusta la posición x para que esté al inicio de la columna
      const adjustedX = column * columnWidth;

      // Calcula la nueva posición y para apilar los nodos en la columna
      const nodesInColumn = nodes.filter(node => {
        const nodeColumn = Math.floor(node.position.x / columnWidth);
        return nodeColumn === column;
      });
      const adjustedY = nodesInColumn.length * NODE_HEIGHT;
      const baseNode: CustomNode = {
        id: getId(),
        type,
        position: { x: adjustedX + columnWidth / 2, y: adjustedY },
        data: {
          label: `Note ${id}`,
        },
        style: {
          background: '#27282c',
          borderRadius: '6px',
          border: 'solid 1px #6f62e8',
        },
      }

      if (type === 'inputNode') {
        baseNode.data.description = '';
        baseNode.data.variables = [];
        baseNode.data.trigger = ''
      } else if (type === 'defaultNode' || type === 'outputNode') {
        baseNode.data.description = '';
        baseNode.data.variables = [];
      } else if (type === 'tymeNode') {
        baseNode.data.time = {
          units: '',
          value: '',
        };
      } else {
        baseNode.data.variables = [];
        baseNode.data.query = '';
      }

      const newNode = { ...baseNode };
      addNode(newNode)

    },
    [addNode, reactFlowInstance]
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    selectNode(node);
  };

  return (
    <div className="flex w-full h-full items-center gap-2" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        panOnScroll={false}
        panOnDrag={false}
        zoomOnScroll={false}
      >
        <Background />
      </ReactFlow>
      <hr className="border-r-2 border-gray-500 h-5/6" />
      <div className='h-screen px-4 flex flex-col items-center justify-center gap-3'>
        <div className='py-4 border rounded-lg border-[#6f62e8] w-64 overflow-hidden'>
          <PanelTypes />
        </div>
        <InputModal />
      </div>
    </div>
  )
}

export default FlowPanel