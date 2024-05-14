import { Create, SimpleForm, TextInput, BooleanInput, DateInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const CreateMails = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <RichTextInput multiline source="template" />
        </SimpleForm>
    </Create>
);

export default CreateMails;