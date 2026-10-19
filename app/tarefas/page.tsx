"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Task = { id: string; title: string; done: boolean; user_id: string };

export default function Tarefas() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  async function carregar() {
    const { data } = await supabase.from("tasks").select("*").order("created_at");
    setTasks(data ?? []);
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return router.push("/");
      setUserId(data.user.id);
      carregar();
    });
  }, [router]);

  async function adicionar() {
    if (!title.trim()) return;
    await supabase.from("tasks").insert({ title, user_id: userId });
    setTitle("");
    carregar();
  }

  async function alternar(task: Task) {
    await supabase.from("tasks").update({ done: !task.done }).eq("id", task.id);
    carregar();
  }

  async function remover(task: Task) {
    await supabase.from("tasks").delete().eq("id", task.id);
    carregar();
  }

  async function sair() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Minhas Tarefas</h1>
        <button className="text-sm underline" onClick={sair}>
          Sair
        </button>
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border p-3"
          placeholder="nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionar()}
        />
        <button className="rounded bg-black px-4 text-white" onClick={adicionar}>
          +
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3 rounded border p-3">
            <input type="checkbox" checked={task.done} onChange={() => alternar(task)} />
            <span className={task.done ? "flex-1 line-through opacity-50" : "flex-1"}>
              {task.title}
            </span>
            <button className="text-sm text-red-600" onClick={() => remover(task)}>
              apagar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
