export default {
  data: [
    {
      name: "index",
      meta: {
        title: "系统管理",
        icon: "system",
        noCache: false,
        link: null,
      },
    },
    {
      name: "parent_1",
      meta: {
        title: "系统管理",
        icon: "system",
        noCache: false,
        link: null,
      },
      children: [
        {
          name: "child_1",
          meta: {
            title: "用户管理",
            icon: "user",
            noCache: false,
            link: null,
          },
          children: [
            {
              name: "child_2",
              meta: {
                title: "用户管理",
                icon: "user",
                noCache: false,
                link: null,
              },
            },
            {
              name: "child_3",
              meta: {
                title: "用户管理",
                icon: "user",
                noCache: false,
                link: null,
              },
            },
          ],
        },
        {
          name: "child_4",
          meta: {
            title: "用户管理",
            icon: "user",
            noCache: false,
            link: null,
          },
        },
      ],
    },
  ],
};
