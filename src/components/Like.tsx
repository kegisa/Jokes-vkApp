import React from 'react';
import {Button, Cell, Group, List, Panel, PanelHeader, ScreenSpinner} from '@vkontakte/vkui';
import Icon16Like from '@vkontakte/icons/dist/16/like';

interface LikeProps {
    id: string;
}

interface LikeState {
    jokes: any;
    isFetching: boolean;
}

class LikeComponent extends React.Component<LikeProps, LikeState> {

    state = {
        jokes: [],
        isFetching: true,
    };

    render() {

        const {jokes} = this.state;
        const {isFetching} = this.state;
        return (
            <Panel id="like">
                <PanelHeader>Любимые</PanelHeader>
                {isFetching && <ScreenSpinner className="spinner" size="large" style={{marginTop: 20}}/>}
                {jokes.map((joke: any, index: number) =>
                    <Group className="post" key={index}>
                        <List>
                            <Cell multiline={true} key={index}>
                                <text>{joke.joke}</text>
                            </Cell>
                            <Cell
                                key={index}
                                asideContent={
                                    <Button
                                        className="likes"
                                        level="tertiary"
                                        after={<Icon16Like/>}
                                        size="xl"
                                    >
                                        {joke.likes}
                                    </Button>
                                }
                            />
                        </List>
                    </Group>
                )}
            </Panel>

        );

    }
}

export const CustomLike = (LikeComponent);
