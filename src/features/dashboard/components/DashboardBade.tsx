import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const DashboardBadge = () => {
  return (
    <Card className="w-full shadow-none xl:max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          ANY Data <Badge variant="outline">New</Badge>
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="py-5">
        <p>Card Content</p>
      </CardContent>
      <Separator />
      <CardFooter className="flex place-content-end pt-2">
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
