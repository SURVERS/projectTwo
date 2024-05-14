import { Edit, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const MailEdit = () => (
    <Edit title="Edit Mail Template">
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <RichTextInput multiline source="template" />
        </SimpleForm>
    </Edit>
);
export default MailEdit