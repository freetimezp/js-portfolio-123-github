"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

import { Input } from "@/components/ui/input";


interface SearchProps {
    search?: string;
    repoId?: string;
};

const SearchCommits = ({ search, repoId }: SearchProps) => {
    const router = useRouter();
    const initialRender = useRef(true);

    const [text, setText] = useState(search);
    const [query] = useDebounce(text, 750);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (!query) {
            if (repoId) {
                router.push(`/${repoId}`);
            }
        } else {
            router.push(`/${repoId}/?search=${query}`);

        }
    }, [query, router, repoId]);

    return (
        <div>
            <Input
                value={text}
                placeholder='Search for Commit'
                onChange={(e) => setText(e.target.value)}
                type="text"
                className='w-full'
            />
        </div>
    );
}

export default SearchCommits;
