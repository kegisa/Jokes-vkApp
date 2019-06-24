import React from 'react';
import {Button, FormLayout, Panel, PanelHeader, Textarea, FormStatus, Alert} from '@vkontakte/vkui';

interface SendProps {
    id: string;
}

interface SendState {

}

class SendComponent extends React.Component<SendProps, SendState> {
    closePopout () {
        this.setState({ popout: null });
    }

    render() {
        return (
            <Panel id="send" className="header">
                <PanelHeader>Предложить</PanelHeader>
                <img
                    className="Persik"
                    src={'./img/9.jpg'}
                />
                <FormLayout>
                <FormStatus title="Некорректный мобильный номер" state="error">
                    Необходимо корректно ввести номер в международном формате
                </FormStatus>
                    <Textarea
                        top="Мы просим тебя, пожалуйста,
                        проверь пунктуацию и ошибки, пусть твои анекдоты будет приятнее читать."
                        placeholder="Нарды, армяне ....."
                    />
                    <Button size="xl" level="secondary" onClick={this.sendingAnek}>Отправить</Button>
                </FormLayout>
            </Panel>

        );

    }
}

export const Send = (SendComponent);
