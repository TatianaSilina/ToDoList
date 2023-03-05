import '../App.css';
import {FilterType} from "../App";
type propsType={
    name: string,
    callBack: () => void
    filter?: FilterType
}
export const Button = (props:propsType) => {
    
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button className={props.filter === props.name ? 'activeFilter' : ''} onClick={onClickHandler}>{props.name}</button>
    )
}