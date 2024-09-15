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


export type pageProps = {
    params: { id: string | undefined };
    searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: pageProps) => {
    const repoId: string | undefined = props?.params.id;

    if (!repoId) {
        console.error("Repo ID is undefined");
        throw new Error('Repository not found');
    }

    let commits: Commit[] = [];

    try {
        commits = await fetchCommits(repoId, 1);
    } catch (error) {
        console.error("Error fetching commits", error);
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
            </div>

            <div className='mt-16 flex flex-col max-w-[80%]'>
                {commits && commits?.length > 0 &&
                    commits.map((commit: Commit, index: number) => (
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
                initialCommits={commits}
            />
        </div>
    );
}

export default page;
