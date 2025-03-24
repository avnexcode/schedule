import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { env } from "@/configs/env";
import { renderElements } from "@/utils/render-elements";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "./sidebar-menu";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarAction } from "./SidebarAction";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarComponent collapsible="offcanvas">
      <SidebarContent>
        <SidebarHeader className="text-nowrap py-4 text-center text-xl font-bold">
          <Link href={"/"}>{env.NEXT_PUBLIC_APP_NAME}</Link>
        </SidebarHeader>
        {renderElements({
          of: sidebarMenu,
          keyExtractor: (sidebar) => sidebar.label,
          render: (sidebar) => (
            <SidebarGroup
              label={sidebar.label}
              menu={sidebar.menu}
              pathname={pathname}
            />
          ),
        })}
        <SidebarAction />
      </SidebarContent>
    </SidebarComponent>
  );
}
