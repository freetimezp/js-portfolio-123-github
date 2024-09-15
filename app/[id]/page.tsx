import React from 'react';
import Link from 'next/link';

import { fetchCommits } from '@/lib/getData';
import { Commit } from '@/lib/types';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import InfiniteScrollCommits from '@/components/infiniteScroll';
import SearchCommits from '@/components/SearchCommits';


export type pageProps = {
    params: { id: string | undefined };
    searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: pageProps) => {
    const search = typeof props?.searchParams?.search === "string" ? props?.searchParams?.search : undefined;
    const repoId: string | undefined = props?.params.id;


    let filteredCommits: Commit[] = [];

    if (repoId) {
        const commits = await fetchCommits(repoId, 1);

        //filter commits
        filteredCommits = search
            ? commits.filter(
                (commit: Commit) => commit.commit.message.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )
            : commits;
    } else {
        console.error("repo ID undefuned");
    }


    return (
        <div className='flex flex-col items-center'>
            <div className='flex py-6 justify-between w-[80%]'>
                <div className='mr-4'>
                    <Link href="/">
                        <Button variant="outline">
                            Back
                        </Button>
                    </Link>
                </div>

                <div className='w-full'>
                    <SearchCommits
                        search={search}
                        repoId={repoId ? String(repoId) : undefined}
                    />
                </div>
            </div>

            <div className='mt-16 flex flex-col max-w-[80%]'>
                {filteredCommits && filteredCommits?.length > 0 &&
                    filteredCommits.map((commit: Commit, index: number) => (
                        <Card key={`${commit.sha}-${index}`} className='flex mb-4'>
                            <CardHeader>
                                <CardTitle className='text-xl'>
                                    {commit.commit.author.name}
                                </CardTitle>
                                <CardDescription>
                                    {commit.commit.message}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
            </div>

            <InfiniteScrollCommits
                repoId={repoId ? String(repoId) : undefined}
                initialPage={1}
                initialCommits={filteredCommits}
            />
        </div>
    );
}

export default page;
