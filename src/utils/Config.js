const hostname = 'http://10.42.10.81:31201/';

const useMock = true;

const url = {
    login: {//enable mock,
        mock: '/api/data/user/login'
    },
    register: hostname + 'user/register',





    // forgot password end
    sessionMe: {//enable mock
        mock: '/api/data/user/session'
    },

    config: {
        mock: 'api/data/user/config'
    }
};

const access_token = localStorage.getItem("access_token");

const Config = {


    getUrl(path) {
        return useMock && url[path].mock ? url[path].mock : url[path].main ? url[path].main : url[path];

    },
    header: {
        Authorization: `Bearer ${access_token}`
    },

    logo: 'http://10.42.10.81:31200/images/logo.png'


}


export default Config;
