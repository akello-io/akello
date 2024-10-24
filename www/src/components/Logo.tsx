import { useId } from 'react'
import Image from 'next/image';

import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'img'> & {
  invert?: boolean
  filled?: boolean
}) {
  return (
    <Image
      src={"/images/logos/akello.png"}
      alt="Logo"
      width={100}
      height={100}
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
      src={"/images/logos/akello.png"}
      alt="Logo"
      width={100}
      height={100}
    />
  );
}
