export const MENU_ARR = [
  {
    id: 1,
    title: "프로그램 관리",
    icon: "icon-assignment",
    url: `/admin/program`,
    children: [
      {
        key: "101",
        title: "Fundamentals",
        url: "/admin/program?programId=101",
      },
      {
        key: "102",
        title: "AKS+DevOps",
        url: "/admin/program?programId=102",
      },
      {
        key: "103",
        title: "Azure Expert",
        url: "/admin/program?programId=103",
      },
      {
        key: "201",
        title: "Power BI Fundamentals",
        url: "/admin/program?programId=201",
      },
      {
        key: "104",
        title: "Kubernetes+AKS",
        url: "/admin/program?programId=104",
      },
    ],
  }
];
