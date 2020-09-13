import React, {useState} from 'react';
import './Task.css';

const Checkbox = (props) => {
    return (
        <span>
            <input type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
            />
        </span>
    )
}

const Task = ({info}) => {

    const [done, setDone] = useState(false);
    const [value, setValue] = useState(info.status);
    const [prior, setPrior] = useState(value);

    return(
        <div className='task-container' style={(done) ? styles.complete : styles.ongoing}>
            <div className='task'> 
                <div className="top">         
                    <Checkbox checked={done} 
                        onChange={() => {
                            setDone(!done);
                            if(done===false){
                                setPrior(value);
                                setValue(100);
                            }else{
                                setValue(prior);
                            }
                        }}
                    />
                    <div>
                        {info.title}    
                    </div>
                </div>  
                <div>
                    <input 
                        type='range' min='0' max='100' 
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value);
                            if(event.target.value==100){
                                setDone(true);
                            }else{
                                setDone(false);
                            }
                        }}
                        className='slider'
                    />
                </div>
                <div className="Bottom">
                    <div>
                        {`${value}%`}
                    </div>
                    <p>
                        {info.description}
                    </p>
                </div>
            </div>
        </div>
    )
}


const styles = {
    ongoing : {
      'background' : 'red',
    },
    complete :{
      'background' : 'yellow',
    }
  }

export default Task;