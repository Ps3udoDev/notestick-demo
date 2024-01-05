import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow'

import initialNodes from './nodes'
import initialEdges from './edges'


type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void
  updateNode: (node: Node)=> void
  selectedNode: Node | null,
  selectNode: (node: Node | null) => void
  getPropsOfParentNodes: (childNodeId: string | undefined) => object[]
}

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    const newEdge = {
      ...connection,
      animated: true,
    }
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },
  addNode: (newNode: Node) => {
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },
  updateNode: (updatedNode: Node) => {
    set((state) => ({
      nodes: state.nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)),
    }));
  },
  selectedNode: null,
  selectNode: (node: Node | null) => {
    set({ selectedNode: node });
  },
  getPropsOfParentNodes: (childNodeId: string | undefined): object[] => {
    const parentEdges = get().edges.filter((edge) => edge.target === childNodeId);
    const parentNodeProps: Node[] = [];

    parentEdges.forEach((parentEdge) => {
      const parentNodeId = parentEdge.source;
      const parentNode = get().nodes.find((node) => node.id === parentNodeId);
      if (parentNode) {
        parentNodeProps.push(parentNode.data);
      }
    });

    return parentNodeProps;
  },
}), shallow)


export default useStore;