import { useDrop } from 'react-dnd'
import { ItemTypes } from '../constants/ItemTypes.js'
const style = {
  border: '1px dashed black',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
export const DropField = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.DENSE, ItemTypes.ACTIVATION, ItemTypes.BATCH, ItemTypes.DROPOUT],
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#ffffff'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}
