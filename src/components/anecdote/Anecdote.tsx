import React, {FunctionComponent} from 'react';
import {Button, Cell, Group, List} from '@vkontakte/vkui';
import Icon16Like from '@vkontakte/icons/dist/16/like';
import Icon16LikeOutline from '@vkontakte/icons/dist/16/like_outline';
import {IAnecdote} from '@models';

interface Props {
    id: number;
    joke: IAnecdote;
    likePressed: any;
}

const AnecdoteComponent: FunctionComponent<Props> = props => {
    const {id, joke, likePressed} = props;
    const isLikePressed = joke.like === 1;
    // tslint:disable-next-line:no-console
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
                />
            </List>
        </Group>
    );
};

export const Anecdote = AnecdoteComponent;
