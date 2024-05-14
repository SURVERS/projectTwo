import { List, Datagrid, TextField, ImageField, ShowButton, EditButton } from 'react-admin';

export const NewsList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="slug" />
            <TextField source="urlPreview" />
            <ImageField source="preview"/>
            <TextField source="createdAt" />
            <ShowButton label="Show news" />
            <EditButton />
        </Datagrid>
    </List>
);