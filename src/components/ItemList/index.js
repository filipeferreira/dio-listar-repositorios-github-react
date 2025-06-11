import React from 'react'
import './styles.css';

export default function ItemList({title, description, onRemove}) {



  return (
    <div className='item-list'>
      <strong>{title}</strong>
      <p>{description ? description : '---'}</p>
      <button className='remover' onClick={onRemove}>Remover</button>
      <hr></hr>
    </div>
  )
}
