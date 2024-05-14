import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { myDataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { UserEdit } from "./tsxFiles/EditGuesserEx";
import { MailEdit } from "./tsxFiles/EditMailTemplates";
import { MailTemplatesList } from "./tsxFiles/MailTemplatesList";
import { RequestsList } from "./tsxFiles/RequestsList";
import { NewsList } from "./tsxFiles/NewsList";
import { NewsShow } from "./tsxFiles/NewsShow";
import { NewsEdit } from "./tsxFiles/NewsEdit";
import { RolesEdit } from "./tsxFiles/RolesEdit";
import { CreateNews } from "./tsxFiles/CreateNews";
import { CreateRoles } from "./tsxFiles/CreateRoles";
import { CreateUser } from "./tsxFiles/CreateUser";
import { CreateMails } from "./tsxFiles/CreateMails";

const API_ENDPOINT = import.meta.env.VITE_REACT_APP_API_ENDPOINT;
const dataProvider = myDataProvider(`${API_ENDPOINT}/api`)

export const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      {permissions => [
      permissions === 'Admin'
      ? <>
        <Resource name="Users" list={ListGuesser} edit={UserEdit} create={CreateUser}/>
        <Resource name="Roles" list={ListGuesser} edit={RolesEdit} create={CreateRoles}/>
        <Resource name="News" list={NewsList} edit={NewsEdit} show={NewsShow} create={CreateNews}/>
        <Resource name="Mail Templates" list={MailTemplatesList} edit={MailEdit} create={CreateMails} />
        <Resource name="Requests" list={RequestsList}/>
        </>
      : null,
      // Если у пользователя роль "Moderator" - то у него доступны не все разделы
      permissions === 'Moderator'
      ? <>
        <Resource name="Users" list={ListGuesser} edit={UserEdit} />
        <Resource name="News" list={NewsList} edit={NewsEdit} show={NewsShow} create={CreateNews} />
        <Resource name="Mail Templates" list={MailTemplatesList} />
        </>
      : null,
      // Если у пользователя роль "Editor" - то у него доступны все разделы, но только под редактирование
      permissions === 'Editor'
      ? <>
        <Resource name="Users" list={ListGuesser} edit={UserEdit}/>
        <Resource name="Roles" list={ListGuesser} edit={RolesEdit}/>
        <Resource name="News" list={NewsList} edit={NewsEdit} show={NewsShow} create={CreateNews}/>
        <Resource name="Mail Templates" list={MailTemplatesList} edit={MailEdit} />
        </>
      : null
    ]}
    </Admin>
  )
}