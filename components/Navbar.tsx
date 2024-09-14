import React from 'react';
import Image from 'next/image';

import { ModeToggle } from '@/components/toggle-mode';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between w-full lg:max-w-5xl">
            <div>
                <Image
                    src={"/logoipsum.svg"}
                    width={100}
                    height={24}
                    priority
                    alt="App Logo"
                    className='dark:invert'
                />
            </div>
            <div>
                <ModeToggle />
            </div>
        </nav>
    );
}

export default Navbar;
