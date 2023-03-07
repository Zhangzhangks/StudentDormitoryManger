const login = () =>
    import ('../View/Loign/login.vue');
const register = () =>
    import ('../View/Loign/register/register.vue')
const home = () =>
    import ('../View/Home/home.vue')
const index = () =>
    import ('../View/index.vue');
const user = () =>
    import ('../View/Account/user.vue')
const changePassword = () =>
    import ('../View/Account/changePassword.vue');
const userAccount = () =>
    import ('../View/Account/UserAccoun.vue');
const StudentApp = () =>
    import ('../View/Studnet_manger/app.vue');
const Student = () =>
    import ('../View/Studnet_manger/student.vue')
const dormitory_mangerApp = () =>
    import ('../View/dormitory_manger/app.vue')
const dormitory_manger = () =>
    import ('../View/dormitory_manger/dormitory_manger.vue');
const dormitory_manger_detail = () =>
    import ('../View/dormitory_manger/dormitory_detaiil.vue')
const dormitory_adminApp = () =>
    import ('../View/dormitory-admin/app.vue')
const dormitory_admin = () =>
    import ('../View/dormitory-admin/dormitory_admin.vue');
const studentDetail = () =>
    import ('../View/Studnet_manger/studentDetail.vue')
const adminDetail = () =>
    import ('../View/dormitory-admin/adminDetail.vue');
const dorasignapp = () =>
    import ('../View/dormitory_assignment/app.vue')
const dorassign = () =>
    import ('../View/dormitory_assignment/dormitory_assign.vue')
const repairApp = () =>
    import ('../View/repair/app.vue');
const repair = () =>
    import ('../View/repair/repair.vue')
const enterApp = () =>
    import ('../View/enter_manger/app.vue')
const enterData = () =>
    import ('../View/enter_manger/enter_data.vue')
const systemApp = () =>
    import ('../View/System/app.vue')
const SystemData = () =>
    import ('../View/System/system.vue')
const notFound = () =>
    import ('../components/404Notfound.vue');

export const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login, name: 'login' },
    { path: '/reg', component: register, name: 'reg' },
    {
        path: '/main',
        component: index,
        redirect: '/main/home',
        name: 'home',
        children: [
            { path: 'home', component: home, },
            {
                path: 'user',
                redirect: '/user/changepwd',
                component: user,

                children: [
                    { path: 'changepwd', component: changePassword, name: 'user_parent', },
                    { path: 'userAcount', component: userAccount, name: 'user', }
                ]
            },
            {
                path: 'student',
                name: 'student',
                redirect: '/student/studentManger',
                component: StudentApp,
                children: [
                    { path: 'studentManger', component: Student, name: 'student', },

                ]
            },
            {
                path: 'student/:userid',
                component: studentDetail,
                props: true,
            }, {
                path: 'dormitory',
                component: dormitory_mangerApp,
                name: 'dormitory',
                children: [{
                    path: 'dormitory_manger',
                    component: dormitory_manger,
                    name: 'dormitory',

                }]
            }, {
                path: 'dormitory/:build_identy',
                component: dormitory_manger_detail,
                props: true,
            }, {
                path: 'dormitoryassign',
                component: dorasignapp,
                name: 'dor_assign',
                children: [{
                    path: 'dormitory_assign',
                    component: dorassign,
                    name: 'dor_assign',

                }]
            },
            {
                path: 'doradmin',
                component: dormitory_adminApp,
                children: [{
                    path: 'doradmin_manger',
                    component: dormitory_admin,
                    name: 'dormitory_admin'

                }]
            },
            {
                path: 'doradmin/:ad_userid',
                component: adminDetail,
                props: true,
            },
            {
                path: 'repair',
                name: 'repair',
                component: repairApp,
                children: [{
                    path: 'repair_message',
                    component: repair,
                    name: 'repair'

                }]
            }, {
                path: 'enter',
                name: 'enter_mager',
                component: enterApp,
                children: [{
                    path: 'enter_mager',
                    component: enterData,
                    name: 'enter_mager'

                }]
            }, {
                path: 'system',
                name: 'system',
                component: systemApp,
                children: [{
                    path: 'stystem_manger',
                    component: SystemData,
                    name: 'system'

                }]
            },
        ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: notFound },
]