import React from 'react';
import { Panel, PanelHeader, Group, Button, Cell, Avatar, Div } from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

interface AboutProps {
    id: any;
    isFetching: boolean;
    isErrorFetchingTopUsers: boolean;
    topUsers: any[];
    onLoadUserInfo: any;
}

interface AboutState {
    topUsers: any;
    isFetching: boolean;
}

class AboutComponent extends React.Component<any, AboutState> {
    state = {
        topUsers: [],
        isErrorFetchingTopUsers: false,
        isFetching: true,
    };

    componentDidMount() {
        this.props.onLoadUserInfo && this.props.onLoadUserInfo();
    }

    donateMoney() {
        connect.subscribe((data) => {
            switch (data.detail.type) {
                case 'VKWebAppOpenPayFormResult':
                    // send request to back
                    break;
                default:
            }
        });
        connect.send('VKWebAppOpenPayForm', {
            app_id: 6909581,
            action: 'transfer-to-group',
            params: { group_id: 184902166 },
        });
    }

    render() {
        return (
            <Panel id="about">
                <PanelHeader>
                    Вопросы
                </PanelHeader>
                <Group
                    title="Помощь сервису"
                >
                    <img
                        className="imageSend"
                        src={'./donat.png'}
                    />
                    <Div>
                        <Button size="xl" level="2" onClick={this.donateMoney}>
                            Сказать спасибо сервису
                        </Button>
                    </Div>
                </Group>
                <Group
                    title="Контакты"
                >
                    <Cell
                        multiline={true}
                        description={'По поводу рекламы, сотрудничества,' +
                            ' совместной разработки и улучшений. '}
                        href={`https://vk.com/id99444331`}
                        target="_blank"
                        before={<Avatar
                            size={40}
                            src={'https://sun7-7.userapi.com/c850536/v850536690/fb00c/WfX_x9bH2ds.jpg?ava=1'}
                        />}
                    >
                        Victor Levin
                    </Cell>
                </Group>
            </Panel>
        );
    }
}

export const About = AboutComponent;
