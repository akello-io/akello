import { useId } from 'react'
import Image from 'next/image';
import akello from "../images/logos/akello.png"

import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'img'> & {
  invert?: boolean
  filled?: boolean
}) {
  let id = useId()

  return (
    <Image
      src={akello}
      alt="Logo"
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: '100px', height: 'auto' }} // optional
      {...props}
    />
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'img'> & {
  invert?: boolean;
  filled?: boolean;
  fillOnHover?: boolean;
}) {
  return (
    <Image
      src={akello}
      alt="Logo"
      className={className}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100px', height: 'auto' }} // optional
      {...props}
    />
  );
}
