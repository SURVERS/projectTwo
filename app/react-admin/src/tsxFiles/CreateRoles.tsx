import { Create, SimpleForm, TextInput, BooleanInput, DateInput } from 'react-admin';

export const CreateRoles = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name_roles" />
        </SimpleForm>
    </Create>
);

export default CreateRoles;