import React from 'react';
import { Button, Cell } from '@vkontakte/vkui';
import Icon16Like from '@vkontakte/icons/dist/16/like';
import Icon16ReplyOutline from '@vkontakte/icons/dist/16/reply_outline';
import '../assets/style.css';

const BottomCell = (props) => {
    return(
        <Cell
            asideContent={<Button className="likes" level="tertiary" after={<Icon16Like/>} size="xl" onClick={props.onClickLike}>{props.quantity}</Button>} 
            before={<Button className="likes" level="tertiary" after={<Icon16ReplyOutline/>} size="xl" onClick={props.onClickRepost}/>}
        />
    );
};
export default BottomCell;