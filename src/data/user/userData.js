import mock from '../mock';

const userDetail = {
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdWRoZWVycGFsIiwiZXhwIjoxNjYyMjMxNDU2LCJpYXQiOjE2NTYyMzE0NTZ9.AWNKRjd15cxBzOi0oYzJodNucAJq2X-HORatDr_id72l9D_7pjamEoNoDK1CaZbC9s-ZfYLqzxexR0swpIT7JA",
    name: 'Shalini .',
    job: 'Software Developer at Company',
    address: 'Bengaluru, karnataka, India',
    connection: '500+',
    experience: [
        {
            title: 'Software Developer',
            company: 'doodleblue innvations - Full-time',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Associate Software Engineer',
            company: 'doodleblue innvations - Full-time',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Student',
            company: 'Dayananda Sagar College of Engineering',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Full stack developer',
            company: 'doodleblue innvations - Full-time',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Internet of Things Intern',
            company: 'bytestorm pvt ltd',
            time: 'Nov 2021 - Present - 11 mos',
        },
    ],
    education: [
        {
            title: 'Dayananda Sagar College of Engineering',
            company: 'Bachelor of Technology- BTech, elctronics and instrumentation',
            time: '2016 - 2020',
        },
    ],
    certifications: [
        {
            title: 'HTML',
            company: 'Sololearn',
            time: 'Issued Jan 2020 - No Expiration Data'
        },
        {
            title: 'C#',
            company: 'Sololearn',
            time: 'Issued Jan 2020 - No Expiration Data'
        },
    ]
};



const sessionMe = {
    "userName": "sudheerpal",
    "firstName": "Sudheer",
    "lastName": "Pal",
    name: 'Shalini .',
    job: 'Software Developer at Company',
    address: 'Bengaluru, karnataka, India',
    connection: '500+',
    experience: [
        {
            title: 'Software Developer',
            company: 'doodleblue innvations - Full-time',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Associate Software Engineer',
            company: 'doodleblue innvations - Full-time',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Student',
            company: 'Dayananda Sagar College of Engineering',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Full stack developer',
            company: 'doodleblue innvations - Full-time',
            time: 'Nov 2021 - Present - 11 mos',
        },
        {
            title: 'Internet of Things Intern',
            company: 'bytestorm pvt ltd',
            time: 'Nov 2021 - Present - 11 mos',
        },
    ],
    education: [
        {
            title: 'Dayananda Sagar College of Engineering',
            company: 'Bachelor of Technology- BTech, elctronics and instrumentation',
            time: '2016 - 2020',
        },
    ],
    certifications: [
        {
            title: 'HTML',
            company: 'Sololearn',
            time: 'Issued Jan 2020 - No Expiration Data'
        },
        {
            title: 'C#',
            company: 'Sololearn',
            time: 'Issued Jan 2020 - No Expiration Data'
        },
    ]
}

const sessionAllUser = {
    "successMsg": "Currently Active Users",
    "data": [
        {
            "firstName": "Rakshit",
            "lastName": "Baliyan",
            "email": "Rakshit@gmail.com",
            "phoneNo": "878778878777",
            "roles": [
                "ROLE_USER"
            ],
            "lastLoginAt": "2022-07-08 11:20:25.049"
        },
        {
            "firstName": "TestAdmin",
            "lastName": "TestAdmin",
            "phoneNo": "878778878777",
            "email": "TestAdmin@gmail.com",
            "roles": [
                "ROLE_ADMIN"
            ],
            "lastLoginAt": "2022-07-11 12:15:17.424"
        },
        {
            "firstName": "Sudheer",
            "lastName": "Pal",
            "phoneNo": "8655500627",
            "email": "sudheerpal@gmail.com",
            "roles": [
                "ROLE_ADMIN"
            ],
            "lastLoginAt": "2022-07-16 05:32:35.977"
        }
    ]
}

const emailForResetPass = {
    "successMsg": "Email is valid"
}

const validateResetOtp = {
    "successMsg": "OTP is valid"
}

const savedPassword = {
    "successMsg": "Password has been saved"
}




// config data
const config_ui = {
    "successMsg": null,
    "data": [
        {
            "id": 17,
            "key": "footer_visible",
            "title": "Footer Visible",
            "value": true,
            "valueType": "BOOLEAN",
            "order": 0,
            "data": [],
            "options": null
        },
        {
            "id": 18,
            "key": "help_icon_visible",
            "title": "Help Icon Visible",
            "value": true,
            "valueType": "BOOLEAN",
            "order": 1,
            "data": [],
            "options": null
        },
        {
            "id": 19,
            "key": "application_name",
            "title": "Application Name",
            "value": "Right of Way",
            "valueType": "TEXT",
            "order": 2,
            "data": [],
            "options": null
        },
        {
            "id": 20,
            "key": "footer_text",
            "title": "Footer Text",
            "value": " Copyright © 2021 G2K Labs, Inc. - All Rights Reserved.",
            "valueType": "TEXT",
            "order": 3,
            "data": [],
            "options": null
        },
        {
            "id": 21,
            "key": "global_search_visible",
            "title": "Global Search Visible",
            "value": true,
            "valueType": "BOOLEAN",
            "order": 4,
            "data": [],
            "options": null
        },
        {
            "id": 22,
            "key": "mfa_enabled",
            "title": "MFA Enable",
            "value": true,
            "valueType": "BOOLEAN",
            "order": 5,
            "data": [],
            "options": null
        }
    ]
}




mock.onPost('/api/data/user/login').reply(() => [200, userDetail]);
mock.onGet('/api/data/user/session').reply(() => [200, sessionMe]);
mock.onGet('/api/data/user/activeUsers').reply(() => [200, sessionAllUser]);
mock.onPost('api/data/user/sessionKill').reply(() => 200, {})

// forgot passowrd
mock.onPost('/api/data/user/reset-pass').reply(() => [200, emailForResetPass]);
mock.onPost('/api/data/user/validate-reset-otp').reply(() => [200, validateResetOtp]);
mock.onPost('/api/data/user/save-pass').reply(() => [200, savedPassword]);

// configuration
mock.onGet('api/data/user/config').reply(() => [200, config_ui])


export default userDetail;
