"use client";

import { usePrs } from "@/hooks/usePRs";

export default function HomePage() {
  const { data: prs = [], isLoading } = usePrs();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const groupedByRepo = prs.reduce((groups, pr) => {
    const tag = pr.repoTag;
    if (!groups[tag]) {
      groups[tag] = [];
    }
    groups[tag].push(pr);
    return groups;
  }, {});

  return (
    <div>
      <h1>My Wikimedia Open-Source Work</h1>

      {Object.keys(groupedByRepo).map((repoTag) => (
        <div key={repoTag}>
          <h2>{repoTag}</h2>
          {groupedByRepo[repoTag].map((pr) => (
            <div key={pr._id}>
              <strong>{pr.title}</strong>
              <p>{pr.description}</p>
              <a href={pr.link}>{pr.link}</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}