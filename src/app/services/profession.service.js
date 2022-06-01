import httpService from "./http.service";

const propfessionEndPoint = "profession/";

const propfessionService = {
    get: async () => {
        const { data } = await httpService.get(propfessionEndPoint);
        return data;
    }
};

export default propfessionService;
