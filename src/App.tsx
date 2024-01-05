import {ReactFlowProvider} from 'reactflow'
import FlowPanel from './components/reactFlow/FlowPanel'
const App = () => {
  return (
    <>
    <div className='bg-[#1c1d1f]'>
      <ReactFlowProvider>
        <div className='border-2 border-blue-600 m-auto items-center justify-center w-full h-screen'>
          <FlowPanel />
        </div>
      </ReactFlowProvider>
    </div>
    </>
  )
}

export default App