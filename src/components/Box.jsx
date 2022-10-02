import { useDrag } from 'react-dnd'
import { ItemTypes } from '../constants/ItemTypes.js'

let style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
export const Box = function Box({ name, type, color }) {
  style.border = '1px dashed ' + color;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  const onMouseOver = (e) => {
    e.target.style.backgroundColor = color;
  }
  const onMouseLeave = (e) => {
    e.target.style.backgroundColor = "white";
  }
  return (
    <div 
        ref={drag} 
        style={{ ...style, opacity }} 
        data-testid={`box`} 
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseLeave}
    >
      {name}
    </div>
  )
}
