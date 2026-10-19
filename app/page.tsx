"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function entrar() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMessage(error.message);
    router.push("/tarefas");
  }

  async function criarConta() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMessage(error.message);
    setMessage("Conta criada! Confira seu e-mail para confirmar.");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
      <input
        className="rounded border p-3"
        placeholder="seu e-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="rounded border p-3"
        placeholder="senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="rounded bg-black p-3 text-white" onClick={entrar}>
        Entrar
      </button>
      <button className="rounded border p-3" onClick={criarConta}>
        Criar conta
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </main>
  );
}
