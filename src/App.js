import React, {useState} from 'react';
import './App.css';
import Task from './components/tasks/Task';
import Menu from './components/Menu';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';


const itemsF = [
  {
    id: uuid(),
    content: 'First task'
  },
  {
    id: uuid(),
    content: 'Second task'
  }
]

const columnsF = {
  [uuid()]: {
    name: 'Todo',
    items: itemsF
  },
  [uuid()]: {
    name: 'In Progress',
    items: []
  },
  [uuid()]: {
    name: 'Done',
    items: []
  }
}

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  
  const {source, destination} = result;
  if(source.droppableId!==destination.droppableId){
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId] : {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column, 
        items: copiedItems
      }
    })
  }
}

function App() {

  const tasks = [
    {
      title: 'T1',
      description: 'dawddawdwadwawd',
      status: 60,
    }, 
    {
      title: 'T2',
      description: 'dawddawdwadwawd',
      status: 25
    },
    {
      title: 'T3',
      description: 'dawddawdwadwawd',
      status: 40
    },
    {
      title: 'T4',
      description: 'dawddawdwadwawd',
      status: 25
    }
  ];

  const [columns, setColumns] = useState(columnsF)

  const tasksList = (tasks.length>0)
    ? tasks.map((item)=> {
      return <Task info={item}/>
    })
    : <div></div>


  return (
    <div className="app-container">
      <div>
        <Menu />
      </div>
      <div className='tasklist'>
        {tasksList}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
      }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <h2>{column.name}</h2>
                <div style={{margin: 8}}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 500
                      }}
                      >
                        {column.items.map((item,index) => {
                          return (
                            <Draggable key = {item.id}
                            draggableId={item.id}
                            index={index}>
                              {(provided, snapshot)=>{
                                return (
                                  <div ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: 'none',
                                    padding: 16,
                                    margin: '0 0 8px 0',
                                    minHeight: '50px',
                                    backgroundColor: snapshot.isDragging ? '#36384A' : '#456C86',
                                    color: 'white',
                                    ...provided.draggableProps.style
                                  }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
