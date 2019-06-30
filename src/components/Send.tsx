import React from 'react';
import {Button, Checkbox, FormLayout, FormStatus, Panel, PanelHeader, Textarea} from '@vkontakte/vkui';
import {DispatchThunk, RootState} from '@store';
import {getFetchedUser} from '@store/app';
import {getAnecdoteShared, Thunks as apiThunks} from '@store/api';
import {connect} from 'react-redux';
import {FetchedUser} from '@models';

interface SendProps {
    id: string;
    uploadAnecdote: any;
    user?: FetchedUser;
    isAnecdoteShared: boolean;
    toggleFlag: any;
}

interface SendState {
    isAnonymous: boolean;
    isTooShort: boolean;
    isTooLong: boolean;
    anecdoteText: string;
    isSent: boolean;
}

class SendComponent extends React.Component<SendProps, SendState> {
    state = {
        isAnonymous: true,
        isTooShort: false,
        isTooLong: false,
        anecdoteText: '',
        isSent: false,
    };

    changeAnonymousStatus = () => {
        this.setState({
                ...this.state,
                isAnonymous: !this.state.isAnonymous,
            }
        );
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        const {anecdoteText, isAnonymous} = this.state;
        const {user} = this.props;
        // tslint:disable-next-line:no-debugger
        // debugger;
        if (!this.isAnecdoteTextTooShort() && !this.isAnecdoteTextTooLong()) {
            const userId = user ? user.id : null;
            const firstName = user ? user.first_name : null;
            const lastName = user ? user.last_name : null;
            this.props.uploadAnecdote &&
            this.props.uploadAnecdote(userId, anecdoteText, isAnonymous, `${firstName} ${lastName} `);
            // TODO: process response from server;
            this.setState({
                    ...this.state,
                    isSent: true,
                    isTooShort: false,
                    isTooLong: false,
                    anecdoteText: '',
                }
            );
            this.props.toggleFlag && this.props.toggleFlag();
            setInterval(() => (
                this.setState({
                        ...this.state,
                        isSent: false,
                    }
                )), 5000
            );

        }
    };

    isAnecdoteTextTooShort(): boolean {
        if (this.state.anecdoteText.length < 10) {
            this.setState({
                    ...this.state,
                    isTooShort: true,
                    isTooLong: false,
                }
            );
            return true;
        }
        return false;
    }

    isAnecdoteTextTooLong(): boolean {
        if (this.state.anecdoteText.length > 1000) {
            this.setState({
                    ...this.state,
                    isTooShort: false,
                    isTooLong: true,
                }
            );
            return true;
        }
        return false;
    }

    handleTextAreaChange = (e: any) => {
        this.setState({
            ...this.state,
            anecdoteText: e.target.value,
        });
    };

    render() {
        return (
            <Panel id="send" className="header">
                <PanelHeader>Предложить</PanelHeader>
                <img
                    className="Persik"
                    src={'./send.png'}
                />
                <FormLayout
                    onSubmit={this.handleSubmit}
                >
                    {
                        this.state.isTooShort &&
                        <FormStatus title="Анекдот слишком короткий" state="error">
                            Возможно ты не дописал.
                        </FormStatus>
                    }
                    {
                        this.state.isTooLong &&
                        <FormStatus title="Анекдот слишком длинный" state="error">
                            Постарайся сократить анекдот и попробуй еще раз.
                        </FormStatus>
                    }
                    {
                        this.state.isSent &&
                        <FormStatus title="Анекдот отправлен" state="default">
                            Ваш анекдот отправлен
                        </FormStatus>
                    }
                    <Textarea
                        top="Мы просим тебя, пожалуйста,
                        проверь пунктуацию и ошибки, пусть твои анекдоты будет приятнее читать."
                        placeholder="Анекдоты начинаются здесь"
                        value={this.state.anecdoteText}
                        onChange={this.handleTextAreaChange}
                    />
                    <Checkbox
                        value={this.state.isAnonymous}
                        onChange={this.changeAnonymousStatus}
                    >
                        Анонимно
                    </Checkbox>
                    <Button
                        size="xl"
                        level="secondary"
                        onClick={this.handleSubmit}
                    >
                        Отправить
                    </Button>
                </FormLayout>
            </Panel>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        user: getFetchedUser(state),
        isAnecdoteShared: getAnecdoteShared(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    uploadAnecdote: (userId: string, anecdoteText: string, isAnonymous: boolean, username: string) => {
        dispatch(apiThunks.uploadAnecdote(userId, anecdoteText, isAnonymous, username));
    },
    toggleFlag: () => {
        dispatch(apiThunks.toggleFlag());
    },
});

export const Send = connect(mapStateToProps, mapDispatchToProps)(SendComponent);
