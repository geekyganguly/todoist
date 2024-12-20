import { HeartIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex justify-center py-4">
        <div className=" flex items-center gap-x-2">
          <span> made with </span>
          <HeartIcon className="size-4 text-rose-600" />
          <span>by </span>
          <a href="https://sauravganguly.in" target="_blank" rel="noreferrer">
            geeky_ganguly
          </a>
        </div>
      </div>
    </footer>
  );
}
