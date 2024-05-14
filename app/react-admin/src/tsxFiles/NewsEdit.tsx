import { Edit, SimpleForm, TextInput, BooleanInput, DateInput } from 'react-admin';

export const NewsEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="slug" />
            <TextInput source="preview" />
            <BooleanInput source="hidden" />
            <DateInput source="createdAt"  />
        </SimpleForm>
    </Edit>
);

export default NewsEdit;