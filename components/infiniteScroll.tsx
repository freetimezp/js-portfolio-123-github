"use client";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

import { fetchCommits } from "@/lib/getData";
import { Commit } from '@/lib/types';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

export interface InfiniteScrollCommitsProps {
    repoId: string | undefined;
    initialPage: number;
    initialCommits: Commit[];
};

const InfiniteScrollCommits: React.FC<InfiniteScrollCommitsProps> = ({ repoId, initialPage }) => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [page, setPage] = useState<number>(initialPage);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadMoreCommits = async () => {
            if (repoId) {
                setLoading(true);

                await new Promise((resolve) => setTimeout(resolve, 200));

                const nextPageCommits = await fetchCommits(repoId, page + 1);
                setCommits((prevCommits) => [...prevCommits, ...nextPageCommits]);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            }
        };


        //handle scroll
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                loadMoreCommits();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, repoId]);

    return (
        <>
            <div className="mt-16 flex flex-col max-w-[80%]">
                {commits?.length > 0 ? (
                    <div>
                        {commits.map((commit: Commit, index: number) => (
                            <Card key={`${commit.sha}-${index}`} className="flex mb-4">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        {commit.commit.author.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {commit.commit.message}
                                    </CardDescription>
                                </CardHeader>

                            </Card>
                        ))}
                    </div>
                ) : (
                    !loading && ""
                )}

                {loading && (
                    <div className="flex justify-center mt-4">
                        <ClipLoader color="#4f46e5" loading={loading} size={35} />
                    </div>
                )}
            </div>
        </>
    );
};

export default InfiniteScrollCommits;


