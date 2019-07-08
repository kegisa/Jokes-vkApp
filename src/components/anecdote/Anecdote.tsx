import React, {FunctionComponent} from 'react';
import {Button, Cell, Group, List} from '@vkontakte/vkui';
import Icon16Like from '@vkontakte/icons/dist/16/like';
import Icon16LikeOutline from '@vkontakte/icons/dist/16/like_outline';
import Icon16ReplyOutline from '@vkontakte/icons/dist/16/reply_outline';
import {IAnecdote} from '@models';
import '../../assets/style.css';

interface Props {
    id: number;
    joke: IAnecdote;
    likePressed: any;
    repostPressed: any;
}

const AnecdoteComponent: FunctionComponent<Props> = props => {
    const {id, joke, likePressed, repostPressed} = props;
    return (
        <Group className="post" key={joke.id}>
            <List>
                <Cell
                    multiline={true}
                    description={joke.author !== 'anon' && <div className="author">{`Автор: ${joke.author}`}</div>}
                >
                    <div className="mlCell">
                        {joke.joke}
                    </div>
                </Cell>
                <Cell
                    id={joke.id}
                    className="mlCell"
                    key={joke.id}
                    asideContent={
                        <Button
                            id={joke.id}
                            key={joke.id}
                            className="likes"
                            level="tertiary"
                            after={

                                joke.isLiked ?

                                    <Icon16Like id={joke.id}/>
                                    :
                                    <Icon16LikeOutline id={joke.id}/>
                            }
                            size="xl"
                            onClick={() => likePressed(joke.id)}
                        >
                            {joke.likes + ''}
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
