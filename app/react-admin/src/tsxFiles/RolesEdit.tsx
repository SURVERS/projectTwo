import { Edit, SimpleForm, TextInput } from 'react-admin';

export const RolesEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name_roles" />
        </SimpleForm>
    </Edit>
);

export default RolesEdit;