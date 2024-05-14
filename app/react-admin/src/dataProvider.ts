import jwtInterceptor from "./axiosRequest";
import { DataProvider, GetManyResult, GetListResult } from 'react-admin';
import FormData from 'form-data';
export const myDataProvider = (apiUrl: string): DataProvider => ({
    getList: async (resource: string, params: any): Promise<GetListResult<any>> => {
        try {
            const response = await jwtInterceptor.get(`${apiUrl}/${resource}`, {
                params: params
            });
            if (response.data === 0){
                window.location.href = `#/${resource}/create`;
            }
            return {
                data: response.data.data || [],
                total: response.data.total || 0
            };
        } catch (error) {
            console.log(`>>> Произошла ошибка в №1: ${error}`);
            return Promise.reject(error);
        }
    },
    getOne: async (resource: string, params: any) => {
      try {
            const response = await jwtInterceptor.get(`${apiUrl}/${resource}/${params.id}`, {
                params: params
            });
            
            return {
                data: response.data
            };
        } catch (error) {
            console.log(`>>> Произошла ошибка в №2: ${error}`);
            return await Promise.reject(error);
        }
    },
    getMany: async (resource: string, params: any) => {
      try {
            const response = await jwtInterceptor
                .get(`${apiUrl}/${resource}?ids=${JSON.stringify(params.ids)}`);
            return {
                data: response.data
            };
        } catch (error) {
            console.log(`>>> ${resource}`)
            console.log(`>>> Произошла ошибка в №3: ${error}`);
            return await Promise.reject(error);
        }
    },
    getManyReference: () => {
        return Promise.reject()
    },
    update: async (resource: string, params: any) => {
      try {
            console.log(resource)
            if (resource === "Mail Templates" || resource === "News"){
                const options = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params.data)
                };
                const response = await jwtInterceptor.post(`${apiUrl}/${resource}/${params.id}/update`, options);
                return {
                    data: response.data
                };
            }
            const response = await jwtInterceptor
                .patch(`${apiUrl}/${resource}/${params.id}/${JSON.stringify(params.data)}`);
            return {
                data: response.data
            };
        } catch (error) {
            console.log(`>>> Произошла ошибка в №4: ${error}`);
            return await Promise.reject(error);
        }
    },
    updateMany: () => Promise.reject(),
    create: async (resource: string, params: any) => {
      try {
            if (resource === 'News') {
                const optionsImg = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params.data)
                };
                
                const myData = new FormData();
                myData.append('image', params.data.preview.rawFile);
    
                await jwtInterceptor.post(`${apiUrl}/${resource}/load_image`, myData, optionsImg);
                const response = await jwtInterceptor.post(`${apiUrl}/${resource}/create`, options);
                return {
                    data: response.data
                };
            }
            else{
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params.data)
                };
                const response = await jwtInterceptor.post(`${apiUrl}/${resource}/create`, options);
                return {
                    data: response.data
                };
            }
        } catch (error) {
            console.log(`>>> Произошла ошибка в create() dataProvider: ${error}`);
            return await Promise.reject(error);
        }
    },
    delete: async (resource: string, params: any) => {
      try {
            const response = await jwtInterceptor
                .delete(`${apiUrl}/${resource}/${params.id}`);
            return {
                data: response.data
            };
        } catch (error) {
            console.log(`>>> Произошла ошибка в №5: ${error}`);
            return await Promise.reject(error);
        }
    },
    deleteMany: async (resource: string, params: any) => {
      try {
            const response = await jwtInterceptor
                .delete(`${apiUrl}/${resource}`, {
                    data: {
                        ids: params.ids
                    }
                });
            return {
                data: response.data.data || []
            };
        } catch (error) {
            console.log(`>>> Произошла ошибка в №6: ${error}`);
            return await Promise.reject(error);
        }
    },
});

export default myDataProvider;
