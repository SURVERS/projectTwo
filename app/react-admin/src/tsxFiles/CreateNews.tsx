import { Create, SimpleForm, TextInput, BooleanInput, ImageInput, ImageField } from 'react-admin';

export const CreateNews = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <ImageInput source="preview" label="Image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <BooleanInput source="hidden" />
        </SimpleForm>
    </Create>
);

export default CreateNews;