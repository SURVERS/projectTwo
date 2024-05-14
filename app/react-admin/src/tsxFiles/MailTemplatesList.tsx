import { List, Datagrid, TextField, EditButton } from 'react-admin';

export const MailTemplatesList = (props:any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="template" />
            <EditButton />
        </Datagrid>
    </List>
);
