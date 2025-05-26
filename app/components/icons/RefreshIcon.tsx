import { type SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.334 3.167v4h-4M.666 13.833v-4h4"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.34 6.5a6 6 0 0 1 9.9-2.24l3.093 2.907M.666 9.833l3.093 2.907a6 6 0 0 0 9.9-2.24"
    />
  </svg>
)
const Memo = memo(SvgComponent)
export { Memo as RefreshIcon }
