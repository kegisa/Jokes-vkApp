import React from 'react';
import {Button, Checkbox, FormLayout, FormStatus, Panel, PanelHeader, Textarea} from '@vkontakte/vkui';
import {DispatchThunk, RootState} from '@store';
import {getFetchedUser} from '@store/app';
import {Thunks as apiThunks} from '@store/api';
import {connect} from 'react-redux';
import {FetchedUser} from '@models';

interface SendProps {
    id: string;
    uploadAnecdote: any;
    user?: FetchedUser;
}

interface SendState {
    isAnonymous: boolean;
    isTooShort: boolean;
    isTooLong: boolean;
    anecdoteText: string;
}

class SendComponent extends React.Component<SendProps, SendState> {
    state = {
        isAnonymous: true,
        isTooShort: false,
        isTooLong: false,
        anecdoteText: 'Одной ногой тут , а другой там!',
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
        const {anecdoteText, isTooLong, isTooShort, isAnonymous} = this.state;
        const {user} = this.props;
        if (anecdoteText.length < 10) {
            this.setState({
                    ...this.state,
                    isTooShort: true,
                    isTooLong: false,
                }
            );
        }
        if (anecdoteText.length > 100) {
            this.setState({
                    ...this.state,
                    isTooShort: false,
                    isTooLong: true,
                }
            );
        }
        if (!isTooLong && !isTooShort) {
            const userId = user ? user.id : null;
            const firstName = user ? user.first_name : null;
            this.props.uploadAnecdote &&
                this.props.uploadAnecdote(userId, anecdoteText, isAnonymous, firstName);
        }
    };

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
                    src={'./anek.jpg'}
                />
                <FormLayout
                    onSubmit={this.handleSubmit}
                >
                    {
                        this.state.isTooShort &&
                        <FormStatus title="Анекдот слишком короткий" state="error">
                            Анекдод должен содержать больше 10 символов!
                        </FormStatus>
                    }
                    {
                        this.state.isTooLong &&
                        <FormStatus title="Анекдот слишком длинный" state="error">
                            Анекдод не должен содержать больше 10000 символов!
                        </FormStatus>
                    }
                    <Textarea
                        top="Мы просим тебя, пожалуйста,
                        проверь пунктуацию и ошибки, пусть твои анекдоты будет приятнее читать."
                        placeholder="Нарды, армяне ....."
                        value={this.state.anecdoteText}
                        onChange={this.handleTextAreaChange}
                    />
                    <Checkbox
                        value={this.state.isAnonymous}
                        onChange={this.changeAnonymousStatus}
                    >
                        Я хочу отправить анекдот анонимно
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
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    uploadAnecdote: (userId: string, anecdoteText: string, isAnonymous: boolean, username: string) => {
        dispatch(apiThunks.uploadAnecdote(userId, anecdoteText, isAnonymous, username));
    },
});

export const Send = connect(mapStateToProps, mapDispatchToProps)(SendComponent);
