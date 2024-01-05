import React from 'react'
import { FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCodeBranch } from 'react-icons/fa'
import { BiSolidTimeFive } from 'react-icons/bi'

const PanelTypes = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <aside className='w-[230px] h-[300px] m-auto flex flex-col items-center overflow-hidden '>
      <h2 className="text-center text-white font-bold my-1 text-lg">Notes</h2>
      <hr className="border-t-2 border-[#6f62e8] my-3 w-4/5" />
      
        <div className="h-16 p-1 border border-solid border-[#6f62e8] rounded-lg flex justify-center items-center cursor-grab gap-2" onDragStart={(event) => onDragStart(event, 'inputNode')} draggable>
          <p className="text-xs text-center text-white px-8">Add Note</p>
        </div>
       
    </aside>
  )
}

export default PanelTypes