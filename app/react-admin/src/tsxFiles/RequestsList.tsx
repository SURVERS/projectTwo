import { List, Datagrid, TextField, DateField } from 'react-admin';

export const RequestsList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="phoneNumber" />
            <TextField source="name" />
            <TextField source="mail" />
            <TextField source="request_post" />
            <DateField source="dataTime" />
        </Datagrid>
    </List>
);