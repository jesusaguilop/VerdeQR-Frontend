import type { SVGProps } from "react";

export function SenaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 496"
      {...props}
    >
      <path
        fill="currentColor"
        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm139.8 199.1l-102.3 80.6-21.6 17c-8.4 6.6-21 6.6-29.4 0l-21.6-17-102.3-80.6c-13-10.2-15.6-29.1-5.4-42.1s29.1-15.6 42.1-5.4l91.2 71.9 91.2-71.9c13-10.2 32.1-7.6 42.1 5.4s7.6 32.1-5.5 42.1z"
      ></path>
    </svg>
  );
}
