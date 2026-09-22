"use client";

import { useState } from "react";
import { usePrs, useCreatePr, useUpdatePr } from "@/hooks/usePRs";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [repoTag, setRepoTag] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editRepoTag, setEditRepoTag] = useState("");

  const { data: prs = [], isLoading } = usePrs();
  const createPr = useCreatePr();
  const updatePr = useUpdatePr();

  function handleSubmit(e) {
    e.preventDefault();

    createPr.mutate(
      { title, description, link, repoTag },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setLink("");
          setRepoTag("");
        },
      }
    );
  }

  function startEditing(pr) {
    setEditingId(pr._id);
    setEditTitle(pr.title);
    setEditDescription(pr.description);
    setEditLink(pr.link);
    setEditRepoTag(pr.repoTag);
  }

  function cancelEditing() {
    setEditingId(null);
  }

  function handleUpdate(e, id) {
    e.preventDefault();

    updatePr.mutate(
      {
        id,
        title: editTitle,
        description: editDescription,
        link: editLink,
        repoTag: editRepoTag,
      },
      {
        onSuccess: () => setEditingId(null),
      }
    );
  }

  return (
    <div>
      <h1>Admin</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Link</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <div>
          <label>Repo Tag</label>
          <input
            value={repoTag}
            onChange={(e) => setRepoTag(e.target.value)}
          />
        </div>
        <button type="submit" disabled={createPr.isPending}>
          {createPr.isPending ? "Adding..." : "Add PR"}
        </button>
      </form>

      <hr />

      <h2>All PRs</h2>
      {isLoading && <p>Loading...</p>}

      {prs.map((pr) =>
        editingId === pr._id ? (
          <form key={pr._id} onSubmit={(e) => handleUpdate(e, pr._id)}>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <input
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
            />
            <input
              value={editRepoTag}
              onChange={(e) => setEditRepoTag(e.target.value)}
            />
            <button type="submit" disabled={updatePr.isPending}>
              {updatePr.isPending ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={cancelEditing}>
              Cancel
            </button>
          </form>
        ) : (
          <div key={pr._id}>
            <strong>{pr.title}</strong> ({pr.repoTag})
            <p>{pr.description}</p>
            <a href={pr.link}>{pr.link}</a>
            <button onClick={() => startEditing(pr)}>Edit</button>
          </div>
        )
      )}
    </div>
  );
}