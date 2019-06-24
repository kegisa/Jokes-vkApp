import React, {FunctionComponent} from 'react';
import {Button, Cell, Group, List} from '@vkontakte/vkui';
import Icon16Like from '@vkontakte/icons/dist/16/like';

interface Props {
    id: number;
    joke: any;
    likePressed: any;
}

const AnecdoteComponent: FunctionComponent<Props> = props => {
    const {id, joke, likePressed} = props;
    return (
        <Group className="post" key={id}>
            <List>
                <Cell multiline={true}>
                    {joke.joke}
                </Cell>
                <Cell
                    key={id + 1}
                    asideContent={
                        <Button
                            className="likes"
                            level="tertiary"
                            after={<Icon16Like/>}
                            size="xl"
                            onClick={likePressed}
                        >
                            {Math.floor(Math.random() * 100) + 1}
                        </Button>
                    }
                />
            </List>
        </Group>
    );
};

export const Anecdote = AnecdoteComponent;
