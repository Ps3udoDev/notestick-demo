
import { FunctionComponent, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import useInputModal from '../../../hooks/useInputModal';

type VariableNode = {
  name: string
  value: undefined
}

const InputNode: FunctionComponent<NodeProps> = memo(({ data, isConnectable }) => {
  const inputModal = useInputModal();

  const openInputModal = () => {
    inputModal.onOpen();
  }

  const handleDoubleClick = () => {
    openInputModal()
  }
  return (
    <>
      <div
        className='rounded-md text-xs text-center text-white'
        onDoubleClick={handleDoubleClick}
      >
        <h1 className='text-center text-base py-3 px-6 font-bold flex items-center gap-3'>
          {data?.label}
        </h1>
        
        {data?.description.length !== 0 ? (
          <div className='border-t border-gray-600 px-3'>
            <h2>Description:</h2>
            <p className='max-w-[120px] break-words'>{data?.description}</p>
          </div>
        ) : null}
       
      </div>
     
    </>
  )
})

export default InputNode
