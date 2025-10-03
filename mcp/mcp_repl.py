#!/usr/bin/env python3
import os
import sys
import requests

OLLAMA_URL = "http://192.168.2.99:11434/api/generate"
MODEL_NAME = "deepseek-r1:7b"

# token estimation
CHARS_PER_TOKEN = 4
MAX_TOKENS = 128000
RESERVE_RATIO = 0.2  # keep 20% of tokens free for conversation
EFFECTIVE_TOKENS = int(MAX_TOKENS * (1 - RESERVE_RATIO))
MAX_BYTES = EFFECTIVE_TOKENS * CHARS_PER_TOKEN  # ~reserved context size
TOTAL_BYTES = MAX_TOKENS * CHARS_PER_TOKEN

context = []  # holds {"path": str, "content": str}


def query_ollama(prompt, context_files):
    """Send query to Ollama model with optional context from files."""
    context_text = ""
    if context_files:
        for f in context_files:
            context_text += f"\n\n# File: {f['path']}\n{f['content']}\n"
    full_prompt = context_text + "\n\n" + prompt

    resp = requests.post(OLLAMA_URL, json={
        "model": MODEL_NAME,
        "prompt": full_prompt,
        "stream": False
    })
    resp.raise_for_status()
    return resp.json()["response"]


def compute_batch_size(filepaths):
    """Compute total size (bytes) for all files in batch."""
    total_size = 0
    for path in filepaths:
        if not os.path.exists(path):
            print(f"[Error] File not found: {path}")
            continue
        total_size += os.path.getsize(path)
    return total_size


def add_files_to_context(filepaths, context, initial_context):
    """Add files only if the entire batch fits into reserved context size."""
    current_size = sum(len(f["content"]) for f in context)
    batch_size = compute_batch_size(filepaths)

    if current_size + batch_size > MAX_BYTES:
        print(f"[Error] Import canceled: adding these files "
              f"({batch_size/1024:.1f} KB) would exceed context limit "
              f"({MAX_BYTES/1024:.1f} KB). Nothing imported.")
        return context

    for path in filepaths:
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception as e:
            print(f"[Error] Failed to read {path}: {e}")
            continue

        size = len(content)
        context.append({"path": path, "content": content})
        current_size += size
        if initial_context: 
            print(f"[Added {path} ({size/1024:.1f} KB), "f"total so far {current_size/1024:.1f} KB]")
        else:
            print(f"Initial context imported. ({size/1024:.1f} KB) | location : {path}")
            
    return context


def repl():
    print("=== MCP REPL ===")
    print(f"Context capacity: {MAX_BYTES/1024:.1f} KB "
          f"(with {(TOTAL_BYTES/1024)*RESERVE_RATIO:.0f} KB reserved for conversation)")
    add_files_to_context(["mcp/base_context.txt"],context,False)
    print("Use @workspace <path> to add files/folders to context.")
    print("Type 'exit' to quit.\n")

    while True:
        
        try:
            command = input("> ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nExiting.")
            break

        if command.lower() == "exit":
            print("Closing session.")
            break

        elif command.startswith("@workspace"):
            parts = command.split(maxsplit=1)
            if len(parts) < 2:
                print("[Error] Usage: @workspace <path>")
                continue
            path = parts[1]

            filepaths = []
            if os.path.isdir(path):
                for root, _, files in os.walk(path):
                    for name in files:
                        full_path = os.path.join(root, name)
                        filepaths.append(full_path)
            else:
                filepaths.append(path)

            add_files_to_context(filepaths, context, True)

        else:
            print("[AI] Thinking...\n")
            try:
                answer = query_ollama(command, context)
                print("=== AI Response ===\n", answer)
            except Exception as e:
                print(f"[Error] Failed to query AI: {e}")


if __name__ == "__main__":
    repl()
