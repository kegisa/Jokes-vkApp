import React, {FunctionComponent} from 'react';
import {Button, Cell, Group, List} from '@vkontakte/vkui';
import Icon16Like from '@vkontakte/icons/dist/16/like';
import Icon16LikeOutline from '@vkontakte/icons/dist/16/like_outline';
import Icon16ReplyOutline from '@vkontakte/icons/dist/16/reply_outline';
import {IAnecdote} from '@models';

interface Props {
    id: number;
    joke: IAnecdote;
    likePressed: any;
    repostPressed: any;
}

const AnecdoteComponent: FunctionComponent<Props> = props => {
    const {id, joke, likePressed, repostPressed} = props;
    const isLikePressed = joke.like === 1;
    return (
        <Group className="post" key={joke.anek_id}>
            <List>
                <Cell multiline={true}>
                    {joke.joke}
                </Cell>
                <Cell
                    id={joke.anek_id}
                    key={joke.anek_id}
                    asideContent={
                        <Button
                            id={joke.anek_id}
                            key={joke.anek_id}
                            className="likes"
                            level="tertiary"
                            after={
                                isLikePressed ?
                                    <Icon16Like id={joke.anek_id}/>
                                    :
                                    <Icon16LikeOutline id={joke.anek_id}/>
                            }
                            size="xl"
                            onClick={() => likePressed(joke.anek_id)}
                        >
                            {joke.likes}
                        </Button>
                    }
                    before={
                        <Button
                            className="likes"
                            level="tertiary"
                            after={<Icon16ReplyOutline/>}
                            size="xl"
                            onClick={() => repostPressed(joke.joke)}
                        />
                    }
                />
            </List>
        </Group>
    );
};

export const Anecdote = AnecdoteComponent;
