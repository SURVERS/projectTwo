import { Show, TextField, EditButton, SimpleShowLayout, ImageField } from 'react-admin';

export const NewsShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="slug" />
            <TextField source="urlPreview" />
            <ImageField source="preview"/>
            <TextField source="createdAt" />
            <EditButton />
        </SimpleShowLayout>
    </Show>
);