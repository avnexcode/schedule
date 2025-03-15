export type SidebarSubMenuItemType = {
  title: string;
  url: string;
  icon: string;
  active: string[];
};

export type SidebarMenuItemType = {
  type: "Single" | "Collapsible";
  title: string;
  url?: string;
  icon: string;
  active: string[];
  subMenu?: SidebarSubMenuItemType[];
};

export type SidebarMenuType = {
  label: string;
  menu: SidebarMenuItemType[];
};

export const sidebarMenu: SidebarMenuType[] = [
  {
    label: "Application",
    menu: [
      {
        type: "Single",
        title: "Dashboard",
        url: "/dashboard",
        icon: "LayoutDashboard",
        active: [""],
      },
      {
        type: "Collapsible",
        title: "Major",
        icon: "Layers",
        active: [""],
        subMenu: [
          {
            title: "Major",
            url: "/dashboard/major",
            icon: "Layers",
            active: ["/dashboard/major/create", "/dashboard/major/:id/edit"],
          },
          {
            title: "Specialization",
            url: "/dashboard/specialization",
            icon: "Medal",
            active: [
              "/dashboard/specialization/create",
              "/dashboard/specialization/:id/edit",
            ],
          },
          {
            title: "Lecture",
            url: "/dashboard/lecture",
            icon: "Users",
            active: [
              "/dashboard/lecture/create",
              "/dashboard/lecture/:id/edit",
            ],
          },
          {
            title: "Room",
            url: "/dashboard/room",
            icon: "LayoutDashboard",
            active: ["/dashboard/room/create", "/dashboard/room/:id/edit"],
          },
          {
            title: "Course",
            url: "/dashboard/course",
            icon: "Library",
            active: ["/dashboard/course/create", "/dashboard/course/:id/edit"],
          },
        ],
      },
      {
        type: "Collapsible",
        title: "Schedule",
        icon: "Calendar1",
        active: [""],
        subMenu: [
          {
            title: "Schedule",
            url: "/dashboard/schedule",
            icon: "Calendar1",
            active: [""],
          },
          {
            title: "Batch",
            url: "/batch",
            icon: "LayoutDashboard",
            active: [""],
          },
          {
            title: "Time",
            url: "/time",
            icon: "Clock7",
            active: [""],
          },
          {
            title: "Home Work",
            url: "/home-work",
            icon: "NotepadText",
            active: [""],
          },
        ],
      },
      {
        type: "Collapsible",
        title: "Test",
        icon: "TestTubeDiagonal",
        active: [""],
        subMenu: [
          {
            title: "Test 1",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 2",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 3",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 4",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 5",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 6",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 7",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 8",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 9",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 10",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 11",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 12",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 13",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 14",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 15",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 16",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 17",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 18",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 19",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
          {
            title: "Test 20",
            url: "#",
            icon: "TestTubeDiagonal",
            active: [""],
          },
        ],
      },
    ],
  },
  {
    label: "Settings",
    menu: [
      {
        type: "Single",
        title: "Profile",
        url: "settings/profile",
        icon: "User",
        active: [""],
      },
      {
        type: "Single",
        title: "Reset Password",
        url: "/settings/reset-password",
        icon: "KeyRound",
        active: [""],
      },
      {
        type: "Single",
        title: "Pengguna",
        url: "/settings/user",
        icon: "Users",
        active: [""],
      },
    ],
  },
];
