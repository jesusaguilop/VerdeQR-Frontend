import type { SVGProps } from "react";

export function SenaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <img
      src="/img/logosena-Kittl.svg"
      alt="Logo SENA"
      className={`w-24 h-24 ${props.className || ''}`}
    />
  );
}