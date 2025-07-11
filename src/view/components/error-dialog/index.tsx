import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { errorDialogEmitter, ErrorDialogPayload } from '../../../utils/error-handler';

const ErrorDialog: React.FC = () => {
    const [visible, setVisible] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        const handler = (payload: ErrorDialogPayload) => {
            setTitle(payload.title);
            setMessage(payload.message);
            setVisible(true);
        };
        errorDialogEmitter.on('show', handler);
        return () => {
            errorDialogEmitter.off('show', handler);
        };
    }, []);

    const hideDialog = () => {
        setVisible(false);
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default ErrorDialog;