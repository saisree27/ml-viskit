import { memo } from 'react'
import { useDrop } from 'react-dnd'
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '0.2rem',
  marginBottom: '1.5rem',
  border: '1px dashed black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
export const DropField = memo(function DropField({
  accept,
  lastDroppedItem,
  onDrop,
  strname,
  bg
}) {
  console.log(strname);
  console.log(bg);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = '#ffffff'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor: bg }} data-testid="dustbin">
      {strname}
    </div>
  )
})
