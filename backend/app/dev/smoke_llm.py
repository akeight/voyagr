from langchain_openai import ChatOpenAI
import os

def main():
    llm = ChatOpenAI(
        model=os.getenv("OPENAI_MODEL", "gpt-5-nano"),
        temperature=0.2,
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL") or None,
    )
    out = llm.invoke("Reply with: OK")
    print(out)

if __name__ == "__main__":
    main()
