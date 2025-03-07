import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

type Item = {
  title: string;
  website: string;
};

export default function Page() {
  const data: Item[] = [
    {
      title: "Scopus",
      website: "https://www.scopus.com/search/form.uri?display=basic#basic",
    },
    {
      title: "WOS",
      website: "https://www.webofscience.com/wos/woscc/basic-search",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {data.map((item, index) => (
        <Link
          key={index}
          className="w-full hover:scale-105 transition-transform duration-300"
          target="_blank"
          href={item.website}
        >
          <Card>
            <CardHeader>
              <CardTitle className="">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                {item.website}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
