import React from 'react';
import {Button, FormLayout, Panel, PanelHeader, Textarea} from '@vkontakte/vkui';

interface SendProps {
    id: string;
}

interface SendState {

}

class SendComponent extends React.Component<SendProps, SendState> {

    render() {
        return (
            <Panel
                id="send"
                className="header"
            >
                <PanelHeader>Предложить</PanelHeader>
                <img
                    className="Persik"
                    src={'./img/9.jpg'}
                />
                <FormLayout>
                    <Textarea
                        top="Мы просим тебя, пожалуйста,
                        проверь пунктуацию и ошибки, пусть твои анекдоты будет приятнее читать."
                        placeholder="Нарды, армяне ....."
                    />
                    <Button size="xl" level="secondary">Отправить</Button>
                </FormLayout>
            </Panel>

        );

    }
}

export const Send = (SendComponent);
