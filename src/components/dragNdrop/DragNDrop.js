import React, {useState, useRef} from 'react';
//import DragNDrop from './DragNDrop';

//following tutorial: https://www.youtube.com/watch?v=Q1PYQPK9TaM&list=FLQvv_WSQH2toCC_I8nErujg
//by https://www.youtube.com/channel/UCUa7tKcxbqSpeTCd4UEaR5w user 'asat'
const DragArea = ({data}) => {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef(); //for specific node

    const handleDragStart = (e, params) => {
        console.log('drag starting ...', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        
        setTimeout(() => {
            setDragging(true);
        }, 0);  //Asynchronous delays the style change
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if(currentItem.groupIndex === params.groupIndex && currentItem.itemIndex === params.itemIndex){
            return 'current dnd-item';
        }
        return 'dnd-item';
    }

    const handleDragEnd = () => {
        console.log('Ending drag ...');
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragNode.current = null;
        dragItem.current = null;
    }

    const handleDragEnter = (e, params) => {
        console.log('Entering drag ...', params);
        const currentItem = dragItem.current;
        if(e.target !== dragNode.current){
            console.log('DIFFERENT TARGET');
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList)); //deep copy  --> [{},{}] objects copied deeply too
                newList[params.groupIndex].items.splice(params.itemIndex, 0, newList[currentItem.groupIndex].items.splice(currentItem.itemIndex, 1)[0]) //flips both
                dragItem.current = params;
                return newList;
            })
        }
    }

    return (
        <div className='drag-n-drop'>
            {list.map((group, groupIndex) => (
                <div 
                    key={group.title} 
                    className='dnd-group'
                    onDragEnter={dragging && !group.items.length ? (e) => handleDragEnter(e, {groupIndex, itemIndex: 0}) : null}
                >
                    <div className='group-title'>{group.title}</div>
                    {group.items.map((item, itemIndex) => (
                        <div 
                            key={item} 
                            draggable 
                            className={dragging? getStyles({groupIndex, itemIndex}) : 'dnd-item'}
                            onDragStart={(e) => {handleDragStart(e, {groupIndex, itemIndex})}}
                            onDragEnter={dragging ? (e) => {handleDragEnter(e, {groupIndex, itemIndex})} : null}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DragArea;

{/* <div className='dnd-group'>
    <div className="group-title">Group 1</div>
    <div className='dnd-item'>
        <div>
            <p>Item 1</p>
        </div>
    </div>
    <div className='dnd-item'>
        <div>
            <p>Item 2</p>
        </div>
    </div>
</div>
<div className='dnd-group'>
    <div className="group-title">Group 2</div>
    <div className='dnd-item'>
        <div>
            <p>Item 1</p>
        </div>
    </div>
    <div className='dnd-item'>
        <div>
            <p>Item 2</p>
        </div>
    </div>
    <div className='dnd-item'>
        <div>
            <p>Item 2</p>
        </div>
    </div>
</div>
<div className='dnd-group'>
    
</div> */}