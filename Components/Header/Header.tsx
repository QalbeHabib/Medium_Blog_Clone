import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
  const [color, setColor] = useState(true)
  // const changeNavColor = () => {
  //   window.screenY >= 80 ? setColor(false) : setColor(true)
  // }

  // window.addEventListener('scroll', changeNavColor)

  return (
    <div>
      <header className="z-50 mx-auto flex max-w-screen-xl items-center justify-between p-3">
        <div>
          <Link href="/">
            <Image
              src="/../public/Medium.png"
              width="180"
              height="50"
              alt="medium_logo"
              className="cursor-pointer object-contain  "
            />
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden items-center space-x-10 text-sm font-semibold md:flex ">
            <h2 className="cursor-pointer">Our story</h2>

            <h2 className="cursor-pointer">Membership</h2>

            <h2 className="cursor-pointer">Write</h2>
          </div>
          <div className="flex items-center space-x-3 font-semibold">
            <h2 className="cursor-pointer text-[10px] md:text-sm">Sign In</h2>

            <button className="rounded-full bg-black px-3 py-2 text-[10px] font-bold text-white md:text-sm ">
              Get Started
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}
