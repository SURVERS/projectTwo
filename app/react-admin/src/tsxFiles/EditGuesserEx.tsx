import { Edit, SimpleForm, TextInput, SelectInput, required } from 'react-admin';
import { useState, useEffect } from 'react'
import jwtInterceptor from "../axiosRequest";

const fetchRoles = async () => {
    try {
        const response = await jwtInterceptor.get('/undefined/api/Roles');
        const roles = response.data.data.map((role: { name: string, id: string, name_roles:string }) => ({
            id: role.name_roles,
            name: role.name_roles
        }));
        return roles;
    } catch (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
};

export const UserEdit = (props: any) => {
    const [roles, setRoles] = useState<{ name: string, id: string, name_roles:string}[]>([]);

    useEffect(()  => {
        fetchRoles()
            .then(roles => setRoles(roles))
            .catch(error => console.error('Error setting roles:', error));
    }, []);
    return (
        <Edit>
            <SimpleForm>
                <TextInput source ="id" />
                <TextInput source="last_name" />
                <TextInput source="fist_name" />
                <TextInput source="login" />
                <TextInput source="password" />
                {roles.length === 0 ? (
                    <p>Loading roles...</p>
                ) : (
                    <SelectInput source="role" label="Select Roles" choices={roles} validate={required()} />
                )}
                <TextInput source="middle_name" />
            </SimpleForm>
        </Edit>
    )
}
export default UserEdit