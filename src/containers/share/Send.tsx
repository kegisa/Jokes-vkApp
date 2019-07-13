import React from 'react';
import {Button, Checkbox, FormLayout, FormStatus, Panel, PanelHeader, Textarea} from '@vkontakte/vkui';
import {DispatchThunk, RootState} from '@store';
import {getFetchedUser} from '@store/app';
import {getAnecdoteShared, getIsAnecdoteSent, getIsErrorAtSharing, Thunks as apiThunks} from '@store/api';
import {connect} from 'react-redux';
import {FetchedUser} from '@models';

interface SendProps {
    id: string;
    uploadAnecdote: any;
    user?: FetchedUser;
    isAnecdoteShared: boolean;
    toggleFlag: any;
    isErrorAtSharing: boolean;
    isSent: boolean;
}

interface SendState {
    isAnonymous: boolean;
    isTooShort: boolean;
    isTooLong: boolean;
    isUnvalidFormat: boolean;
    anecdoteText: string;
}

class SendComponent extends React.Component<SendProps, SendState> {
    state = {
        isAnonymous: false,
        isTooShort: false,
        isTooLong: false,
        isUnvalidFormat: false,
        anecdoteText: '',
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
        if (!this.isAnecdoteTextTooShort()
            && !this.isAnecdoteTextTooLong()
            && !this.isAnecdoteInvalidFormat()
        ) {
            const userId = user ? user.id : null;
            const firstName = user ? user.first_name : null;
            const lastName = user ? user.last_name : null;
            this.props.uploadAnecdote &&
            this.props.uploadAnecdote(userId, anecdoteText, isAnonymous, `${firstName} ${lastName} `);
            if (!this.props.isErrorAtSharing) {
                this.setState({
                        ...this.state,
                        isTooShort: false,
                        isTooLong: false,
                        isUnvalidFormat: false,
                        anecdoteText: '',
                    }
                );
                setInterval(() => (
                    this.props.toggleFlag
                    && this.props.toggleFlag()
                ), 6000);
            }
        }
    };

    isAnecdoteTextTooShort(): boolean {
        if (this.state.anecdoteText.length < 10) {
            this.setState({
                    ...this.state,
                    isUnvalidFormat: false,
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
                    isUnvalidFormat: false,
                    isTooShort: false,
                    isTooLong: true,
                }
            );
            return true;
        }
        return false;
    }

    isAnecdoteInvalidFormat(): boolean {
        const match = this.state.anecdoteText.match(/[а-яёa-z]{1,25}/gi);
        if (match == null || (match != null && match.length < 2)) {
            this.setState({
                ...this.state,
                isTooShort: false,
                isTooLong: false,
                isUnvalidFormat: true,
            });
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
                    className="imageSend"
                    src={'./send.png'}
                />
                <FormLayout
                    onSubmit={this.handleSubmit}
                >
                    {
                        this.state.isUnvalidFormat &&
                        <FormStatus title="Кажется, это не анекдот" state="error">
                            Возможно, Вы не дописали.
                        </FormStatus>
                    }
                    {
                        this.state.isTooShort &&
                        <FormStatus title="Анекдот слишком короткий" state="error">
                            Возможно, Вы не дописали.
                        </FormStatus>
                    }
                    {
                        this.state.isTooLong &&
                        <FormStatus title="Анекдот слишком длинный" state="error">
                            Постарайтесь сократить свой анекдот до 1000 символов и попробуйте еще раз.
                        </FormStatus>
                    }
                    {
                        this.props.isErrorAtSharing &&
                        <FormStatus title="Неполадки с соединением" state="error">
                            Ваш анекдот не был отправлен. Возникли трудности с интернет-соединением.
                            Повторите позже.
                        </FormStatus>
                    }
                    {
                        this.props.isSent &&
                        <FormStatus title="Анекдот отправлен" state="default">
                            Ваш анекдот отправлен
                        </FormStatus>
                    }
                    <Textarea
                        top="Мы просим Вас, пожалуйста,
                        проверьте пунктуацию и ошибки, пусть Ваши анекдоты будет приятнее читать."
                        placeholder="Анекдоты начинаются здесь"
                        value={this.state.anecdoteText}
                        onChange={this.handleTextAreaChange}
                    />
                    {
                        <Checkbox
                            value={this.state.isAnonymous}
                            onChange={this.changeAnonymousStatus}
                        >
                            Анонимно
                        </Checkbox>}
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
        isErrorAtSharing: getIsErrorAtSharing(state),
        isSent: getIsAnecdoteSent(state),
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
