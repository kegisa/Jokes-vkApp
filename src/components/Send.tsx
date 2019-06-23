import React from 'react';
import {Button, FormLayout, Panel, PanelHeader, Textarea, FormStatus, Alert} from '@vkontakte/vkui';

interface SendProps {
    id: string;
}

interface SendState {

}

class SendComponent extends React.Component<SendProps, SendState> {
    state = {
        popout: null,
    };

    sendingAnek() {
        this.openDestructive();
    }
    openDestructive() {
        this.setState({ popout:
            <Alert 
                actionsLayout="vertical" 
                actions={
                    [
                        {
                            title: 'Лишить права',
                            autoclose: true,
                            style: 'destructive'
                        }, 
                        {
                            title: 'Отмена',
                            autoclose: true,
                            style: 'cancel'
                        }
                    ]
                }
                onClose={this.closePopout}
            >
                <h2>Подтвердите действие</h2>
                <p>Вы уверены, что хотите лишить пользователя права на модерацию контента?</p>
            </Alert>
        });
    }

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
