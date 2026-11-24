export default [
  {path:'/',component:()=>import('../views/Home.vue')},
  {path:'/documentation',component:()=>import('../views/Documentation.vue')},
  {path:'/api-docs',component:()=>import('../views/APIDocs.vue')},
  {path:'/playground',component:()=>import('../views/Playground.vue')},
  {path:'/demo',redirect:'/playground'},
  {path:'/:category(core-operations|business-utilities|formatting-parsing|timezone-localization|comparison-validation|utility-functions)',redirect:'/api-docs'},
  {path:'/roadmap',redirect:'/documentation'},
  {path:'/:pathMatch(.*)*',redirect:'/'}
];
